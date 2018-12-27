var arr=[1];
console.log(typeof arr[0]);//obj
console.log(Number.MIN_VALUE)
console.log(Number('0x16hjhh'))
var ob= new Object("asad");
console.log(ob.valueOf())
console.log(2.000>>5)

function countNum(num){
   
    if(isNaN(num)){
        throw 'intenger number required';
    }

    var count=1;
    if(num<0){
        num=-num;
    }

    while(num>=10){
        num=num/10;
        count++;
    }
    return count;
}

console.log(countNum(11))
var arr=[];

//with
var student = {
    name:'张三',
    sex:'男'
}
with(student){
    console.log(name);
    console.log(sex)
}

// function fun(){
//     var funV = '123';
// }
// console.log(funV)//error: funV not define
if(true){
    var funV='1234'
}
console.log(funV) // 1234

var und;
console.log(und) //undefined
var arr1 = [1,2,5,4]
console.log(arr1.sort((a,b)=>-(a-b)))

function sum(num1,num2){

    console.log(this.name)
    return num1+num2;
}

console.log(sum.apply(student,[1,2]))
console.log(sum.call(student,1,2))
var sum1=sum.bind(student);

console.log(sum1(1,5));
(function (a,b){console.log(a+b)})(1,2)
delete student.name;
console.log(student);
