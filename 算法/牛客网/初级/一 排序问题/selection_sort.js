/**
 * 选择排序
 * 1.待排数为arr.length - 1个，从i=0开始排，假定i位置的数是最小的，
 * 从i+1处遍历待排数组，找出待排数组中最小值的索引，与i处交换
 * 2.重复1，直到i等于数组的长度减一
 */

function slectionSort(arr) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }
    //var curentIndex = 0;
    for (var i = 0; i < arr.length; i++) {
        var minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            minIndex = arr[minIndex] < arr[j] ? minIndex : j;
        }
        
        swap(arr,i,minIndex);
    }

    return arr;
}

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

console.log(slectionSort([1,4,5,2,1,0]))