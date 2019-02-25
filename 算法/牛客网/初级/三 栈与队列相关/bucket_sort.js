/**
 * 桶排序 基本桶排序（非比较排序，是计数排序）
 */

function bucketSort(arr, max) {

    var newArr = new Array(arr.length + 1),
        i = 0;
    arr.forEach(element => {
        newArr[element] === undefined ? newArr[element] = 1 : newArr[element] = newArr[element] + 1;
    });
    newArr.forEach((element, index) => {
        if (element !== undefined) {
            var num = element;
            while (num) {
                arr[i++] = index;
                num--;
            }
        }
    });
    return arr;
}

//bucketSort([1, 4, 4, 2, 1, 100], 100)

/**
 * 问题：求一个数组，将数组排序之后，相邻两数的差值中的最大者
 * 思路：共n个数，准备n+1个桶，如果最大值最小值相同，返回0，否则，每个桶存放应当放入该桶中的最大值以及最小值，
 * 最后每个桶找前一个非空桶，用当前桶的最大值减去前一个非空桶的最小值，返回差值中的最大值
 */


function largestInterval(arr, max,min) {

    var newArr = new Array(arr.length+1),
        i = 0;
    var factory = parseInt((max-min) / newArr.length);
    arr.forEach(element => {
        var should = parseInt(element / factory);
        if (newArr[should] === undefined) {
            newArr[should] = {
                flag: true,
                min: element,
                max: element
            }
        } else {
            element < newArr[should]['min'] ?
                newArr[should]['min'] = element : element > newArr[should]['max'] ?
                newArr[should]['max'] = element : '';
        }

    });

    var maxInterval = 0;
    for (var index = 0; index < newArr.length; index++) {

        if (newArr[index] === undefined) {
            continue;
        }
        var cur = index;
        while (cur - 1 >= 0) {
            if (newArr[cur - 1] === undefined) {
                cur--;
            } else {
                cur = cur - 1;
                break;
            }
        }

        if (newArr[cur] !== undefined) {
            var dif = newArr[index]['min'] - newArr[cur]['max'];
            maxInterval = maxInterval < dif ? dif : maxInterval;
        }
    }
    return maxInterval;
}


console.log(largestInterval([11, 12,100,101,145,789,10000], 10000,11))
