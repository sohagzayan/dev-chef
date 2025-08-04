import { exec } from 'child_process';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface CodeExecutionResult {
    success: boolean;
    output?: string;
    error?: string;
    runtime: number;
    memory: number;
}

export interface TestCaseResult {
    testCaseId: string;
    status: 'PASSED' | 'FAILED' | 'ERROR';
    input: string;
    expectedOutput: string;
    actualOutput?: string;
    runtime: number;
    memory: number;
    error?: string;
}

export class CodeExecutor {
    private static readonly TIMEOUT = 5000; // 5 seconds
    private static readonly MEMORY_LIMIT = 256; // 256MB

    static async executeCode(
        code: string,
        language: string,
        testCases: Array<{ id: string; input: string; output: string }>,
    ): Promise<TestCaseResult[]> {
        const results: TestCaseResult[] = [];

        for (const testCase of testCases) {
            try {
                const startTime = Date.now();
                const result = await this.runCode(code, language, testCase.input);
                const runtime = Date.now() - startTime;

                // Check if output matches expected
                const isCorrect = this.compareOutput(result.output || '', testCase.output);

                results.push({
                    testCaseId: testCase.id,
                    status:
                        result.success && isCorrect
                            ? 'PASSED'
                            : result.success
                              ? 'FAILED'
                              : 'ERROR',
                    input: testCase.input,
                    expectedOutput: testCase.output,
                    actualOutput: result.output,
                    runtime,
                    memory: result.memory,
                    error: result.error,
                });
            } catch (error) {
                results.push({
                    testCaseId: testCase.id,
                    status: 'ERROR',
                    input: testCase.input,
                    expectedOutput: testCase.output,
                    runtime: 0,
                    memory: 0,
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        }

        return results;
    }

    private static async runCode(
        code: string,
        language: string,
        input: string,
    ): Promise<CodeExecutionResult> {
        const tempDir = join(tmpdir(), `code-exec-${Date.now()}`);
        await mkdir(tempDir, { recursive: true });

        try {
            switch (language.toLowerCase()) {
                case 'python':
                    return await this.runPython(code, input, tempDir);
                case 'javascript':
                    return await this.runJavaScript(code, input, tempDir);
                case 'java':
                    return await this.runJava(code, input, tempDir);
                case 'cpp':
                    return await this.runCpp(code, input, tempDir);
                default:
                    throw new Error(`Unsupported language: ${language}`);
            }
        } finally {
            // Cleanup temp files
            try {
                await unlink(join(tempDir, 'code.*'));
                await unlink(join(tempDir, 'input.txt'));
            } catch {
                // Ignore cleanup errors
            }
        }
    }

    private static async runPython(
        code: string,
        input: string,
        tempDir: string,
    ): Promise<CodeExecutionResult> {
        const codeFile = join(tempDir, 'code.py');
        const inputFile = join(tempDir, 'input.txt');

        // Create a wrapper that handles the input/output for LeetCode-style problems
        const wrappedCode = `
import json
import sys

# Read input from stdin
input_lines = []
for line in sys.stdin:
    input_lines.append(line.strip())

# ListNode class for linked list problems
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Helper function to create linked list from array
def create_linked_list(arr):
    if not arr or len(arr) == 0:
        return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

# Helper function to convert linked list to array
def linked_list_to_array(head):
    result = []
    current = head
    while current is not None:
        result.append(current.val)
        current = current.next
    return result

${code}

# Execute the solution based on the problem type
try:
    if 'twoSum' in globals():
        # Two Sum problem
        nums = json.loads(input_lines[0])
        target = int(input_lines[1])
        result = twoSum(nums, target)
    elif 'addTwoNumbers' in globals():
        # Add Two Numbers problem
        l1_array = json.loads(input_lines[0])
        l2_array = json.loads(input_lines[1])
        l1 = create_linked_list(l1_array)
        l2 = create_linked_list(l2_array)
        result_list = addTwoNumbers(l1, l2)
        result = linked_list_to_array(result_list)
    elif 'isValid' in globals():
        # Valid Parentheses problem
        s = input_lines[0]
        result = isValid(s)
    elif 'maxSubArray' in globals():
        # Maximum Subarray problem
        nums = json.loads(input_lines[0])
        result = maxSubArray(nums)
    elif 'mergeTwoLists' in globals():
        # Merge Two Sorted Lists problem
        list1_array = json.loads(input_lines[0])
        list2_array = json.loads(input_lines[1])
        list1 = create_linked_list(list1_array)
        list2 = create_linked_list(list2_array)
        result_list = mergeTwoLists(list1, list2)
        result = linked_list_to_array(result_list)
    else:
        # Generic case
        result = eval(input_lines[0])
    
    print(json.dumps(result))
except Exception as e:
    print(f"Execution error: {str(e)}", file=sys.stderr)
    sys.exit(1)
`;

        await writeFile(codeFile, wrappedCode);
        await writeFile(inputFile, input);

        try {
            const { stdout, stderr } = await execAsync(`python3 ${codeFile} < ${inputFile}`, {
                timeout: this.TIMEOUT,
                cwd: tempDir,
            });

            return {
                success: true,
                output: stdout.trim(),
                error: stderr || undefined,
                runtime: 0, // Will be calculated by caller
                memory: 0, // Would need more sophisticated monitoring
            };
        } catch (execError: any) {
            return {
                success: false,
                error: execError.stderr || execError.message,
                runtime: 0,
                memory: 0,
            };
        }
    }

    private static async runJavaScript(
        code: string,
        input: string,
        tempDir: string,
    ): Promise<CodeExecutionResult> {
        const codeFile = join(tempDir, 'code.js');
        const inputFile = join(tempDir, 'input.txt');

        // Wrap code to handle input/output for LeetCode-style problems
        const wrappedCode = `
const fs = require('fs');

// Read input from file
const input = fs.readFileSync('input.txt', 'utf8').trim();
const lines = input.split('\\n');

// ListNode class for linked list problems
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to create linked list from array
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

${code}

    // Execute the solution based on the problem type
    try {
        let result;
        
        // Check if it's a function that needs to be called
        if (typeof twoSum === 'function') {
            // Two Sum problem
            const nums = JSON.parse(lines[0]);
            const target = parseInt(lines[1]);
            result = twoSum(nums, target);
        } else if (typeof addTwoNumbers === 'function') {
            // Add Two Numbers problem
            const l1Array = JSON.parse(lines[0]);
            const l2Array = JSON.parse(lines[1]);
            const l1 = createLinkedList(l1Array);
            const l2 = createLinkedList(l2Array);
            const resultList = addTwoNumbers(l1, l2);
            result = linkedListToArray(resultList);
        } else if (typeof isValid === 'function') {
            // Valid Parentheses problem
            const s = lines[0];
            result = isValid(s);
        } else if (typeof maxSubArray === 'function') {
            // Maximum Subarray problem
            const nums = JSON.parse(lines[0]);
            result = maxSubArray(nums);
        } else if (typeof mergeTwoLists === 'function') {
            // Merge Two Sorted Lists problem
            const list1Array = JSON.parse(lines[0]);
            const list2Array = JSON.parse(lines[1]);
            const list1 = createLinkedList(list1Array);
            const list2 = createLinkedList(list2Array);
            const resultList = mergeTwoLists(list1, list2);
            result = linkedListToArray(resultList);
        } else {
            // Generic case - try to call the function with input
            const inputData = lines.length === 1 ? lines[0] : lines;
            result = eval('(' + inputData + ')');
        }
        
        // Format output to match expected format
        if (Array.isArray(result)) {
            console.log(JSON.stringify(result));
        } else {
            console.log(JSON.stringify(result));
        }
    } catch (error) {
        console.error('Execution error:', error.message);
        process.exit(1);
    }
`;

        await writeFile(codeFile, wrappedCode);
        await writeFile(inputFile, input);

        try {
            const { stdout, stderr } = await execAsync(`node ${codeFile}`, {
                timeout: this.TIMEOUT,
                cwd: tempDir,
            });

            return {
                success: true,
                output: stdout.trim(),
                error: stderr || undefined,
                runtime: 0,
                memory: 0,
            };
        } catch (execError: any) {
            return {
                success: false,
                error: execError.stderr || execError.message,
                runtime: 0,
                memory: 0,
            };
        }
    }

    private static async runJava(
        code: string,
        input: string,
        tempDir: string,
    ): Promise<CodeExecutionResult> {
        const codeFile = join(tempDir, 'Solution.java');
        const inputFile = join(tempDir, 'input.txt');

        // Ensure code has proper class structure
        let javaCode = code;
        if (!code.includes('public class')) {
            javaCode = `
public class Solution {
    public static void main(String[] args) {
        // Your code here
        ${code}
    }
}`;
        }

        await writeFile(codeFile, javaCode);
        await writeFile(inputFile, input);

        try {
            // Compile
            await execAsync(`javac ${codeFile}`, { cwd: tempDir });

            // Run
            const { stdout, stderr } = await execAsync(`java Solution < ${inputFile}`, {
                timeout: this.TIMEOUT,
                cwd: tempDir,
            });

            return {
                success: true,
                output: stdout.trim(),
                error: stderr || undefined,
                runtime: 0,
                memory: 0,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.stderr || error.message,
                runtime: 0,
                memory: 0,
            };
        }
    }

    private static async runCpp(
        code: string,
        input: string,
        tempDir: string,
    ): Promise<CodeExecutionResult> {
        const codeFile = join(tempDir, 'code.cpp');
        const inputFile = join(tempDir, 'input.txt');

        // Ensure code has proper structure
        let cppCode = code;
        if (!code.includes('int main')) {
            cppCode = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

${code}

int main() {
    // Your code here
    return 0;
}`;
        }

        await writeFile(codeFile, cppCode);
        await writeFile(inputFile, input);

        try {
            // Compile
            await execAsync(`g++ -o code ${codeFile}`, { cwd: tempDir });

            // Run
            const { stdout, stderr } = await execAsync(`./code < ${inputFile}`, {
                timeout: this.TIMEOUT,
                cwd: tempDir,
            });

            return {
                success: true,
                output: stdout.trim(),
                error: stderr || undefined,
                runtime: 0,
                memory: 0,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.stderr || error.message,
                runtime: 0,
                memory: 0,
            };
        }
    }

    private static compareOutput(actual: string, expected: string): boolean {
        // Normalize whitespace and line endings
        const normalize = (str: string) => str.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        const normalizedActual = normalize(actual);
        const normalizedExpected = normalize(expected);

        // If they're exactly the same, return true
        if (normalizedActual === normalizedExpected) {
            return true;
        }

        // Try to parse as JSON arrays and compare
        try {
            const actualParsed = JSON.parse(normalizedActual);
            const expectedParsed = JSON.parse(normalizedExpected);

            // If both are arrays, compare them
            if (Array.isArray(actualParsed) && Array.isArray(expectedParsed)) {
                if (actualParsed.length !== expectedParsed.length) {
                    return false;
                }
                return actualParsed.every((val, index) => val === expectedParsed[index]);
            }

            // If both are primitive values, compare them
            return actualParsed === expectedParsed;
        } catch {
            // If JSON parsing fails, fall back to string comparison
            return normalizedActual === normalizedExpected;
        }
    }
}
