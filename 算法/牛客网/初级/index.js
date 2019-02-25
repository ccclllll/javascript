// 练习
// 快排
function quickSort(arr) {
  if (!(arr instanceof Array && arr.length > 1)) {
    return arr;
  }

  function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
  }

  function sort(arr, left, right) {
    let index = parseInt(Math.random() * (right - left + 1) + left);
    let value = arr[index];
    let less = left - 1;
    let more = right + 1;
    let i = left;
    while (i < more) {
      arr[i] < value ? swap(arr, ++less, i++) : arr[i] > value ? swap(arr, --more, i) : i++;
    }
    if (less > left) {
      sort(arr, left, less)
    }
    if (right > more) {
      sort(arr, more, right)
    }
  };
  sort(arr, 0, arr.length - 1)
  return arr;
}

console.log(quickSort([1, 2, 5, 2, 7, 3, 2, 6, 4]))

function mergeSort(arr){
  if (!(arr instanceof Array && arr.length > 1)) {
    return arr;
  }


  function sort(arr,left,right){
    if(!(left<right)){
      return;
    }
    var mid = parseInt((left+right)/2);
    sort(arr,left,mid);
    sort(arr,mid+1,right);
    merge(arr,left,right,mid);
    return arr;
  }

  function merge(arr,left,right,mid){
    let help = [];
    let l = left;
    let r = mid+1;
    var i = 0;
    while(l<=mid&&r<=right){
      if(arr[l]<=arr[r]){
        help[i++] = arr[l++];
      }else{
        help[i++] = arr[r++];
      }
    }
    while(l<=mid){
      help[i++] = arr[l++];
    }
    while(r<=right){
      help[i++] = arr[r++];
    }
    for(var index = 0;index<help.length;index++){
      arr[left+index] = help[index];
    }
  }

  return sort(arr,0,arr.length-1)
  
}
console.log(mergeSort([1, 2, 5, 2, 7, 3, 2, 6, 4]))
