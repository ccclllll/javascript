/**
 * 1.构造函数
 */

 /**
  * 2. new 的过程 
  */
 
  /**3. 原型继承 */
function Shap(name){
  this.name = name;
}
Shap.prototype.sayName = function(){
  console.log(this.name);
}

function Circle(name,x,y){
  Shap.call(this,name);
  this.x = x;
  this.y = y;
}

Circle.prototype = Object.create(Shap.prototype);
Circle.prototype.constructor = Circle;

console.log(new Circle('1',10,1) instanceof Circle)