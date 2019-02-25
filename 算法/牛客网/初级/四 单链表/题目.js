/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if (s.length === 0) {
        return true;
    }
    var stack = [];
    for (var i = 0; i < s.length; i++) {
        var str = s.charAt(i);
        switch (str) {
            case '(':
                stack.push('(');
                break;
            case '[':
                stack.push('[');
                break;
            case '{':
                stack.push('{');
                break;
            case ']':
                if (stack.pop() !== '[') {
                    return false;
                };
                break;
            case '}':
                if (stack.pop() !== '{') {
                    return false;
                };
                break;
            case ')':
                if (stack.pop() !== '(') {
                    return false;
                };
                break;
            default:
                break;
        };

    }
    if (stack.length > 0) {
        return false;
    }
    return true;
};

console.log(isValid('({545555})'))





function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    if (l1 === null && l2 !== null) {
        return l2;
    }
    if (l1 !== null && l2 === null) {
        return l1;
    }
    var l3 = null;
    var last = null;
    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            if (!l3) {
                l3 = l1;
                last = l3;
            } else {
                last.next = l1;
                last = last.next;
            }
            l1 = l1.next;
        } else {
            if (!l3) {
                l3 = l2;
                last = l3;
            } else {
                last.next = l2;
                last = last.next;
            }
            l2 = l2.next;
        }
    }
    l1 ? last.next = l1 : l2 ? last.next = l2 : '';
    return l3;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums.length <= 1) {
        return nums;
    }
    var j = 0;
    var count = 0;
    for (var i = 1; i < nums.length; i++) {
       nums[i] === nums[j]?count++:nums[++j] = nums[i];
    }
    nums.length = nums.length - count;
    return nums;
};

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}



console.log(removeDuplicates([1,1,2,4]))

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    var count = 0,location = 0;
    for(var i = 0;i<nums.length;i++){
        nums[i]!==val?swap(nums,i,location++):count++;
    }
    return nums.length -count;
};

removeElement([3,2,2,3],3)
