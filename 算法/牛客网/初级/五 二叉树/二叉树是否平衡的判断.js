
/**
 * 平衡条件：左右子树都平衡，左右子树高度相差为1.
 * 递归返回值：是否平衡，高度（子树高度最大值加一）
 */
function TreeNode(val) {
    this.value = val;
    this.lChild = null;
    this.rChild = null;
}

var tree = new TreeNode(1);
tree.lChild = new TreeNode(2);
tree.rChild = new TreeNode(3);
tree.lChild.lChild = new TreeNode(4);
tree.lChild.rChild = new TreeNode(5);

function isBalanceTree(tree) {
    if (!tree) {
        return {
            isBalance: true,
            high: 0
        };
    }

    var ret1 = isBalanceTree(tree.lChild);
    if (!ret1.isBalance) {
        return {
            isBalance: false,
            high: 0
        };
    }
    var ret2 = isBalanceTree(tree.rChild);
    if (!ret2.isBalance) {
        return {
            isBalance: false,
            high: 0
        };
    }

    if(Math.abs(ret1.high-ret2.high)>1){
        return false;
    }
    return {
        isBalance: true,
        high: Math.max(ret1.high ,ret2.high)+1
    };
}

console.log(isBalanceTree(tree))