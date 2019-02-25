function ArrayQueue(size) {
    this.size = 0;
    this.start = 0;
    this.end = 0;
    this.array = new Array(size);
}
ArrayQueue.prototype.enter = function (num) {
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

ArrayQueue.prototype.peek = function () {
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

var queue = new ArrayQueue(5);
queue.enter(1);
queue.enter(2);
queue.enter(3);
queue.enter(4);
queue.enter(5);

console.log(queue.peek())
queue.enter(6);
console.log(queue.peek())
queue.enter(7);
console.log(queue.peek())
console.log(queue.peek())
console.log(queue.peek())
console.log(queue.peek())
console.log(queue.peek())

console.log(queue)
console.log(queue.peek())
