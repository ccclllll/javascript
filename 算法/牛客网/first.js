/**
 * 对数器
 */

var testUtil = {
    arrayGenerator: function (size, value) {

        size = Math.round(Math.random() * (size + 1));
        var ret = new Array(size);
        for (var index = 0; index < ret.length; index++) {
            ret[index] = Math.round(Math.random() * (value + 1)) - Math.round(Math.random() * (value + 1));
        }
        return ret;
    },
    copyArray: function (array) {
        var ret = [];
        array.forEach((element, index) => {
            ret[index] = element;
        });
        return ret;
    },
    equal: function (array1, array2) {

        if (array1.__proto__.constructor !== Array ||
            array2.__proto__.constructor !== Array || array1.length !== array2.length) {
            return false;
        }

        for (var i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    },
    test: function (rightMethod, testMethod, value, size, time) {
        if (typeof rightMethod !== 'function' || typeof testMethod !== 'function') {
            throw 'parameter error';
        }

        for (var count = 0; count < time; count++) {
            var array = this.arrayGenerator(size, value);
            var copyArray = this.copyArray(array);
            var copyArray1 = this.copyArray(array);

            var testResult = testMethod(array);
            var rightResult = rightMethod(copyArray);
            if (!this.equal(rightResult, testResult)) {
                console.log('fuck error')
                return {
                    errorMsg: 'error',
                    testData: copyArray1,
                    testResult: testResult,
                    rightResult: rightResult
                }

            }
        }
        return {
            message: 'method right'
        }
    }
}

/**
 * 二分查找
 * 
 * */

function banarySearch(arr, key) {
    if (!arr || arr.__proto__.constructor !== Array) {
        return;
    }

    var low = 0,
        high = arr.length - 1;

    var flag = false;
    while (low <= high && !flag) {

        var midIndex = Math.floor((high + low) / 2);

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

console.log(banarySearch([0, 1, 2, 4, 5], 5));
/**
 * 冒泡排序
 * 时间复杂度 n-1 + n-2 + ... 1 O(n^2)
 * 思路: 第一趟排序,此时end为length-1，遍历数组到end项目，当前元素和下一个元素比较，若大于，则交换，一直到n-1 和 n项比较 ，此时最大项确定，end--
 * 第二趟排序，遍历数组到end项目，逐个比较，确定第二大元素
 * 以此类推，直到end为0
 * 
 * */
function bubbleSort(arr) {
    //console.log(arr.__proto__)
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }
    var exchange;
    for (var end = arr.length - 1; end > 0; end--) {
        for (j = 0; j < end; j++) {
            if (arr[j] > arr[j + 1]) {
                exchange = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = exchange;
            }
        }
    }
    return arr;
}


/**
 * 选择排序
 * 时间复杂度 n + n-1 + ... 1
 * 思路：
 * 从数组第0个开始，假定第0个为数组最小值，0后面的项与第0项比较，确定最小项的索引，最后与第0项交换，数组最小值确定
 * 假定第一项为剩余未排序项目的最小值，按上述方法确定数组第二小。
 * 以此类推，直到第n-1项
 */
function selectionSort(arr) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }
    for (var i = 0; i < arr.length - 1; i++) {
        var minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            arr[minIndex] < arr[j] ? minIndex : minIndex = j;
        }
        exchange(arr, i, minIndex);
    }
    return arr;
}

function exchange(arr, i, j) {
    var exchange;
    exchange = arr[i];
    arr[i] = arr[j];
    arr[j] = exchange;
}

console.log(bubbleSort([4, 5, 7, 3, 2, 9, 10]))
console.log(selectionSort([4, 5, 7, 3, 2, 9, 10]))


/**
 * 插入排序 O(n^2) 按最差情况进行计算
 *
 * @param {*} arr
 * @returns
 */
function insertSort(arr) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }

    for (var index = 1; index < arr.length; index++) {
        var key = arr[index];
        var location = index - 1;
        while (location >= 0 && key < arr[location]) {
            arr[location + 1] = arr[location];
            location--;
        }
        arr[location + 1] = key;
    }
    return arr;
}

/**
 * 归并排序 分治
 * 时间复杂度：O(n*log(2,n))  T(N) = 2T(N/2)+O(N)
 */
function mergerSort(arr, left, right) {
    if (left === right) {
        return;
    }
    var mid = Math.floor((left + right) / 2);

    // 排左部分
    mergerSort(arr, left, mid);
    // 排右部分
    mergerSort(arr, mid + 1, right);

    // 归并操作
    var help = [];
    var p1 = left;
    var p2 = mid + 1;
    var i = 0;

    // 通过辅助数组进行排序
    while (p1 <= mid && p2 <= right) {
        arr[p1] < arr[p2] ? help[i++] = arr[p1++] : help[i++] = arr[p2++];
    }


    while (p1 <= mid) {
        help[i++] = arr[p1++];
    }

    while (p2 <= right) {
        help[i++] = arr[p2++];
    }

    // 复制到原数组
    for (var index = left, i = 0; index <= right; index++) {
        arr[index] = help[i++];
    }
    return arr;
}

console.log(insertSort([4, 5, 7, 3, 2, 9, 10]));

console.log(testUtil.test(insertSort, bubbleSort, 100, 20, 1000));

function feiqi(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return feiqi(n - 1) + feiqi(n - 2);
}

console.log(feiqi(6))

var arr1 = [4, 5, 3, 2, 9, 10];
mergerSort(arr1, 0, 5);
console.log(mergerSort([4, 5, 7, 3, 2, 9, 10, 234, 23, 232, 21, 23, 1, 34, 143, 134, 212, 1323], 0, 5));

/**
 *小和问题
 *
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @returns
 */
function min_sum(arr, left, right) {
    if (left === right) {
        return 0;
    }
    var mid = Math.floor((left + right) / 2);

   // mid = left + (right - left) >> 1;

    // 排左部分
    var sum1 = min_sum(arr, left, mid);
    // 排右部分
    var sum2 = min_sum(arr, mid + 1, right);

    // 归并操作
    var help = [];
    var p1 = left;
    var p2 = mid + 1;
    var i = 0;
    var sum = 0;

    var count = 0;
    // 通过辅助数组进行排序
    while (p1 <= mid && p2 <= right) {
        sum += arr[p1] < arr[p2] ? (right - p2 + 1) * arr[p1] : 0;

        arr[p1] < arr[p2] ? help[i++] = arr[p1++] : help[i++] = arr[p2++];
    }


    while (p1 <= mid) {
        help[i++] = arr[p1++];
    }

    while (p2 <= right) {
        help[i++] = arr[p2++];
    }

    // 复制到原数组
    for (var index = left, i = 0; index <= right; index++) {
        arr[index] = help[i++];
    }

    return sum1 + sum2 + sum;

}

console.log(min_sum([1, 3, 1, 4, 2, 2, 2], 0, 6))

//逆序对问题 左边的数比右边的数大，则构成一个逆序对 打印所有的逆序对


function reserveCoup(arr) {
    if (!arr || arr.__proto__.constructor !== Array || arr.length < 2) {
        return arr;
    }

    console.log(arr)
    reMergerSort(arr, 0, arr.length - 1);

}

function reMergerSort(arr, left, right) {

    if (left === right) {
        return;
    }

    var mid = Math.floor((left + right) / 2);
    console.log('mid'+mid+'left'+left+'right'+right)
    reMergerSort(arr, left, mid);
    reMergerSort(arr, mid + 1, right);

    var p1 = left;
    var p2 = mid + 1;
    var help = [];

    var index = 0;
    while (p1 <= mid && p2 <= right) {
        console.log('p1'+p1)
        if (arr[p1] > arr[p2]) {
           
            for (var pp = 0; pp < mid - p1 +1; pp++) {
               
                console.log(arr[p1+pp]+','+arr[p2]);
            }
        }
        help[index++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }

    while (p1 <= mid) {
        help[index++] = arr[p1++];
    }

    while (p2 <= right) {
        help[index++] = arr[p2++];
    }

    for (var p3 = 0; p3 <= right - left; p3++) {
        arr[left + p3] = help[p3];
    }

    
}

reserveCoup([2,1,0])