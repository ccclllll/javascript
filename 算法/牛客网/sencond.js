/**
 * 给定一个数和一个数组，把小于等于给定数的放到数组左边，大于的放到右边，要求时间复杂度为O(n),空间复杂度O(1)
 */
function sortByNum(arr, num) {
    var i = 0;
    var k = 0;
    while (i < arr.length - k) {
        if (arr[i] > num) {
            var temp = arr[i];
            arr[i] = arr[arr.length - k - 1];
            arr[arr.length - k - 1] = temp;
            k++;
        } else {
            i++
        }
    }
    return arr;
}

console.log(sortByNum([2, 4, 6, 7, 9, 1], 2));



function quickSortChild(arr, left, right, num) {
    if (!(left < right)) {
        return;
    }
    var less = left - 1;
    var more = right + 1;
    var currentIndex = left;

    while (currentIndex < more) {
        if (arr[currentIndex] < num) {
            var temp = arr[less + 1];
            arr[less + 1] = arr[currentIndex];
            arr[currentIndex] = temp;
            less++;
            currentIndex++;
        } else if (arr[currentIndex] > num) {
            var temp = arr[more - 1];
            arr[more - 1] = arr[currentIndex];
            arr[currentIndex] = temp;
            more--;
        } else {
            currentIndex++;
        }
    }


    quickSortChild(arr, left, less, arr[more - 1]);
    quickSortChild(arr, more, right, arr[right]);

    return arr;
}


//console.log(quickSortChild([2, 4, 6, 7, 9, 1], 0,5,6));

function quickSort(arr) {
    return quickSortChild(arr, 0, arr.length - 1, arr[arr.length - 1])
}
console.log(quickSort([1,3,4,2]))


function randomQuickSort(arr){
    
}