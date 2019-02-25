/**
 * 冒泡排序
 * 1. 需排序的数为n
 * 2. 从0到n依次比较，大的放到后面 ;n--
 * 3. 重复2，直到n为0
 * 时间复杂度：O(n^2)
 */
function bubbleSort(arr) {
    var l = arr.length -1 ;
    while (l--) {
        for (var i = 0; i < l; i++) {
            arr[i] > arr[i + 1] ? swap(arr, i, i + 1) : '';
        }
    }
    return arr;
}

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
console.log(bubbleSort([2,5,1,4,5]))