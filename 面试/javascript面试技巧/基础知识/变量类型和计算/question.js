/**1. typeof
 * 变量类型:
 *  1.值类型
 *  2.引用类型
 */
/**2. 何时使用== === 
 * 考点：强制类型转换
 *  1. 字符串拼接
 * 2. ==
 * 3. if
 * 4. 逻辑运算
*/
var a = 100;
var b= 10;
console.log(a+b);
console.log('100'+b)

console.log(100 == '100')
console.log(''== 0)
console.log(null == undefined)

if(a){

}

if(''){

}

if(a&&0){

}

console.log(!!a) // 判断变量会被当做true还是false
// 判断a是undefined和null时用==  其余情况用===
if(a==null){

}
/**3. js有哪些内置函数 
 * Object Array Function Date String Number RegExp Error Boolean 
*/
/**4. js按存储方式区分为 哪些类型，简述其特点*/
/**5. 如何理解JSON */

