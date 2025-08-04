export interface TestCase {
    id: string;
    name: string;
    inputs: Record<string, any>;
    expectedOutput: any;
    isCustom?: boolean;
}

export interface Solution {
    id: string;
    title: string;
    description: string;
    code: string;
    language: string;
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
    isPremium?: boolean;
}

export interface Editorial {
    id: string;
    title: string;
    content: string;
    approach: string;
    algorithm: string;
    code: string;
    language: string;
    timeComplexity: string;
    spaceComplexity: string;
    isPremium?: boolean;
}

export interface Submission {
    id: string;
    timestamp: string;
    language: string;
    status:
        | 'accepted'
        | 'wrong_answer'
        | 'time_limit_exceeded'
        | 'runtime_error'
        | 'compilation_error';
    runtime: string;
    memory: string;
    code: string;
    testCasesPassed: number;
    totalTestCases: number;
}

export interface Problem {
    id: string;
    title: string;
    slug: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    category: string;
    tags: string[];
    companies: string[];
    description: string;
    examples: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    constraints: string[];
    followUp?: string;
    starterCode: Record<string, string>; // language -> code
    testCases: TestCase[];
    solutions: Solution[];
    editorial: Editorial;
    submissions: Submission[];
    hints: string[];
    acceptanceRate: number;
    totalSubmissions: number;
    solvedBy: string[]; // Array of user IDs who solved this problem
    isPremium?: boolean;
    estimatedTime: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    attempts?: number;
}

export const problems: Problem[] = [
    {
        id: '688992b1cfbf234f98a74e61',
        title: 'Two Sum',
        slug: 'two-sum',
        difficulty: 'EASY',
        category: 'Array',
        tags: ['Array', 'Hash Table'],
        companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook'],
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
            },
            {
                input: 'nums = [3,2,4], target = 6',
                output: '[1,2]',
            },
            {
                input: 'nums = [3,3], target = 6',
                output: '[0,1]',
            },
        ],
        constraints: [
            '2 <= nums.length <= 10^4',
            '-10^9 <= nums[i] <= 10^9',
            '-10^9 <= target <= 10^9',
            'Only one valid answer exists.',
        ],
        followUp: 'Can you come up with an algorithm that is less than O(n²) time complexity?',
        starterCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        
`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
        },
        testCases: [
            {
                id: '1',
                name: 'Case 1',
                inputs: { nums: [2, 7, 11, 15], target: 9 },
                expectedOutput: [0, 1],
            },
            {
                id: '2',
                name: 'Case 2',
                inputs: { nums: [3, 2, 4], target: 6 },
                expectedOutput: [1, 2],
            },
            {
                id: '3',
                name: 'Case 3',
                inputs: { nums: [3, 3], target: 6 },
                expectedOutput: [0, 1],
            },
            {
                id: '4',
                name: 'Case 4',
                inputs: { nums: [1, 5, 8, 10, 13], target: 18 },
                expectedOutput: [2, 4],
            },
        ],
        solutions: [
            {
                id: '1',
                title: 'Brute Force Approach',
                description: 'Check every pair of numbers in the array',
                code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}`,
                language: 'java',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                explanation:
                    'We use two nested loops to check every possible pair of numbers. For each number, we check if there exists another number that adds up to the target.',
            },
            {
                id: '2',
                title: 'Hash Table Approach',
                description: 'Use a hash table to store complements',
                code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
                language: 'java',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation:
                    'We use a hash table to store each number and its index. For each number, we check if its complement (target - current number) exists in the hash table.',
                isPremium: true,
            },
        ],
        editorial: {
            id: '1',
            title: 'Two Sum - Hash Table Solution',
            content: `The Two Sum problem is a classic algorithmic challenge that tests your understanding of data structures and time complexity optimization.`,
            approach: `The optimal approach uses a hash table to achieve O(n) time complexity. We iterate through the array once, storing each number and its index in a hash table. For each number, we check if its complement (target - current number) already exists in the hash table.`,
            algorithm: `1. Initialize an empty hash table
2. Iterate through the array
3. For each number, calculate its complement (target - current number)
4. If complement exists in hash table, return [complement_index, current_index]
5. Otherwise, add current number and its index to hash table
6. If no solution found, return empty array`,
            code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
            language: 'java',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            isPremium: true,
        },
        submissions: [
            {
                id: '1',
                timestamp: '2024-01-15T10:30:00Z',
                language: 'java',
                status: 'accepted',
                runtime: '2ms',
                memory: '42.3MB',
                code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
                testCasesPassed: 4,
                totalTestCases: 4,
            },
        ],
        hints: [
            "Try using a hash table to store the numbers you've seen so far.",
            'Think about the time complexity - can you do better than O(n²)?',
            'Consider using a two-pointer approach or binary search if the array is sorted.',
        ],
        acceptanceRate: 56.0,
        totalSubmissions: 3240000,
        solvedBy: ['user123', 'user456'],
        estimatedTime: '15 min',
        order: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
    },
    {
        id: '688ce0f28f6225e4814efe02',
        title: 'Add Two Numbers',
        slug: 'add-two-numbers',
        difficulty: 'MEDIUM',
        category: 'Linked List',
        tags: ['Linked List', 'Math', 'Recursion'],
        companies: ['Microsoft', 'Amazon', 'Google', 'Apple'],
        description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
        examples: [
            {
                input: 'l1 = [2,4,3], l2 = [5,6,4]',
                output: '[7,0,8]',
                explanation: '342 + 465 = 807',
            },
            {
                input: 'l1 = [0], l2 = [0]',
                output: '[0]',
            },
            {
                input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',
                output: '[8,9,9,9,0,0,0,1]',
            },
        ],
        constraints: [
            'The number of nodes in each linked list is in the range [1, 100]',
            '0 <= Node.val <= 9',
            'It is guaranteed that the list represents a number that does not have leading zeros.',
        ],
        starterCode: {
            javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};`,
            python: `from typing import Optional

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        
`,
            java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}`,
            cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        
    }
};`,
        },
        testCases: [
            {
                id: '1',
                name: 'Case 1',
                inputs: {
                    l1: [2, 4, 3],
                    l2: [5, 6, 4],
                },
                expectedOutput: [7, 0, 8],
            },
            {
                id: '2',
                name: 'Case 2',
                inputs: {
                    l1: [0],
                    l2: [0],
                },
                expectedOutput: [0],
            },
            {
                id: '3',
                name: 'Case 3',
                inputs: {
                    l1: [9, 9, 9, 9, 9, 9, 9],
                    l2: [9, 9, 9, 9],
                },
                expectedOutput: [8, 9, 9, 9, 0, 0, 0, 1],
            },
        ],
        solutions: [
            {
                id: '1',
                title: 'Elementary Math',
                description: 'Simulate the addition process digit by digit',
                code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            
            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            current = current.next;
        }
        
        return dummy.next;
    }
}`,
                language: 'java',
                timeComplexity: 'O(max(M,N))',
                spaceComplexity: 'O(max(M,N))',
                explanation:
                    'We simulate the elementary math process of adding two numbers digit by digit, handling carry at each step.',
            },
        ],
        editorial: {
            id: '1',
            title: 'Add Two Numbers - Elementary Math',
            content: `This problem tests your understanding of linked lists and elementary mathematics.`,
            approach: `We simulate the process of adding two numbers digit by digit, just like we do on paper. We iterate through both linked lists simultaneously, adding corresponding digits and handling carry.`,
            algorithm: `1. Initialize a dummy node and carry variable
2. Iterate through both lists while either has nodes or carry > 0
3. Add current digits from both lists plus carry
4. Create new node with sum % 10
5. Update carry to sum / 10
6. Move to next nodes in both lists
7. Return dummy.next`,
            code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            
            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            current = current.next;
        }
        
        return dummy.next;
    }
}`,
            language: 'java',
            timeComplexity: 'O(max(M,N))',
            spaceComplexity: 'O(max(M,N))',
            isPremium: true,
        },
        submissions: [],
        hints: [
            'Think about how you would add two numbers on paper.',
            'Consider using a dummy head node to simplify the logic.',
            "Don't forget to handle the carry when the sum is greater than 9.",
        ],
        acceptanceRate: 46.6,
        totalSubmissions: 2100000,
        solvedBy: ['user789'],
        estimatedTime: '25 min',
        order: 2,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
    },
    {
        id: '688992b2cfbf234f98a74e65',
        title: 'Valid Parentheses',
        slug: 'valid-parentheses',
        difficulty: 'EASY',
        category: 'Stack',
        tags: ['Stack', 'String'],
        companies: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'],
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        examples: [
            {
                input: 's = "()"',
                output: 'true',
                explanation: 'Simple valid parentheses',
            },
            {
                input: 's = "()[]{}"',
                output: 'true',
                explanation: 'Multiple types of brackets, all valid',
            },
            {
                input: 's = "(]"',
                output: 'false',
                explanation: 'Mismatched bracket types',
            },
            {
                input: 's = "([)]"',
                output: 'false',
                explanation: 'Incorrect order of brackets',
            },
        ],
        constraints: ['1 <= s.length <= 10^4', "s consists of parentheses only '()[]{}'"],
        starterCode: {
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
            python: `class Solution:
    def isValid(self, s: str) -> bool:
        
`,
            java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
            cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
        },
        testCases: [
            {
                id: '1',
                name: 'Case 1',
                inputs: { s: '()' },
                expectedOutput: true,
            },
            {
                id: '2',
                name: 'Case 2',
                inputs: { s: '()[]{}' },
                expectedOutput: true,
            },
            {
                id: '3',
                name: 'Case 3',
                inputs: { s: '(]' },
                expectedOutput: false,
            },
            {
                id: '4',
                name: 'Case 4',
                inputs: { s: '([)]' },
                expectedOutput: false,
            },
        ],
        solutions: [
            {
                id: '1',
                title: 'Stack Approach',
                description: 'Use a stack to track opening brackets',
                code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                
                char top = stack.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}`,
                language: 'java',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation:
                    'We use a stack to keep track of opening brackets. For each closing bracket, we check if it matches the most recent opening bracket.',
            },
        ],
        editorial: {
            id: '1',
            title: 'Valid Parentheses - Stack Solution',
            content: `This problem is a classic stack application that tests your understanding of data structures.`,
            approach: `We use a stack to keep track of opening brackets. When we encounter a closing bracket, we check if it matches the most recent opening bracket on the stack.`,
            algorithm: `1. Initialize an empty stack
2. Iterate through each character in the string
3. If character is an opening bracket, push it onto the stack
4. If character is a closing bracket:
   - If stack is empty, return false
   - Pop the top element and check if it matches
   - If no match, return false
5. After iteration, return true if stack is empty, false otherwise`,
            code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                
                char top = stack.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}`,
            language: 'java',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            isPremium: true,
        },
        submissions: [
            {
                id: '1',
                timestamp: '2024-01-15T14:20:00Z',
                language: 'java',
                status: 'accepted',
                runtime: '1ms',
                memory: '40.2MB',
                code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}`,
                testCasesPassed: 4,
                totalTestCases: 4,
            },
        ],
        hints: [
            'Use a stack to keep track of opening brackets.',
            'When you encounter a closing bracket, check if it matches the most recent opening bracket.',
            "Don't forget to check if the stack is empty when you encounter a closing bracket.",
        ],
        acceptanceRate: 42.6,
        totalSubmissions: 2800000,
        solvedBy: ['user101'],
        estimatedTime: '20 min',
        order: 3,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
    },
];

// Contest data
export const upcomingContests = [
    {
        id: 'CONTEST_001',
        name: 'Weekly Algorithm Challenge',
        startTime: '2024-01-20 14:00 UTC',
        duration: '2 hours',
        prize: '$500',
        difficulty: 'Medium',
        startsIn: '3 days',
    },
    {
        id: 'CONTEST_002',
        name: 'Data Structures Masterclass',
        startTime: '2024-01-25 16:00 UTC',
        duration: '3 hours',
        prize: '$750',
        difficulty: 'Advanced',
        startsIn: '8 days',
    },
    {
        id: 'CONTEST_003',
        name: 'Dynamic Programming Sprint',
        startTime: '2024-01-28 12:00 UTC',
        duration: '1.5 hours',
        prize: '$300',
        difficulty: 'Medium',
        startsIn: '11 days',
    },
];

export const pastContests = [
    {
        id: 'CONTEST_001_PAST',
        name: 'Array Manipulation Contest',
        startTime: '2024-01-10 14:00 UTC',
        duration: '2 hours',
        participants: 1250,
        winner: 'Alex Chen',
        prize: '$500',
    },
    {
        id: 'CONTEST_002_PAST',
        name: 'String Algorithms Challenge',
        startTime: '2024-01-05 16:00 UTC',
        duration: '2.5 hours',
        participants: 980,
        winner: 'Sarah Johnson',
        prize: '$400',
    },
    {
        id: 'CONTEST_003_PAST',
        name: 'Graph Theory Workshop',
        startTime: '2023-12-28 12:00 UTC',
        duration: '3 hours',
        participants: 750,
        winner: 'Michael Rodriguez',
        prize: '$600',
    },
];

export default problems;
