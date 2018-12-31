function instance() {
    var i = 10;

    console.log(typeof instance)
    console.log(instance instanceof Function)
}

instance();

(function () {
    with (location) {
        var i = 10;
    }
    console.log(i)
})()

function fun1() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function () {
            return i;
        }
    }
    return arr;
}

fun1().forEach(fun => console.log(fun()))


var scope = "1231321"

function fun2() {
    var scope = "123";

    function fun() {
        return scope;
    };

    return fun;
}

function fun3() {
    var scope = "123";
    var fun = function () {

        return this.scope;

    }
    return fun;
}


console.log(fun2())
console.log((fun3()()))


function bi(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            return bi(m, n);
        }
    }
}

var a = bi(0);
a.fun(1), a.fun(2), a.fun(3); // undefined 0  0 0
var b = bi(0).fun(1).fun(2).fun(3);  // undefined 0 1 2
var c = bi(0).fun(1);
c.fun(2);
c.fun(3) // undefined 0 1 1


String.prototype.repeat = function (num) {
    console.log(num);
}
"5".repeat(10)

function HttpClient() {

    this.get = function (url) {
        return new Promise((resolve, reject) => {
                var request = new XMLHttpRequest();
                request.open('get', url);
                request.send();
                request.onreadystatechange = function () {
                    request.readyState == 4 &&(request.status == '200' ? resolve(request.response) : reject(request.response));
                }
            }
        )
    }
}

var http = new HttpClient();

http.get("http://t.weather.sojson.com/api/weather/city/101030100").then(it => {
    console.log(it);
    http.get("http://t.weather.sojson.com/api/weather/city/101030100").then(it => {
        console.log(it)
    }).catch(err=>console.log(err))
}).catch(err=>console.log(err))


function Car() {
    this.move = function () {
        console.log('move')
    }

    this.onstart = function () {
        return function () {
            return this.move;
        }
    }
}

var car = new Car();


(function () {
    var name = '';
    Animal = function () {

    }
    Animal.prototype.setName = function (value) {
        name = value;
    }
    Animal.prototype.getName = function () {
        return name;
    }
})();

var animal = new Animal();
animal.setName("zs");
console.log(animal.getName())
var animal1 = new Animal();
animal.setName("zsss");
console.log(animal1.getName())

console.log(animal.getName())

function count(num) {
    var sum = 0;
    (function () {
        for (var i = 0; i < num; i++) {
            sum += i;
        }
    })(); //使用闭包创建块级作用域 （闭包会携带包含它的函数的作用域）
    return sum;
}

count(10);
console.log(count(10))

function creatIndexFunction() {

    var functions = [];
    for (var i = 0; i < 10; i++) {
        /*        functions[i] = function () {
                    return i;
                }*/
        functions[i] = (function (number) {
            return function () {
                return number;
            }
        })(i)

    }
    return functions;
}

creatIndexFunction().forEach(fun => console.log(fun()))
console.log(this)

function Person(name) {
    this.getName = function () {
        return name;
    }
    this.setName = function (value) {
        name = value;
    }
}

var obj = {
    setName: function () {
        console.log(this)
    },
    setValue: () => {
        console.log(this) // 父执行环境是window
    },

    setValue1: function () {
        setTimeout(() => console.log(this), 100) // 父执行环境是外部的function 外部的function的this指向它的调用者
    },
    setValue2: function () {
        return function () {
            console.log(this)
        }
    },

    obj: {
        fun: () => console.log(this)
    }
}
obj.obj2 = {

    fun: () => console.log(this)

}
/*obj.setName();
obj.setValue();
obj.setValue1.apply(this) //window                  B.apply(A, arguments);
obj.setValue1.call(obj) // obj
obj.setValue1() //obj
obj.setValue2()();*/

//obj.obj.fun();
//obj.obj2.fun()
function PP() {
    this.obj = {
        fun: () => console.log(this), // 定义时绑定this （父执行环境是PP函数，当作为构造函数调用时，this指向创建的对象，当作为普通函数进行调用时，父执行环境是全局函数，this指向它的调用者window)
        name: 123
    }
}

var p = new PP();
p.obj2 = {
    fun: () => console.log(this), //定义时绑定this （父执行环境的this时window)
    name: 123
}
//p.obj.fun()
//p.obj2.fun()

//匿名函数

obj3 = {
    fun: function () {
        console.log(this)
    }
}

function PPP() {
    this.fun = function (fun) {
        fun();
        return function () {
            console.log(this)
        }
    }
}

new PPP().fun(obj3.fun)() // 普通函数没指明调用者时，this指向window，否则指向调用者， 箭头函数在申明时绑定this，this为箭头函数的父执行下环境的this（函数才是一个执行环境，构造函数也是函数，而对象里面不算执行环境）。 通过bind call apply都可以改变this指向
//new PPP().fun().bind(p)()


var scope = 'scope';
function tScope() {
    var scope = 'scope1';
    return function () {
        console.log(scope);
    }
}


(tScope())()
console.log(parseInt(8.7))

var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr1.length)

function reArr(array) {
    (function () {
        var buff = 0;
        for (var i = array.length - 1; i > 0; i--) {
            var index = parseInt(Math.random() * (i + 1));
            buff = array[index];
            array[index] = array[i];
            array[i] = buff;
        }
    })();
    return array;
}

console.log(reArr(arr1))

var htm = document.firstChild;
//var body = document;


var arr2=[1,2,3,4,5,6,7,8,9]

function removeItem(arr,call) {

    if(arr instanceof Array){
        //console.log(arr)
        return arr.filter(call)
    }
}

var ret = removeItem(arr2,(v)=> v%3!==0) // 过滤掉返回值为false的项 将返回值为真的保留

console.log(ret);

(function (window) {

    var MyQObj = function (elementList) {
        this.getElementList = function () {
            return elementList;
        };
        this.setElementList = function (elements) {
            elementList = elements;
        };
    }

    MyQObj.prototype.append = function (position, node) {
        var elementList = this.getElementList();
        console.log(this.getElementList())
        var length = elementList.length;
        if (node instanceof Node) {
            (function () {
                for (var i = 0; i < length; i++) {
                    try {
                        elementList[i].append(position, node);
                    } catch (e) {
                        throw e;
                    }
                }
            })();
        } else if (typeof node == 'string') {
            (function () {
                for (var i = 0; i < length; i++) {
                    elementList[0].insertAdjacentHTML(position, node)
                }
            })();
        }
    }

    MyQObj.prototype.click = function (call) {
        var elementList = this.getElementList();
        for (var i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener('click', call);
        }
    };

    myQ = function (tag) {
        if (tag.startsWith('#')) {
            var element = window.getElementById(tag);
            return new MyQObj([element]);
        } else if (tag.startsWith('.')) {
            var elementList = window.document.getElementsByClassName(tag);
            return new MyQObj(Array.prototype.slice.call(elementList));
        } else {
            var elementList = window.document.getElementsByTagName(tag);
            return new MyQObj(Array.prototype.slice.call(elementList));
        }
    }
})(window);

//
window.onload = function () {
    myQ('div').click(function (e) {
        console.log(e)
    });

/*    myQ('div').append('afterend', '<div style="width: 100px;height: 100px;background-color: #af1087" onclick=\"alert(\'hhh\')\" title="12"></div>');
    myQ('div').append('afterend', '<div style="width: 100px;height: 100px;background-color: #af1087" onclick=\"alert(\'hhh\')\"></div>');*/
    myQ('div').append('afterend', '<label style="width: 100px;height: 100px;background-color: #af1087" onclick=\"alert(\'hhh\')\" title="12"></label>');
    myQ('label').append('afterend', '<label style="display:block;width: 100px;height: 100px;background-color: #af1087" onclick=\"alert(\'hhh\')\"></label>');
}


// dom 继承结构？




