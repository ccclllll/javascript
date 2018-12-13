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
