/**
 * 归并排序 稳定
 * 1. 求得中间索引
 * 2. 对左部分和右部分进行递归
 * 3. 利用外排的方式进行归并，需要一个辅助数组，将数排好放入辅助数组，最后拷贝回原数组
 */
function mergerSort(arr, left, right) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }

    if (left < right) {
        var mid = Math.floor((left + right) / 2);
        mergerSort(arr, left, mid);
        mergerSort(arr, mid + 1, right);
        merger(arr, left, right, mid);
    }

    return arr;
}

function merger(arr, left, right, mid) {
    var help = [];
    var p1 = left;
    var p2 = mid + 1;
    var index = 0;
    while (p1 <= mid && p2 <= right) {
        help[index++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]; // 小于等于则不具有稳定性 先拷贝了右边
    }

    while (p1 <= mid) {
        help[index++] = arr[p1++];
    }

    while (p2 <= right) {
        help[index++] = arr[p2++];
    }
    for (var i = 0; i < right - left + 1; i++) {
        arr[left + i] = help[i];
    }
}

console.log(mergerSort([1, 5, 3, 4, 7, 7, 3, 2], 0, 7))