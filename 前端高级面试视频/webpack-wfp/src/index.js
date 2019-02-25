import util1 from './util1.js';
import {fun1,fun2} from './util2.js';
import {MiddleStudent} from './student.js';
console.log(new MiddleStudent({name:'zs',sex:'男'}));
//console.log(Student);
fun1();
function Person(){
    this.age = 10;
}
Person.prototype.toString = function(){
    console.log('toString called');
}
function Student(){

    Person.call(this);
    this.name = 'zs';
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
console.log(new Student())
console.log(Person.prototype === Student.prototype.__proto__);
console.log(new Student instanceof Person)
