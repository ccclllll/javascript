var obj = {
    '' : '234', // 空字符串可以作为属性名
    a : '1231',
    'a': '1231231' // 'a' 和 a 是同一个属性名。这里会覆盖上一个
}
console.log(obj.a)
console.log(obj[''])
console.log(obj['a']) ; // 1231231 以obj[string]检查属性，如果obj有这个名字的属性，则返回属性的值，否则返回undefined。
console.log(obj['b']) ; // undefined

var b = obj['b'] || obj['c'] || '223' ||  'name' ; // 取到第一个不为undefined或者null的值 
console.log(b) // 223

obj['a'] = 'new value'; // 通过赋值语句修改属性的值。
console.log(obj['a']) ; // new value

for(var key in obj){ // 字典的用法
    console.log(obj[key])
}


// 思考，如何用一个方法改变一个引用的指向？

var obj1 = {
    name:'zs',
    sex: '男'
}
var obj2 = obj1;

var obj3 = {
    name:'ls',
    sex: '女'
}

// 如何用一个方法obj2引用指向obj3引用所指向的对象？
function changeReference(a,b){ 
    a = b;
}

changeReference(obj1,obj3);
console.log(obj2) // {name: "zs", sex: "男"}  why? 因为将实参传给形参时，其实是将实参的值赋值给形参，方法只是将局部变量a的值改变了，并没有改变obj2的值

//可以将obj2作为一个对象的属性
var obj4 = {
    obj2:obj1
}

function changeReference1(a,b){ 
    a['obj2'] = b;
}
changeReference1(obj4,obj3)
console.log(obj4['obj2']) //{name: "ls", sex: "女"}

var obj5 = Object.create(obj);

console.log(obj5['a'])
obj.a = 'bb'
console.log(obj)

console.log(obj5['a'])

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
// 1 匿名函数的this总是指向window
// 2 当对象里的函数使用箭头函数作为实际参数时，可以将this绑定为当前对象
// 3 如果有对象嵌套的情况，则this绑定到最近的一层对象上
// 4 非箭头函数作为实际参数时，指向函数的调用者
