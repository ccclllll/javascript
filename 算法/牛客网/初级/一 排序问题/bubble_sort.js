/**
 * 冒泡排序
 * 1. 需排序的数为n
 * 2. 从0到n依次比较，大的放到后面 ;n--
 * 3. 重复2，直到n为0
 * 时间复杂度：O(n^2)
 */
babelSort =  function(arr){

    
    for(var i = arr.length - 1;i>0;i--){
        var maxIndex = i;
        for(var j = 0;j<i;j++){   
            arr[maxIndex]<arr[j] &&( maxIndex = j);
        }
        var temp;
        temp = arr[maxIndex];
        arr[maxIndex] = arr[i];
        arr[i] = temp;    
    }
    return arr;
}
function replace(a,b){
    var temp;
    temp = a;
    a = b;
    b = temp;  
    console.log(a+''+b)
}
// replace(1,3)
// console.log(babelSort([1,4,2,6,9,0,7]))
// console.log(1/-0 === 1/+0)
// console.log(Object.assign([1,2,4],[5,6,7]))
// console.log(Object.assign({},...[{a:2,b:3},{c:4,d:5}]))
let obj = Object.assign({},...[{a:2,b:3},{c:4,d:5}])
for(let [key,value] of Object.entries(obj)){
    console.log(key)
    console.log(value)
}


function divide(a, {b='c'}={b:'gg'}, { option = false } ={}) {
    console.log()
    console.log(option)
}
divide(1)
let {c,d,b,e='c'} = {b:'b',c:'c',d:'d'}
console.log(e)
