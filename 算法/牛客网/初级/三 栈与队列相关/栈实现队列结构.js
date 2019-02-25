/**
 * 两个栈 push栈和pop栈
 * 元素进入时，先加到push栈，需要返回时，如果pop栈没有数据，就将push栈的数据pop到pop栈，然后pop栈返回数据。
 * 如果有数据，则不将push栈的数据pop到pop栈，直接从pop栈返回
 */
function Node(value, next, pre) {
    this.value = value;
    this.next = next;
    this.pre = pre;
}

function LinkAray() {
    this.head = new Node(null, null, null);
    this.last = this.head;
    this.size = 0;
}

LinkAray.prototype.append = function (value) {
    var node = new Node(value,null, null);
    this.last.next = node;
    node.pre = this.last;
    this.last = node;
    this.size++;
}

LinkAray.prototype.getFirst = function () {
    if(!this.size>=1){
        return null;
    }
    return this.head.next.value;
}

LinkAray.prototype.getLast = function () {
    if(!this.size>=1){
        return null;
    }
    return this.last.value;
}

LinkAray.prototype.removeFirst = function () {
    if(!this.size>=1){
        throw 'OutRangeError'
    }
    var value = this.head.next.value;
    if(this.size===1){
        this.head.next = null;
        this.last = this.head;
    }else{
        this.head.next = this.head.next.next;
    }
    this.size--;
    return value;
}

LinkAray.prototype.removeLast = function (){
    if(!this.size>=1){
        throw 'OutRangeError'
    }
    var value = this.last.value;
    if(this.size===1){
        return this.removeFirst();
    }else{
        this.last = this.last.pre;
        this.last.next = null;
    }
    this.size--;
    return value;
}

function Stack(){
    this.linkArray = new LinkAray();
}

Stack.prototype.pop = function(){
    return this.linkArray.removeLast();
}

Stack.prototype.push = function(value){
    this.linkArray.append(value);
}
Stack.prototype.size = function(){
    return this.linkArray.size;
}


// var stack = new Stack();
// for(var i = 0;i<10;i++){
//     stack.push(i);
// }

// for(var i = 0;i<10;i++){
//     console.log(stack.pop())
// }

function StackQueue(){
    this.pushStack = new Stack();
    this.popStack = new Stack();
}

StackQueue.prototype.push = function(item){
    this.pushStack.push(item);

}

StackQueue.prototype.pop = function(){
    if(this.popStack.size()>0){
        return this.popStack.pop();
    }else{
        while(this.pushStack.size()>0){
            this.popStack.push(this.pushStack.pop());
        }
        return this.popStack.pop();
    }
}

var stackQueue = new StackQueue();

for(var i = 0;i<10;i++){
    stackQueue.push(i);
}

for(var i = 0;i<10;i++){
   
    console.log(stackQueue.pop())
}
stackQueue.push(100);
console.log(stackQueue.pop())