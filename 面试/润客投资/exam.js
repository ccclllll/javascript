/**
 * 1. 实现一个高400px,宽600px的静态modal框
 */


 /**
  * 2. 对['2010-10-10','2011-11-8','2014-12-10']进行排序（降序）
  */


  /**
   * 3. 扩展String，使得console.log('hi'.repeat(3))输出为：hihihi
   */

    String.prototype.myRepeat = function(num){
        
        return new Array(num+1).join(this);
    }

   /**
    * 4. 
    */

    function Car(){
        this.move = function(){
            console.log('123123')
        }
        this.onStart = function(){
            document.addEventListener('click',function(e){this.move()})
        }
    }

    var car = new Car();
    car.onStart();



    
    var scope = "global scope";
    function testScope(){
        var scope = "local scope";

        var f = function(){
            return scope;
        }
        return f;

    }


    function testScope(){
        var scope = "local scope";

        return function(){
            return scope;
        }
    }




    console.log(testScope()());


    //栈溢出 
var list = []; // 一个很长的数组

(()=>{
    for(var i = 0;i<10000;i++){
        list[i] =i;
    }
})();
function handList(){
    var item = list.pop();
    if(!item){
        return;
    }
    // 对item进行处理；
    console.log(item);
    handList();
}


//handList();
// 尾递归优化


function handList1(){
    var item = list.pop();
    if(!item){
        return;
    }
    // 对item进行处理；
    return handList1();
}
//handList1();

function factorial(n){
    if(n<=1){
        return 1;
    }else{
        return n*factorial(n-1);
    }
}

function factorialBetter(n,result=1){
    if(n<=1){
        return 1*result;
    }else{
        result = n*result;
        return factorialBetter(n-1,result);
    }
}


var isOneBitCharacter = function(bits) {
    
    var lastCoup = '';

    var flag = 0;
    var i = 0;
    while(i<bits.length-1){
        bits[i]===1 ? i+=2 : i+=1;
    }

    return i === bits.length - 1;

};

console.log(isOneBitCharacter([1,0,0]));
console.log("hhh".myRepeat(3))