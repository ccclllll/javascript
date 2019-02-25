/**
 * 插入排序
 */

 function insertionSort(arr){
     // 常规数组长度判断

    for(var i =1;i<arr.length;i++){
        var current = arr[i];
        var j =i-1;
        while(j>=0&&arr[j]>current){
            swap(arr,j+1,j--);
        }
    }
    return arr;
 }

 function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

console.log(insertionSort([3,1,2,6,3,5]))

