var factorial = (function f(num){
    if(num<=1){
        return 1;
    }
    return num*f(num-1);
});
console.log(factorial(3))
var fun = (function(){});
fun();
(function(){})() // 等价

function scopetest(){
    var sum=0;
    (function(){
        for(var i = 0;i<100;i++){
            sum+=i;
        }
    })();
    return sum;
}

console.log(scopetest())

/**私有成员 */

function Computer(name){
    this.getName = function(){
        return name
    }
    this.setName = function(value){
        name = value;
    }
}
var computer = new Computer("ASUS");
console.log(computer.getName())