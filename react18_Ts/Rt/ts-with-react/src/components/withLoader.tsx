import React from 'react';

interface IloaderState {
    data: any,
    isLoading: boolean
}
interface IloaderProps {
    data: any
}
/*
WrappedComponent 传入老的组件
*/
const withLoader = <P extends IloaderState>(WrappedComponent: React.ComponentType<P>, url: String) => {
    return class LoaderComponent extends React.Component<Partial<IloaderProps>, IloaderState>{
        constructor(props: any) {
            super(props)
            this.state = {
                data: null,
                isLoading: false
            }
        }
        componentDidMount(): void {
            // 异步请求数据使用的函数
        }
        render() {
            const { data, isLoading } = this.state
            return (
                <>
                    {
                        (isLoading || !data)?<p>data is loading</p  >: < div  {...this.props as P } />
                        // ?  <p>data is loading<p /> : <WrappedComponent {...this.props as P} data={data}></WrappedComponent>
                    }
                </>
            )
        }
    }
}
export default withLoader