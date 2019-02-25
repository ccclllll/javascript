/**
 * 二分查找
 */

function banarySearch(arr, key) {
    if (!arr || arr.__proto__.constructor !== Array) {
        return;
    }

    var low = 0,
        high = arr.length - 1;

    var flag = false;
    while (low <= high && !flag) {
        var midIndex = low + ((high-low)>>1); // 注意运算符优先级问题
        console.log(midIndex)
        if (arr[midIndex] === key) {
            flag = true;
        }

        if (arr[midIndex] > key) {
            high = midIndex - 1;
        } else if (arr[midIndex] < key) {
            low = midIndex + 1;
        }
    }
    return flag;

}

console.log(banarySearch([0,1,2,4,5],5));