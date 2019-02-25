function ArrayQueue(size) {
    this.size = 0;
    this.start = 0;
    this.end = 0;
    this.array = new Array(size);
}
ArrayQueue.prototype.push = function (num) {
    if (this.size === this.array.length) {
        throw 'queue is full'
    }
    this.size = this.size + 1;
    this.array[this.end] = num;
    this.end++;
    if (this.end === this.array.length) {
        this.end = 0;
    }
}

ArrayQueue.prototype.pop = function () {
    if (this.size <= 0) {
        throw 'queue is empty'
    }

    var ret = this.array[this.start];

    this.start = this.start + 1;
    this.size--;
    if (this.start === this.array.length) {
        this.start = 0;
    }
    return ret;
}

function Stack(){
    this.queue1= new ArrayQueue(10);
    this.queue2 = new ArrayQueue(10);
}

/**
 * 数据入队列，
 * 返回时，先将队列前size-1个数放到另一个队列，然后将最后一个数返回，然后又将数据返回到原队列
 */

 function QueueStack(){
     this.pushQueue = new ArrayQueue(10);
     this.popQueue = new ArrayQueue(10);
 }
 QueueStack.prototype.push = function(item){
     this.pushQueue.push(item);
 }

 QueueStack.prototype.pop = function(){
     while(this.pushQueue.size>1){
         
         this.popQueue.push(this.pushQueue.pop());
     }
     var ret = this.pushQueue.pop();
     var temp =this.popQueue;
     this.popQueue = this.pushQueue;
     this.pushQueue = temp;
     return ret;
 }


 /** 测试 */
 var queueStack = new QueueStack();

 for(var i=0;i<10;i++){
     queueStack.push(i)
 }
 
 for(var i=0;i<10;i++){
    console.log(queueStack.pop())
}
queueStack.push(11)
console.log(queueStack.pop())