/**
 * 在中序遍历中，保证序列递增即可
 */
function TreeNode(val) {
    this.value = val;
    this.lChild = null;
    this.rChild = null;
}
var tree = new TreeNode(1);
tree.lChild = new TreeNode(-1);
tree.rChild = new TreeNode(2);
tree.lChild.lChild = new TreeNode(-2);
tree.lChild.rChild = new TreeNode(1);


function isSarchTree(tree) {
    var stack = [];
    var head = tree;
    var preNodeValue = Number.MIN_SAFE_INTEGER;
    if (tree) {
        while (head || stack.length > 0) {
            if (head) {
                stack.push(head);
                head = head.lChild;
            } else {
                head = stack.pop();
                console.log(head.value)
                if (head.value <= preNodeValue) {
                    return false;
                }
                preNodeValue = head.value;
                head = head.rChild;
            }
        }
    }
    return true;
}

console.log(isSarchTree(tree))