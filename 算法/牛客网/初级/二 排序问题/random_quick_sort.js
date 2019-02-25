/**
 * 随机快排 时间复杂度 O(nlogn) 空间复杂度 O(logn)
 * 在经典快排的基础上，在待排范围内随机选取一个数作为分界值
 */
function randomQuickSort(arr) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }
    return quickSort(arr, 0, arr.length - 1);
}

function quickSort(arr, left, right) {
    if (!(left < right)) {
        return;
    }
    var less = left - 1,
        more = right + 1;
    // 随机索引
    var num = arr[parseInt(Math.random()*(right - left + 1)+left)];
    var current = left;
    while (current < more) {
        if (arr[current] < num) {
            swap(arr, current++, ++less);
        } else if (arr[current] > num) {
            swap(arr, current, --more);
        } else {
            current++;
        }
    }
    quickSort(arr, left, less);
    quickSort(arr, more, right);
    return arr;
}

/**
 * 根据索引交换位置
 */
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

console.log(randomQuickSort([2, 6, 2, 1, 5, 3, 0, 1]))