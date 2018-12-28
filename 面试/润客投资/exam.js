/**
 * 1. 实现一个高400px,宽600px的静态modal框
 */


 /**
  * 2. 对['2010-10-10','2011-11-8','2014-12-10']进行排序（降序）
  */


  /**
   * 3. 扩展String，使得console.log('hi'.repeat(3))输出为：hihihi
   */

   /**
    * 4. 
    */

    function Car(){
        this.move = function(){
            console.log('123123')
        }
        this.onStart = function(){
            this.move();
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
