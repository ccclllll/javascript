export class Student{
    constructor(arg){
        this.name = arg.name;
        this.sex = arg.sex;
    }
    sayName(){
        console.log(this.name);
    }
}
export class MiddleStudent extends Student{
    constructor(arg){
        super(arg);
        this.grade = '8';
        this.say = ()=>console.log(b);
    }

    sayGrade(a){console.log(a+this.grade)};
    
}