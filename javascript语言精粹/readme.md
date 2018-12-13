## 学习javascpript语言精粹

1. this 关键字
指向调用者的一个引用

2. == 和 ===
前者存在隐式类型转换的问题，会将比较的两者转换为同种类型进行比较
``javascipt
console.log(undefined === null) //false
console.log(undefined == null) //true
console.log(1 === '1') //false
console.log(1 == '1') //true
```