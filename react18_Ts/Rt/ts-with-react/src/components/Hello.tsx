import React from 'react';



// interface HelloProps {
//     message: string
// }
// const Hello = (props: HelloProps) => {
//     return <h2>{props.message}</h2>
// }





interface HelloProps {
    message?: string
}
const Hello:React.FunctionComponent<HelloProps> = (props) => {
    return <h2>{props.message}</h2>
}
Hello.defaultProps={
    message:'你好！我是默认值'
}
export default Hello
