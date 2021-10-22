import React, { Component } from 'react';
import styles from './index.module.css';

class first extends Component {
    render() {
        return (
            <div>
                <p>我是页面一</p>
                <div className={styles.box}>我是页面一的数据</div>
                <input className={styles.ipt} type="text" placeholder="我是输入框" />
            </div>
        )
    }
}
export default first;