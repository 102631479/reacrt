# 阮一峰Ts学习笔记

## 原始数据类型

+ 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt

```js

let isDone: boolean = false;
// 编译通过
// 后面约定，未强调编译错误的代码片段，默认为编译通过


// 注意，使用构造函数 Boolean 创造的对象不是布尔值：
let createdByNewBoolean: boolean = new Boolean(1);
// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.



// 空值
// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
function alertName(): void {
    alert('My name is Tom');
}


// Null 和 Undefined§

// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
let u: undefined = undefined;
let n: null = null;


// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;

// 而 void 类型的变量不能赋值给 number 类型的变量：
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.


```

+ 任意值
  
```js

// 任意值

let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

```

+ 联合类型
  
```js
// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

+ 对象的类型——接口

```js

interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};



interface Person {
    name: string;
    age?: number;  // 不确定有没有这个值的时候
}

let tom: Person = {
    name: 'Tom'
};







// 任意属性
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;   //限制上面取值类型
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

```

+ 数组的类型

```js
// 数组泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
// 用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];





// 类数组
function sum() {
    let args: number[] = arguments;
}  

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.

function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
} 


// 例如
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

+ 函数的类型

```js
// ----------------------------------------- 函数没有 返回结果 要添加 ：void----------------------------

// 可选参数必须接在必需参数后面
function buildName(firstName?: string, lastName: string) {
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.




// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');




// 参数默认值
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
// 此时就不受「可选参数必须接在必需参数后面」的限制了：
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');




// 剩余参数  ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a: any[] = [];
push(a, 1, 2, 3);



// 事实上，items 是一个数组。所以我们可以用数组的类型来定义它：
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);


```

+ 重载

```js
// 我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'
// 利用联合类型，我们可以这么实现：
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

// 这时，我们可以使用重载定义多个 reverse 的函数类型：
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

```

+ 类型断言
类型断言：可以用来手动指定一个值得类型,即允许变量从一种类型更改为另一种类型。
类型断言（Type Assertion）可以用来手动指定一个值的类型。

```js
// https://blog.csdn.net/weixin_59306092/article/details/122683654?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-122683654-blog-123002733.pc_relevant_aa_2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-122683654-blog-123002733.pc_relevant_aa_2&utm_relevant_index=1
// http://ts.xcatliu.com/basics/type-assertion.html
// 语法§
//   值 as 类型    或者   <类型>值
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}

// 个人理解：使用两个类型的交集  但是有想使用交集中的某一个的时候 使用 as 进行泛指 指定出类型



// 个人理解

语法格式：

        (1) <类型>值

        (2)值 as 类型

// 我就在想，一种类型更改成另一种类型,就靠手写一个这就行了?后来我看到一篇文章，他是这么说的"类型断言更像是类型的选择,而不是类型的转换",这句话一下就解释通了,并且举了一个简单的例子:
function func(val: string | number) :number {
    if (val.length) {
        return val.length
    } else {
        return val.toString().length
    }
}

//  func 的参数是 string 或者是 number 
//  但是 string 是有 val.length  number 是没有这个属性的 
// 所以这个代码会报错  “number”上不存在属性“length”



// 上述的代码正确的写法应该是这样：


function name(val:string|number):number {
    if ((val as string).length) {
        return (val as string).length
    }else{
      return val.toString().length
    }
    
}


// 或者是这样：

function func(val: string | number) :number {
    if ((<string>val).length ) {
        return (<string>val).length
    } else {
        return val.toString().length
    }
}
// 但是更倾向于第一种写法，因为在jsx语法中，只支持 值 as 类型


```

+ 将一个父类断言为更加具体的子类  

```js
-------------instanceof-----------------------
// 当类之间有继承关系时，类型断言也是很常见的：

class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}


// 上面的例子中，我们声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了。

// 但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code。

// 大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof：


class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}

```
