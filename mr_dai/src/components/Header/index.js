import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Tooltip, Dropdown, Menu, Icon, Avatar } from "antd";
import IconFont from "../IconFont";
import Events from "../Events";
import styles from "./index.module.css";
// import { Menu } from "antd";
// const { SubMenu } = Menu;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("ms_username") || "Admin",
      fullscreen: false,
      collapsed: false,
    };
  }
  render() {
    return (
      <div className={styles.header}>
        <div
          className={styles.collapseBtn}
          onClick={this.onCollapse.bind(this)}
        >
          {/* <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} /> */}
        </div>
        <Menu mode="horizontal">
          <Menu.Item key="mail">Navigation One</Menu.Item>
          <div className={styles.headerRight}>
            <div className={styles.headerUserCon}>
              <Tooltip
                title={this.state.fullscreen ? `取消全屏` : `全屏`}
                placement="bottom"
              >
                <div
                  className={styles.btnFullscreen}
                  onClick={this.setFullScreen.bind(this)}
                >
                  <IconFont type="anticon-lx-full" />
                </div>
              </Tooltip>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
  // 折叠展开侧边栏
  onCollapse() {
    Events.emit("collapse");
    const collapsed = this.state.collapsed;
    this.setState({
      collapsed: !collapsed,
    });
  }
  // 设置全屏
  setFullScreen() {
    const fullscreen = this.state.fullscreen;
    const element = document.documentElement;
    if (fullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
      }
    }
    this.setState({
      fullscreen: !fullscreen,
    });
  }
  // 用户名下拉菜单操作
  handleDropdown({ key }) {
    switch (key) {
      case "0":
        window.open("https://lin-xin.gitee.io/about/", "_blank");
        break;
      case "1":
        window.open("https://github.com/lin-xin/react-manage-system", "_blank");
        break;
      case "2":
        localStorage.removeItem("ms_username");
        this.props.history.push("/login");
        break;
      default:
        return;
    }
  }
}

export default withRouter(Header);
