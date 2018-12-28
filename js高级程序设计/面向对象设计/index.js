var dog = new Object();
dog._name=""
Object.defineProperty(dog,"name",{
    get:function(){
        return this._name;
    },
    set:function(name){
        this._name = name;
    }
})
dog.name="heih"
console.log(dog)


/**
 * 创建对象
 */

 //1. 工厂模式
 function createStudent(name,sex,age){
     var object = new Object();
     object.name = name;
     object.sex = sex;
     object.age = age;
     return object;
 }

 console.log(createStudent("zs","男",17));
 //2构造函数模式
 function Student(name,sex,age){
   // var object = new Object();
    this.name = name;
    this.sex = sex;
    this.age = age;
}
console.log(new Student("zs","男",17));

//3 原型模式

function Animal(name){
    this.name = name;
    
}

Animal.prototype.sayName= function sayName() {
    console.log(this.name)
}
var pig = new Animal("pig");
pig.sayName();
var dog= new Animal("dog");
dog.sayName();

/**
 * 这样是直接创建新原型，已创建对象的原型和新原型
 */
Animal.prototype = {


}

/**
 * 构造函数定义实例属性
 * 原型定义方法和共享属性
 */

function Person(name,age){
    this.name = name;
    this.age = age;
    // Person.prototype.toString = function(){
    //     return "[name:"+name+"],[age:"+age+"]";
    // }; 这样做每次都会覆盖上一个toString

    /**
     * 动态原型
     */
    if(typeof this.toString != "Function"){
        Person.prototype.toString = function(){
            return "[name:"+name+"],[age:"+age+"],an adult";
        };

        Person.prototype.sayName = function(){
            return this.name;
        }
    }

}

var person = new Person("zs","19");
console.log(person.sayName())

/**
 * 寄生构造
 */

 function MyArray(){
     var array = new Array();
     array.push.apply(array,arguments);
     array.toPipedString = function(){
         return this.join("|");
     }
     return array;
 }

 console.log(new MyArray(1,2,4,5,5).toPipedString())

 /**
  * 稳妥构造 无法得出对象是NPerson 的实例
  */

  function NPerson(name){
      var person = new Object();
      person.name = name;
      person.sayName = function(){
          console.log(person.name)
      }
      return person;
  }


  /**继承 */

  function House (size){
      this.size = size;
      if(typeof this.saySize != "Function"){
          House.prototype.saySize = function(){
              console.log(this.size)
            }
      }
  }
  function VillaHouse(size){
     
  }
  VillaHouse.prototype = new House(100)
 
  //VillaHouse.prototype.constructor = VillaHouse;
  var villa = new VillaHouse();
 // villa.prototype = new House(10)
  House.apply(villa,[1000])
  console.log(villa instanceof VillaHouse);
  console.log(villa.size)
  var villa1 = new VillaHouse();
  console.log(villa1.size)


  /**
   * 组合继承
   */

   /**继承实例属性 */
   function BigHouse(size){
       House.call(this,size);
   }

   /**
    * 继承共享属性和方法
    */
   BigHouse.prototype = new House();

   new BigHouse(10000).saySize()

   var newHouse = Object.create(new BigHouse(999))
   newHouse.saySize()
 
   let promeise = new Promise(function(resovle,reject){
       setTimeout(() => {
           resovle(10)
       }, 1000);
   })

   promeise.then((value)=>console.log(value))