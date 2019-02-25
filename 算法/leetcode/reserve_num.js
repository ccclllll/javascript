/**反转可以使用堆栈结构
 * 数字可以通过%10来进行反转
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var ret = 0;
    var max = 2147483647;
    var min = -2147483648;
    console.log(min)
    while(x!=0){
        ret = ret*10 + x%10;
        x = parseInt(x/10)
        if(ret<min || ret>max){
            return 0;
        }
    }
    return ret;
};

console.log(
    reverse(-123))