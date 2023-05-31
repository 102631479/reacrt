//  高阶函数
let Hello = () => {
    console.log('你好');
}
let hoc = (fn) => {
    return () => {
        console.log(111);
        fn()
        console.log(222);
    }
}
let call = hoc(Hello)

call()