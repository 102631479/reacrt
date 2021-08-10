# react 原理   
**解决以下问题**

1. 能够知道setState() 更新数据是异步
2. 能够知道JSX语法的转化过程
3. 能够说出 React 组件的更新机制
4. 能够对罪案进行性能优化
5. 能够说出虚拟Dom和Diff算法 


## setState()说明


 ### 更新数据
 + setState()是异步更新数据的
 + 注意：使用后面的 setState（），不要依赖于前面的setState（）

```js
this.state={count : 1}
this.setState({
    count : this.state.cont + 1
})
console.log(this.state.count) // 1 
```