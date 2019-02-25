/**
 * 不用辅助空间
 * 
 * 2. 可以使用栈结构 入栈逆序 再对比
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function isPalindromic(p){
    var p1 = p; // 快指针
    var p2 = p; // 慢指针
    var p3; // 中点位置

    if(!p1.next||!p){
        return true;
    }
    while(p1.next){
        if(p1.next.next){
            p1 = p1.next.next;
            p2 = p2.next;
        }else{
            p1 = p1.next;
        }
    }
    p3 = p2.next;
    p2.next=null;
    var reserve = reserveNode(p3); // 反转后半部分
    
    var p4 = p; // p4 用来遍历前半部分
    var p5 =reserve; // p5 保存反转之后的头指针
    while(p4&&reserve){
        if(p4.val!==reserve.val){
            return false;
        }
        p4=p4.next;
        reserve =reserve.next;
    }
  
    p2.next = reserveNode(p5); // 将链表反转过来，并加到原链表上
    return true;
}

var node = new ListNode(1);
node.next = new ListNode(2);
node.next.next = new ListNode(1);

console.log(isPalindromic(node))

function reserveNode(node){
    var p1 = node;
    var p2 = node.next;
    p1.next = null;
    var p3;
    if(!p2){
        return node;
    } 
    while(p2){
        p3 = p2;
        p2 = p2.next;
        p3.next = p1;
        p1 = p3;
    }
    node = p3;
    return node;
 //   console.log(node)
}

//reserveNode(node)