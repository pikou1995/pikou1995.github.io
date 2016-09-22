> JS惯例

* 构造函数均以大写字母开始

> 需要特别注意的

* "=="运算符从不试图将其操作数转换为布尔值
* 任何对象转到布尔值都是true,包括new Boolean(false)的布尔值是true
* toString()和valueOf()的区别
* 对象直接转换成字符串先toString(),否则valueOf();对象直接转换成数字先valueOf(),否则toString()(*判断条件是是否返回直接量)