import React, {
  Component
} from 'react';
// import AppRouter from './router'
import AppRouter from '../src/router/router'
import { connect } from 'react-redux'


class App extends Component {
  render() {
    return (
      <div>
        <AppRouter />
        <h1>代码练习</h1>
        <h1>{this.props.name}的年龄是{this.props.age}</h1>
        <button onClick={this.props.changeAge}>更改年龄</button>

      </div>
    );
  }
}
const mapStateToProps = (state) => (
  {
    name: state.name,
    age: state.age
  }
)
const mapDispatchToProps = (dispatch) => ({
  changeAge() {
    const action = {
      type: 'change',
      age: 100
    }
    dispatch(action)
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);