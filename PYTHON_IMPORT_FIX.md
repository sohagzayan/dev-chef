# Python Import Fix for Type Hints

## Issue Description

The Python starter code was missing necessary imports for type hints, causing `NameError: name 'List' is not defined` and similar errors when running code.

## Problem

When using Python type hints like `List[int]`, `Optional[ListNode]`, etc., the required imports from the `typing` module were missing from the starter code.

## Root Cause

Python type hints require explicit imports:

- `List` from `typing` for list type hints
- `Optional` from `typing` for optional type hints
- Other type hints like `Dict`, `Tuple`, etc. also need imports

## Solution Applied

### 1. Fixed Starter Code in Database

Updated `scripts/seed-starter-code.ts` to include proper imports:

**Before:**

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass
```

**After:**

```python
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass
```

### 2. Fixed Static Data

Updated `src/data/problem-data.ts` to include proper imports for consistency.

### 3. Applied to All Python Problems

Fixed imports for all Python starter code:

- **Two Sum**: Added `from typing import List`
- **Add Two Numbers**: Added `from typing import Optional`
- **Maximum Subarray**: Added `from typing import List`
- **Merge Two Sorted Lists**: Added `from typing import Optional`
- **Best Time to Buy and Sell Stock**: Added `from typing import List`
- **Linked List Cycle**: Added `from typing import Optional`
- **Reverse String**: Added `from typing import List`
- **Move Zeroes**: Added `from typing import List`

## Files Modified

1. `scripts/seed-starter-code.ts` - Updated all Python starter code
2. `src/data/problem-data.ts` - Updated static problem data

## Database Update

Ran the seed script to update the database:

```bash
npx tsx scripts/seed-starter-code.ts
```

## Verification

The fix ensures that:

- ✅ Python code compiles without `NameError`
- ✅ Type hints work correctly
- ✅ Code execution succeeds
- ✅ All test cases can run properly

## Common Python Type Hint Imports

For future reference, here are the common imports needed:

```python
from typing import List, Optional, Dict, Tuple, Set, Union, Any
```

## Testing

To test the fix:

1. Visit any problem page
2. Select Python as the language
3. Try running the code
4. Should no longer get `NameError: name 'List' is not defined`

## Impact

- **Before**: Runtime errors preventing code execution
- **After**: Clean execution with proper type hints
- **User Experience**: Seamless coding experience without import errors
