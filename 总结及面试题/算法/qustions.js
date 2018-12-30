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
splitList(head,30).print()
