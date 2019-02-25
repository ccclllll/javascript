/**
 * 堆排序  不稳定的 在建立堆时可能会破坏稳定性 eg:44455
 * 堆：可以看作是一个完全二叉树，二叉树的每颗子树孩子都小于或者都大于父节点
 * 大根堆：每颗子树孩子都小于父节点
 * 小根堆：每颗子树孩子都大于父节点
 * 利用堆进行排序 
 * 1.首先构建大根堆，堆长为数组的大小。
 * 2.堆顶与堆尾交换，堆长减一，然后针对堆顶调整堆结构
 * 3.重复2步骤，直到堆遍历完成
 */
function heapSort(arr){
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }
    for(var i = 0;i<arr.length;i++){
        heapInsert(arr,i);
    }

    var heapSize = arr.length;
    swap(arr,0,--heapSize);

    while(heapSize>0){
        heapify(arr,0,heapSize);
        swap(arr,0,--heapSize);
    }
    return arr;
}

// 元素入堆
function heapInsert(arr,i){
    var fatherIndex = parseInt((i-1)/2);
    var index = i;
    while(arr[index]>arr[fatherIndex]){
        swap(arr,index,fatherIndex);
        index = fatherIndex;
        fatherIndex = parseInt((index-1)/2);  
    }
}

// 调整堆结构 当某个位置的数的大小发生变化后，调整堆结构
function heapify(arr,index,heapSize){
    var left = index*2+1;
    while(left<heapSize){
        var largest = left+1<heapSize && arr[left]<arr[left+1]?left+1:left;
        largest = arr[index]<arr[largest] ? largest : index;
        if(index === largest){
            break;
        }
        swap(arr,index,largest);
        index = largest;
        left = largest*2+1;
    }
}


function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

console.log(heapSort([0,1,3,4,2,1,0]))
/**
 * 弹出堆顶的数 堆顶和最后一个数置换 然后对堆顶进行 heapify
 */


 /**
  * heapify 
  *  
  */