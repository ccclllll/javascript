/**
 * 经典快排 (不稳定)
 * 1. 以数组最右边的值将数组分为三部分，小于区域，等于区域，大于区域 partition
 * 2. 对小于部分和大于部分调用子过程
 */
function normalQuickSort(arr) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }
    return quickSort(arr, 0, arr.length - 1);
}

function quickSort(arr, left, right) {
    if(left<right){
        var p = partition(arr,left,right);
        quickSort(arr,left,p[0]);
        quickSort(arr,p[1],right);
    }
    return arr;
}

/**
 * 荷兰国旗问题 将数组分为三部分 小于区域 等于区域 大于区域
 */
function partition(arr, left, right){
    var less = left - 1,more = right + 1,checkNum = arr[right];
    while (left < more) {
        arr[left] < checkNum ? swap(arr, left++, ++less) :
            arr[left] > checkNum ?  swap(arr, left, --more) : left++ ;
    }
    return [less,more];
}


function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}


// ???? 
function mySwap(i, j) {
    i = i ^ j;
    j = i ^ j;
    i = i ^ j;
    console.log('i=' + i + ',j=' + j)
}

var arr = [3,7,0,1,3,3,6]
normalQuickSort(arr)
console.log(arr)