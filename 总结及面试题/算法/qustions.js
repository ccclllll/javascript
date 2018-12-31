function Node(data,next){
    this.data = data;
    this.next = next;
}

Node.prototype.generator = function(number){
    var node = this;
    for(var i = 0;i<number;i++){
            node.next = new Node(Math.round(Math.random()*100),null);
            node = node.next;
    }
    return this;
};

Node.prototype.print = function(){
    node = this;
    while(node.next){
        
        node = node.next;
        console.log(node);
    }
}




/**找出倒数第k个 快行指针 */
function findValue(node,position){

    var index = 0;
    var node1 = node;
    var node2;

    while(node1.next){   
        node1 = node1.next;
        index++;
        if(index == position){
            node2 = node.next;
        }
        
        if(index>position){
            node2 = node2.next;
        }
        
    }
    return node2;
}

var head = new Node(0,null);
head.generator(10);
console.log(findValue(head,99))

/** 以x为基准分隔链表 */

function splitList(head,value){

    var begin = head;
    var end = head;
    var pre;
    var length = 0;
    while(end.next){
        end = end.next;
        length++;
    }
+1
    var index = 0;

    while(begin.next){
        pre = begin;
        begin = begin.next;

        index++;
        if(index>=length){
            break;
        }

        if(begin.data>=value){
            end.next = begin;
            pre.next = begin.next;
            end = begin;
            end.next = null; 
            begin = pre; // 必须让指针指向pre，不然无法进行下次迭代
        }
        
    }
    return head;
}

head.print();
console.log('..........................')
splitList(head,30).print();

/** 设计一个栈，除了支持push pop 还支持min */

(function(){

    NodeWithMin = function(data,min,next){

        this.data = data;
        this.min = min;
        this.next = next;
    }

    Stack = function(){
        this.head = new NodeWithMin(null,null,null);
    }

    Stack.prototype.push=function(item){

        var oldNode = this.head.next;
        var newNode = new NodeWithMin(item,null,null);
        oldNode ? (oldNode.min <= item ? newNode.min = oldNode.min : newNode.min = item):newNode.min = item;
        this.head.next = newNode;
        newNode.next = oldNode;
    }

    Stack.prototype.pop = function(){
        var ret = this.head.next;
        this.head.next = ret.next;
        return ret.item;
    }


    Stack.prototype.min = function(){
        return this.head.next.min;
    }

    Stack.prototype.generator = function(number){
        for(var i = 0;i<number;i++){
              this.push(Math.round(Math.random()*100));
        }
        return this;
    };

    Stack.prototype.print = function(){
        var item = this.head;
        while(item.next){
            item = item.next;
            console.log(item.data);0
        }
    };

}
)();

var minStack = new Stack();
minStack.generator(10);
minStack.print();
console.log(minStack.min());
console.log('..........')
minStack.pop();
minStack.print();
console.log(minStack.min());

/**实现一个trim去除字符串前后空白符 */
function trim(str){
    var regExpress = /(^\s+|\s+$)/g;
    return str.replace(regExpress,'');
}

console.log(trim('             sasda            '));


function testReg(){
    var reg = /\w(ad)/g; // 全局匹配模式 result是所有匹配的字符串
    var reg2 = /\w(ad)/; // 匹配的第一个字符串，result第一个是字符串，后面的是圆括号的内容
    var result = 'sadbad'.match(reg);
    var i =0;
    while(i<result.length){

        console.log(result[i]);
        i++;
    }
}

testReg()



