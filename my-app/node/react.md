# react
+ react特点  
  1.是声明式  2.组件  
+ react 安装
  ```js
   // 安装命令  npm i react react-dom  
   // cnpm install -g create-react-app    安装react资源 
   // create-react-app my-app  创建react 项目
   // npm start  启动项目
   // reacrt-dom 负责渲染dom
  ```  


# jsx 的基本使用

1.React的属性名字是驼峰命名法
2.特殊属性名字：class：-> className   for->：htmlfor , tableindex ->tanlndex
3.没有子节点的React元素可以直接用</> 结束

4.推荐使用小括号包括jsx ，从而避免js的自动插入分号陷阱
```js
// 首先引入 
import React from 'react';
import ReactDOM from 'react-don';
const dv=(
    <div>Hello JSX</div>
)
// 可以避免插入分号 出现错误
```

# 在jsx中嵌入javaScript 表达式

+ 数据嵌入表达式子   单括号  
  
```js
  import React from 'react';
  import ReactDOM from 'react-don';

  const name = "dn"
  const dv=(
          <div>Hello{name}</div>
  )
```

# 条件渲染 React

```js
  
  import React from 'react';
  import ReactDOM from 'react-don';

  const isLoading= true
  const loadData= ()=>{
        if(isLoading){
        return  <div>loading</div>
        }else{
        return  <div>需要展示的渲染内容</div>
        }
    }
  const title =(
      <h1>条件渲染</h1>
      {loadData()}
  )
  // 三元表达式
  const loadData=()=>{
      return isLoading ? （<div>loading...</div>）:（<div>渲染加载后的额数据</div>）
  }
  ReactDOM.render(title,document.getElementID('root'))
  //   需要渲染的目标

```

# 列表渲染 React
+ 如果要渲染一组数据，应该使用数组的map()方法
+ 注意：渲染列表的时候应该添加key属性
+ 原则上 map()便利谁就给谁渲染一个key属性
+ 注意 尽量避免索引号使用key属性
```js
import React from 'react';
import ReactDOM from 'react-don';

  const list= {
       {id:1,text:"我是第1"},    
       {id:2,text:"我是第2"},
       {id:3,text:"我是第3"},
    }
  const title =(
      <h1>{list.map(item=>{<li key={item.id}>{item.name}</li>})}</h1>
  )

  ReactDOM.render(title,document.getElementID('root'))
  //   需要渲染的目标
```


# jsx的样式处理 
+ 行内样式 
```js
<div style={{color:'red',backgroundColor:'yellow'}}>css处理<div> 
```
+ 使用类名方式 --- className
```js
// 引入样式
import './css/style.css';
<div className="title">css处理<div> 
```
# JSX总结   特色：能用js的地方就添加解析语法
+ jsx是React的核心内容
+ jsx表示在js代码中书写html结构，是声明式的体现
+ 使用jsx配合嵌入式的js表达式，条件渲染，列表渲染，可以描述任意ui的结构
+ 使用className的方式给jsx的添加样式
+ React完全利用js语言的自身的能力来编写ui,而不是造轮子增强html的功能 
  
