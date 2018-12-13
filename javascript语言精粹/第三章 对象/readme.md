1. javascript的基本类型为：数字，字符串，null，boolean，undefined。其余所有的值都是对象。
2. javascript的对象是可变的键控集合。数组是对象，函数是对象，正则表达式是对象，对象是熟悉的容器。
3. javascript的对象是无类型的，可以随意创建新属性，属性是可以除undefined之外的任意值（也就是说，我们可以说这个属性undefined，但是不能  说它的值时undefined。
4. 继承。javascript可通过原型链继承另一个对象的属性。
5. 对象字面量
```javaScript
var obj = {
    '' : '234', // 空字符串可以作为属性名
    a : '1231',
    'a': '1231231' // 'a' 和 a 是同一个属性名。这里会覆盖上一个
}
```
6. 对象都是通过引用传递的，它们不会被复制。
7. 原型继承
当某个对象a通过原型继承另一个对象b时，如果访问a的某个属性c，如果这个属性不存在于a，则会去查找它的原型，从原型中去查找属性c,如果也没有，则从a的原型中去查找，直到Object.protoType。原型对象属性的值改变，那么通过原型继承而来的对象的这个属性的值也会改变，因为两个属性是一致的，是同一个东西。
```javaScript
var obj= {};
var obj5 = Object.create(obj);

console.log(obj5['a'])  // undefined
obj.a = 'bb'
console.log(obj) //{a:'bb'}
console.log(obj5)  // {} //这个输出结果证明，原型继承时，只有对属性值进行检索时才会体现出来，否则输出这个对象时，并没有起原型的属性
console.log(obj5['a']) // bb
```
8. 关于this
```javascript

var tt = {
    a: 'occ',
    b: function(){
       console.log(this) // tt
    },
    c:()=>console.log(this), // window
    d:function(){
        setTimeout(()=>console.log(this),100)  // tt
    },
    e:function(){
        setTimeout(function(){console.log(this)},100) // window
    },
    f:function(){
        var a = ()=>{
            console.log(this) // window
        };
        a();
    }
}
tt.b();
tt.c();
tt.d();
tt.e();
tt.f();
/**
 1.匿名函数的this总是指向window
 2.当对象里的函数使用箭头函数作为实际参数时，可以将this绑定为当前对象
 3. 如果有对象嵌套的情况，则this绑定到最近的一层对象上
 4.非箭头函数作为实际参数时，指向函数的调用者
 ** /

```
  
9. instanceof 和typeof
我们可以使用typeof来获取一个变量是否存在，如if(typeof a!="undefined"){}，而不要去使用if(a)因为如果a不存在（未声明）则会出错.
正因为typeof遇到null,数组,对象时都会返回object类型，所以当我们要判断一个对象是否是数组时,或者判断某个变量是否是某个对象的实例则要选择使用另一个关键语法instanceof
instanceof用于判断一个变量是否某个对象的实例，如var a=new Array();alert(a instanceof Array);会返回true，
typeof 可以检查原型链上的属性
hasOwnProperity可以检测是否为自身的属性
```javascript

var obj = {
    '' : '234', // 空字符串可以作为属性名
    a : '1231',
    'a': '1231231', // 'a' 和 a 是同一个属性名。这里会覆盖上一个
    c:null
}
console.log( typeof obj.a === 'string') // true
console.log( typeof obj.d === 'undefined')//true
console.log( typeof obj.c)//object
```
10. forin
```javascript
// forin 用于遍历对象的属性
for(a in obj){
if(obj.hasOwnProperty(a))
    console.log(a+':'+obj[a])
}
```

11. delete

```javascipt
var obj = {
    '' : '234', // 空字符串可以作为属性名
    a : '1231',
    'a': '1231231', // 'a' 和 a 是同一个属性名。这里会覆盖上一个
    c:null
}

// forin 用于遍历对象的属性
for(a in obj){
if(obj.hasOwnProperty(a))
    console.log(a+':'+obj[a])
if(a===''){
    delete obj[a];
}
}
console.log(obj) // {a: "bb", c: null}
```