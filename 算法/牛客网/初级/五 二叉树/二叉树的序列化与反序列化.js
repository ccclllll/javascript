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

function serialTree(tree) {
    var node = tree;
    if (node === null) {
        return '&!';
    }
    var ret = tree.value + '!';
    ret += serialTree(node.lChild);
    ret += serialTree(node.rChild);
    return ret;
}

console.log(serialTree(tree))


function unSerialTree(str) {
    var stack = [];
    var nodeArray = str.split('!')

    console.log(nodeArray[0])
    var node = new TreeNode(parseInt(nodeArray[0]))
    stack.push(node);
    var tree = node;
    var head = node;
    for (var i = 1; i < nodeArray.length; i++) {
        str = nodeArray[i];
        if (head) {
            if (str !== '&') {
                var node = new TreeNode(parseInt(str))
            } else {
                head = null;
                continue;
            }
            head.lChild = node;
            head = node;
            stack.push(node)
        } else {
            head = stack.pop();
            if(!head){
                break;
            }
            if (str !== '&') {
                var node = new TreeNode(parseInt(str))
            } else {
                head = null;
                continue;
            }
            head.rChild = node;
            head = node;
            stack.push(node)
        }
    }

    return tree;

}
console.log(unSerialTree(serialTree(tree)))