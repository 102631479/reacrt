# react 18  组件库

## 前言

+ hooks 是react16.8 新增的特性
  + 所有组件拥抱函数组件
  + 安装 npm install -g typescript
  + 测试安装 tsc -v
  + 在终端运行 ` tsc hello.ts `
  + 会生成一个hello.js 文件  就是 ts 转换 成 js 以后的文件

+ javascript 两大类型
  + 原始类型
  + 对象类型

+ 类型（ts）
  + undefined 是所有类型的额子类型，可以赋值给任何类型
  + 只读属性，在创建的时候可以赋值。
  
```js
interface Person{
  readonly id:number; // 只读属性，在创建的时候可以赋值
  name :string
  age?:number          // 可选参数
}

function name(x:number,y:number,z?:number):number {
  if (typeof ==='number'){
    return x+y+z
  }else{
        return x+y
  }
  return
}





```
