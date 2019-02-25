/**
 * 头部入队列
 * 节点出队列
 * 按节点如果有右孩子没有左孩子，直接返回false
 * 将节点的左右孩子加入队列
 * 如果节点的右孩子为空，则开始遍历队列中剩余节点是否都为叶节点。
 * 
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

function isAllBanaryTree(tree) {
    var nodes = [];
    var head = tree;
    var leaf = false;
    if (tree) {
        nodes.push(head);
        while (nodes.length > 0) {
            var node = nodes.shift();
            if (!leaf) {
                if (!node.lChild && node.rChild) {
                    return false;
                }
                if (node.lChild) {
                    nodes.push(node.lChild)
                }

                if (node.rChild) {
                    nodes.push(node.lChild)
                }
                if (!node.rChild) {
                    leaf = true;
                    continue;
                }

            } else {

                // 判断是否为叶节点
                if (node.lChild || node.rChild) {
                    return false;
                }
            }
        }
    }

    return true;
}

console.log(isAllBanaryTree(tree))