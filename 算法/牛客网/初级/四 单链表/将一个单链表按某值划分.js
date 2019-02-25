/**
 * 划分为小于区域，等于区域，大于区域
 * 解法1. 准备less，equal，more链表，最后串起来
 * 解法2. 转化成数组，用荷兰国旗问题的方式求解
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

function aveList(p, num) {
    var less;
    var lessEnd;
    var equal;
    var equalEnd;
    var more;
    var moreEnd;
    var node = p;
    while (node) {
        if (node.val < num) {
            if (less) {
                lessEnd.next = node;
                lessEnd = node;
            } else {
                less = lessEnd = node;
            }
            node = node.next;
            lessEnd.next = null;

        } else if (node.val > num) {
            if (more) {
                moreEnd.next = node;
                moreEnd = node;
            } else {
                more = moreEnd = node;
            }
            node = node.next;
            moreEnd.next = null;
        } else {
            if (equal) {
                equalEnd.next = node;
                equalEnd = node;
            } else {
                equal = equalEnd = node;
            }
            node = node.next;
            equalEnd.next = null;
        }
    }

    if (less) {
        if (equal) {
            lessEnd.next = equal;
            if (more) {
                equalEnd.next = more;
            }
        }
        return less;
    } else if (equal) {
        if (more) {
            equalEnd.next = more;
        }
        return equal;
    } else {
        return more;
    }


}

var node = new ListNode(1);
node.next = new ListNode(5);
node.next.next = new ListNode(4);
//node.next.next.next = new ListNode(4);

console.log(aveList(node, 4))