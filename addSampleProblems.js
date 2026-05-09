require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/problem');

const sampleProblems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume exactly one solution exists.",
    difficulty: "Easy",
    xp: 100,
    tags: ["python", "javascript", "cpp", "java", "c"],
    starterCode: {
      python: "def twoSum(nums, target):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    nums = [2, 7, 11, 15]\n    target = 9\n    result = twoSum(nums, target)\n    print(result)",
      javascript: "function twoSum(nums, target) {\n    // Write your solution here\n}\n\n// Example usage\nconst nums = [2, 7, 11, 15];\nconst target = 9;\nconst result = twoSum(nums, target);\nconsole.log(result);",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n}\n\nint main() {\n    vector<int> nums = {2, 7, 11, 15};\n    int target = 9;\n    vector<int> result = twoSum(nums, target);\n    for (int num : result) {\n        cout << num << \" \";\n    }\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {2, 7, 11, 15};\n        int target = 9;\n        int[] result = sol.twoSum(nums, target);\n        System.out.println(Arrays.toString(result));\n    }\n}",
      c: "#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution here\n}\n\nint main() {\n    int nums[] = {2, 7, 11, 15};\n    int target = 9;\n    int returnSize;\n    int* result = twoSum(nums, 4, target, &returnSize);\n    \n    for (int i = 0; i < returnSize; i++) {\n        printf(\"%d \", result[i]);\n    }\n    free(result);\n    return 0;\n}"
    },
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" }
    ]
  },
  {
    title: "Reverse a String",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "Easy",
    xp: 100,
    tags: ["python", "javascript", "cpp", "java", "c"],
    starterCode: {
      python: "def reverseString(s):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    s = ['h', 'e', 'l', 'l', 'o']\n    result = reverseString(s)\n    print(result)",
      javascript: "function reverseString(s) {\n    // Write your solution here\n}\n\n// Example usage\nconst s = ['h', 'e', 'l', 'l', 'o'];\nconst result = reverseString(s);\nconsole.log(result);",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<char> reverseString(vector<char>& s) {\n    // Write your solution here\n}\n\nint main() {\n    vector<char> s = {'h', 'e', 'l', 'l', 'o'};\n    vector<char> result = reverseString(s);\n    for (char c : result) {\n        cout << c;\n    }\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public char[] reverseString(char[] s) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        char[] s = {'h', 'e', 'l', 'l', 'o'};\n        char[] result = sol.reverseString(s);\n        System.out.println(Arrays.toString(result));\n    }\n}",
      c: "#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char* s, int sSize) {\n    // Write your solution here\n}\n\nint main() {\n    char s[] = {'h', 'e', 'l', 'l', 'o'};\n    int sSize = sizeof(s) / sizeof(s[0]);\n    reverseString(s, sSize);\n    \n    for (int i = 0; i < sSize; i++) {\n        printf(\"%c \", s[i]);\n    }\n    return 0;\n}"
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' }
    ]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    xp: 100,
    tags: ["python", "javascript", "cpp", "java", "c"],
    starterCode: {
      python: "def isValid(s):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    s = '()'\n    result = isValid(s)\n    print(result)",
      javascript: "function isValid(s) {\n    // Write your solution here\n}\n\n// Example usage\nconst s = '()';\nconst result = isValid(s);\nconsole.log(result);",
      cpp: "#include <iostream>\n#include <string>\n#include <stack>\nusing namespace std;\n\nbool isValid(string s) {\n    // Write your solution here\n}\n\nint main() {\n    string s = \"()\";\n    bool result = isValid(s);\n    cout << (result ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"()\";\n        boolean result = sol.isValid(s);\n        System.out.println(result);\n    }\n}",
      c: "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nbool isValid(char* s) {\n    // Write your solution here\n}\n\nint main() {\n    char s[] = \"()\";\n    bool result = isValid(s);\n    printf(\"%s\\n\", result ? \"true\" : \"false\");\n    return 0;\n}"
    },
    testCases: [
      { input: "s = '()'", expectedOutput: "true" },
      { input: "s = '()[]{}'", expectedOutput: "true" },
      { input: "s = '(]'", expectedOutput: "false" }
    ]
  },
  {
    title: "Binary Search",
    description: "Given a sorted array of integers and a target, return the index of the target using binary search. Return -1 if not found.",
    difficulty: "Easy",
    xp: 100,
    tags: ["python", "javascript", "cpp", "java", "c"],
    starterCode: {
      python: "def binarySearch(nums, target):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    nums = [-1,0,3,5,9,12]\n    target = 9\n    result = binarySearch(nums, target)\n    print(result)",
      javascript: "function binarySearch(nums, target) {\n    // Write your solution here\n}\n\n// Example usage\nconst nums = [-1,0,3,5,9,12];\nconst target = 9;\nconst result = binarySearch(nums, target);\nconsole.log(result);",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint binarySearch(vector<int>& nums, int target) {\n    // Write your solution here\n}\n\nint main() {\n    vector<int> nums = {-1,0,3,5,9,12};\n    int target = 9;\n    int result = binarySearch(nums, target);\n    cout << result << endl;\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public int binarySearch(int[] nums, int target) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {-1,0,3,5,9,12};\n        int target = 9;\n        int result = sol.binarySearch(nums, target);\n        System.out.println(result);\n    }\n}",
      c: "#include <stdio.h>\n\nint binarySearch(int* nums, int numsSize, int target) {\n    // Write your solution here\n}\n\nint main() {\n    int nums[] = {-1,0,3,5,9,12};\n    int numsSize = sizeof(nums) / sizeof(nums[0]);\n    int target = 9;\n    int result = binarySearch(nums, numsSize, target);\n    printf(\"%d\\n\", result);\n    return 0;\n}"
    },
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4" }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return the merged list sorted.",
    difficulty: "Easy",
    xp: 100,
    tags: ["python", "javascript", "cpp", "java"],
    starterCode: {
      python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef mergeTwoLists(l1, l2):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    # Create lists: [1,2,4] and [1,3,4]\n    l1 = ListNode(1, ListNode(2, ListNode(4)))\n    l2 = ListNode(1, ListNode(3, ListNode(4)))\n    result = mergeTwoLists(l1, l2)\n    # Print result\n    while result:\n        print(result.val, end=' ')\n        result = result.next",
      javascript: "class ListNode {\n    constructor(val = 0, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n\nfunction mergeTwoLists(l1, l2) {\n    // Write your solution here\n}\n\n// Example usage\nconst l1 = new ListNode(1, new ListNode(2, new ListNode(4)));\nconst l2 = new ListNode(1, new ListNode(3, new ListNode(4)));\nconst result = mergeTwoLists(l1, l2);\n\n// Print result\nlet current = result;\nwhile (current) {\n    console.log(current.val);\n    current = current.next;\n}",
      cpp: "#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    // Write your solution here\n}\n\nint main() {\n    // Create lists: [1,2,4] and [1,3,4]\n    ListNode* l1 = new ListNode(1);\n    l1->next = new ListNode(2);\n    l1->next->next = new ListNode(4);\n    \n    ListNode* l2 = new ListNode(1);\n    l2->next = new ListNode(3);\n    l2->next->next = new ListNode(4);\n    \n    ListNode* result = mergeTwoLists(l1, l2);\n    \n    // Print result\n    while (result) {\n        cout << result->val << \" \";\n        result = result->next;\n    }\n    return 0;\n}",
      java: "class ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        \n        // Create lists: [1,2,4] and [1,3,4]\n        ListNode l1 = new ListNode(1, new ListNode(2, new ListNode(4)));\n        ListNode l2 = new ListNode(1, new ListNode(3, new ListNode(4)));\n        \n        ListNode result = sol.mergeTwoLists(l1, l2);\n        \n        // Print result\n        while (result != null) {\n            System.out.print(result.val + \" \");\n            result = result.next;\n        }\n    }\n}"
    },
    testCases: [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }
    ]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    difficulty: "Medium",
    xp: 200,
    tags: ["python", "javascript", "cpp", "java", "c"],
    starterCode: {
      python: "def maxSubArray(nums):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    nums = [-2,1,-3,4,-1,2,1,-5,4]\n    result = maxSubArray(nums)\n    print(result)",
      javascript: "function maxSubArray(nums) {\n    // Write your solution here\n}\n\n// Example usage\nconst nums = [-2,1,-3,4,-1,2,1,-5,4];\nconst result = maxSubArray(nums);\nconsole.log(result);",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Write your solution here\n}\n\nint main() {\n    vector<int> nums = {-2,1,-3,4,-1,2,1,-5,4};\n    int result = maxSubArray(nums);\n    cout << result << endl;\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {-2,1,-3,4,-1,2,1,-5,4};\n        int result = sol.maxSubArray(nums);\n        System.out.println(result);\n    }\n}",
      c: "#include <stdio.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    // Write your solution here\n}\n\nint main() {\n    int nums[] = {-2,1,-3,4,-1,2,1,-5,4};\n    int numsSize = sizeof(nums) / sizeof(nums[0]);\n    int result = maxSubArray(nums, numsSize);\n    printf(\"%d\\n\", result);\n    return 0;\n}"
    },
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" }
    ]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Medium",
    xp: 200,
    tags: ["python", "javascript", "cpp", "java", "c"],
    starterCode: {
      python: "def climbStairs(n):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    n = 2\n    result = climbStairs(n)\n    print(result)",
      javascript: "function climbStairs(n) {\n    // Write your solution here\n}\n\n// Example usage\nconst n = 2;\nconst result = climbStairs(n);\nconsole.log(result);",
      cpp: "#include <iostream>\nusing namespace std;\n\nint climbStairs(int n) {\n    // Write your solution here\n}\n\nint main() {\n    int n = 2;\n    int result = climbStairs(n);\n    cout << result << endl;\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int n = 2;\n        int result = sol.climbStairs(n);\n        System.out.println(result);\n    }\n}",
      c: "#include <stdio.h>\n\nint climbStairs(int n) {\n    // Write your solution here\n}\n\nint main() {\n    int n = 2;\n    int result = climbStairs(n);\n    printf(\"%d\\n\", result);\n    return 0;\n}"
    },
    testCases: [
      { input: "n = 2", expectedOutput: "2" },
      { input: "n = 3", expectedOutput: "3" }
    ]
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its node values.",
    difficulty: "Medium",
    xp: 200,
    tags: ["python", "javascript", "cpp", "java"],
    starterCode: {
      python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorderTraversal(root):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    # Create tree: [1,null,2,3]\n    root = TreeNode(1)\n    root.right = TreeNode(2)\n    root.right.left = TreeNode(3)\n    result = inorderTraversal(root)\n    print(result)",
      javascript: "class TreeNode {\n    constructor(val = 0, left = null, right = null) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nfunction inorderTraversal(root) {\n    // Write your solution here\n}\n\n// Example usage\nconst root = new TreeNode(1);\nroot.right = new TreeNode(2);\nroot.right.left = new TreeNode(3);\nconst result = inorderTraversal(root);\nconsole.log(result);",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<int> inorderTraversal(TreeNode* root) {\n    // Write your solution here\n}\n\nint main() {\n    // Create tree: [1,null,2,3]\n    TreeNode* root = new TreeNode(1);\n    root->right = new TreeNode(2);\n    root->right->left = new TreeNode(3);\n    \n    vector<int> result = inorderTraversal(root);\n    \n    // Print result\n    for (int val : result) {\n        cout << val << \" \";\n    }\n    return 0;\n}",
      java: "class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n    TreeNode(int val, TreeNode left, TreeNode right) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nclass Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        \n        // Create tree: [1,null,2,3]\n        TreeNode root = new TreeNode(1);\n        root.right = new TreeNode(2);\n        root.right.left = new TreeNode(3);\n        \n        List<Integer> result = sol.inorderTraversal(root);\n        System.out.println(result);\n    }\n}"
    },
    testCases: [
      { input: "root = [1,null,2,3]", expectedOutput: "[1,3,2]" }
    ]
  },
  {
    title: "Longest Common Subsequence",
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. Return 0 if none exists.",
    difficulty: "Hard",
    xp: 400,
    tags: ["python", "cpp", "java"],
    starterCode: {
      python: "def longestCommonSubsequence(text1, text2):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    text1 = \"abcde\"\n    text2 = \"ace\"\n    result = longestCommonSubsequence(text1, text2)\n    print(result)",
      cpp: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint longestCommonSubsequence(string text1, string text2) {\n    // Write your solution here\n}\n\nint main() {\n    string text1 = \"abcde\";\n    string text2 = \"ace\";\n    int result = longestCommonSubsequence(text1, text2);\n    cout << result << endl;\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String text1 = \"abcde\";\n        String text2 = \"ace\";\n        int result = sol.longestCommonSubsequence(text1, text2);\n        System.out.println(result);\n    }\n}"
    },
    testCases: [
      { input: 'text1 = "abcde", text2 = "ace"', expectedOutput: "3" }
    ]
  },
  {
    title: "0/1 Knapsack Problem",
    description: "Given weights and values of n items and a knapsack capacity W, find the maximum value you can achieve without exceeding the weight limit.",
    difficulty: "Hard",
    xp: 400,
    tags: ["python", "cpp", "java"],
    starterCode: {
      python: "def knapsack(weights, values, W):\n    # Write your solution here\n    pass\n\n# Example usage\nif __name__ == '__main__':\n    weights = [1,2,3]\n    values = [6,10,12]\n    W = 5\n    result = knapsack(weights, values, W)\n    print(result)",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint knapsack(vector<int>& weights, vector<int>& values, int W) {\n    // Write your solution here\n}\n\nint main() {\n    vector<int> weights = {1,2,3};\n    vector<int> values = {6,10,12};\n    int W = 5;\n    int result = knapsack(weights, values, W);\n    cout << result << endl;\n    return 0;\n}",
      java: "import java.util.*;\n\npublic class Solution {\n    public int knapsack(int[] weights, int[] values, int W) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] weights = {1,2,3};\n        int[] values = {6,10,12};\n        int W = 5;\n        int result = sol.knapsack(weights, values, W);\n        System.out.println(result);\n    }\n}"
    },
    testCases: [
      { input: "weights = [1,2,3], values = [6,10,12], W = 5", expectedOutput: "22" }
    ]
  }
];

async function addSampleProblems() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing problems
    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    // Add sample problems
    const insertedProblems = await Problem.insertMany(sampleProblems);
    console.log(`Added ${insertedProblems.length} sample problems:`);
    
    insertedProblems.forEach((problem, index) => {
      console.log(`${index + 1}. ${problem.title} (${problem.difficulty}) - ${problem.xp} XP`);
    });

    console.log('\nSample problems added successfully!');
  } catch (error) {
    console.error('Error adding sample problems:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSampleProblems();
