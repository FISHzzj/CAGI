import React from "react";
import { MyImage } from "@component/MyImage/MyImage";
import { NavBar, Icon, List, Button } from "antd-mobile";
import "./intro.less";

import { userInfo } from "@api/auth";

class Intro extends React.Component {
  constructor(props) {
    super(props);
    userInfo().then(resp => {
      this.setState({ userInfo: resp });
    });
  }

  state = {
    userInfo: {
      head_image: localStorage.getItem('avatar')
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.replace("/login");
  };
  render() {
    return (
      <div className="intro_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
          rightContent={[
            <i
              key="1"
              onClick={() => this.props.history.push('/introEdit')}
              className={`iconfont icon-editor`}
            ></i>
          ]}
        >
          个人资料
        </NavBar>

        <List className="list_wrap">
          <List.Item
            extra={<MyImage src={this.state.userInfo.head_image} className="logo"></MyImage>}
          >
            个人头像
          </List.Item>
          <List.Item extra={this.state.userInfo.phone || '-'}>注册手机号</List.Item>
          <List.Item extra={this.state.userInfo.member}>会员编号</List.Item>
          <List.Item extra={this.state.userInfo.nick_name}>会员昵称</List.Item>
        </List>

        <Button onClick={this.logout} className="logout">
          退出登录
        </Button>
      </div>
    );
  }
}
export default Intro;
