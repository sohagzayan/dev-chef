import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const starterCodeData = [
    {
        problemId: '688992b1cfbf234f98a74e61', // Two Sum
        solutions: [
            {
                language: 'python',
                code: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688ce0f28f6225e4814efe02', // Add Two Numbers
        solutions: [
            {
                language: 'python',
                code: `from typing import Optional

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
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
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `/**
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
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `/**
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
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688992b2cfbf234f98a74e65', // Valid Parentheses
        solutions: [
            {
                language: 'python',
                code: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af20d', // Maximum Subarray
        solutions: [
            {
                language: 'python',
                code: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af20e', // Merge Two Sorted Lists
        solutions: [
            {
                language: 'python',
                code: `from typing import Optional

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `/**
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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `/**
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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af20f', // Climbing Stairs
        solutions: [
            {
                language: 'python',
                code: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public int climbStairs(int n) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    int climbStairs(int n) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af210', // Best Time to Buy and Sell Stock
        solutions: [
            {
                language: 'python',
                code: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af211', // Linked List Cycle
        solutions: [
            {
                language: 'python',
                code: `from typing import Optional

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af212', // Reverse String
        solutions: [
            {
                language: 'python',
                code: `from typing import List

class Solution:
    def reverseString(self, s: List[str]) -> None:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public void reverseString(char[] s) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
    {
        problemId: '688994cd8f6ed519de3af213', // Move Zeroes
        solutions: [
            {
                language: 'python',
                code: `from typing import List

class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        # Your code here
        pass`,
                isOfficial: true,
            },
            {
                language: 'javascript',
                code: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    // Your code here
    
};`,
                isOfficial: true,
            },
            {
                language: 'java',
                code: `class Solution {
    public void moveZeroes(int[] nums) {
        // Your code here
        
    }
}`,
                isOfficial: true,
            },
            {
                language: 'cpp',
                code: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Your code here
        
    }
};`,
                isOfficial: true,
            },
        ],
    },
];

async function main() {
    try {
        console.log('🚀 Starting starter code seeding...');

        // Delete existing solutions
        console.log('🗑️  Deleting existing solutions...');
        await prisma.solution.deleteMany({});
        console.log('✅ All existing solutions deleted');

        // Create new solutions
        console.log('📝 Creating new solutions...');
        let totalSolutions = 0;

        for (const problemSolutions of starterCodeData) {
            for (const solution of problemSolutions.solutions) {
                await prisma.solution.create({
                    data: {
                        problemId: problemSolutions.problemId,
                        language: solution.language,
                        code: solution.code,
                        isOfficial: solution.isOfficial,
                    },
                });
                totalSolutions++;
            }
        }

        console.log('🎉 Starter code seeding completed successfully!');
        console.log(`📊 Total solutions created: ${totalSolutions}`);
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(() => {
        console.log('✅ Starter code seeding completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Starter code seeding failed:', error);
        process.exit(1);
    });
