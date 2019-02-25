
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

function printTree(tree) {
    if (!tree) {
        return;
    }
    console.log(tree.value);
    printTree(tree.lChild);
    printTree(tree.rChild)
}

/**
 * 非递归先序遍历
 * 思路：准备一个栈，首先根进站，当栈不为空时，弹出栈顶，打印栈顶，先将栈顶的右孩子加入栈，然后加入左孩子(左孩子先弹出)
 */

function printTreeWithNoRecursion(tree) {
    var stack = [];
    var head = tree;
    if (head) {
        stack.push(head);
        while (stack.length > 0) {
            head = stack.pop();
            console.log(head.value);
            if (head.rChild) {
                stack.push(head.rChild);
            }
            if (head.lChild) {
                stack.push(head.lChild);
            }
        }
    }
}
console.log('----------prePrintTree----------------')

function prePrintTree(tree){
    var stack = [];
    var head;
    if(tree){
        stack.push(tree);
        while(stack.length>0){
            head = stack.pop();
            console.log(head.value)
            if(head.rChild){
                stack.push(head.rChild)
            }

            if(head.lChild){
                stack.push(head.lChild)
            }
        }
    }
}

prePrintTree(tree)
console.log('--------------------------')
/**
 * 中序遍历非递归
 */
function printTreeMidWithNoRecursion(tree) {
    var stack = [];
    var head = tree;
    if (head) {
        while (stack.length > 0 || head) {
            if (head) {
                stack.push(head);
                head = head.lChild;
            } else {
                head = stack.pop();
                console.log(head.value);
                head = head.rChild;
            }
        }
    }
}

printTree(tree)
console.log('--------------------------')
printTreeWithNoRecursion(tree)
console.log('--------------------------')

function printTreeMid(tree) {
    if (!tree) {
        return;
    }
    printTreeMid(tree.lChild);
    console.log(tree.value)
    printTreeMid(tree.rChild);
}
printTreeMid(tree)
console.log('--------------------------')
printTreeMidWithNoRecursion(tree)
console.log('--------------------------')
function printTreeEnd(tree) {
    if (!tree) {
        return;
    }
    printTreeEnd(tree.lChild);
    printTreeEnd(tree.rChild);
    console.log(tree.value)
}


printTreeEnd(tree)
console.log('--------------------------')

function printTreeEndNoRecursion(tree) {
    var stack = [];
    var stack2 = [];
    var head = tree;
    if (head) {
        stack.push(head)
        while (stack.length>0) {
            head = stack.pop();
            stack2.push(head);
            if(head.lChild){
                stack.push(head.lChild)
            }
            if(head.rChild){
                stack.push(head.rChild)
            }
        }
    }

    while(stack2.length>0){
        console.log(stack2.pop().value)
    }
}

printTreeEndNoRecursion(tree)
console.log('--------------------------')


function inPrintTree(tree){
    var stack = [];
    if(tree){
        var head = tree;
        while(head || stack.length>0){
            if(head){
                stack.push(head);
                head = head.lChild;
            }else{
                head = stack.pop();
                console.log(head.value);
                head = head.rChild;
            }
        }
    }
}
inPrintTree(tree)
