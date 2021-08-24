import React from "react";
import { NavBar, Icon, Tabs } from "antd-mobile";
import  PwdForm  from "./pwdForm";
import  PayPwdForm  from "./payPwdForm";
import "./pwd.less";

class Pwd extends React.Component {
  navTab = [
    { title: "登录密码", sub: "1" },
    { title: "二级密码", sub: "2" }
  ];

  render() {
    return (
      <div className="wrap_pwd">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          修改密码
        </NavBar>

        {/* 内容部分 */}
        <Tabs
          tabBarBackgroundColor="#000"
          tabBarActiveTextColor="#EBB807"
          tabBarTextStyle={{ fontSize: "14px" }}
          tabBarUnderlineStyle={{ borderColor: "#EBB807" }}
          tabs={this.navTab}
          initialPage={0}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
        >
          <PwdForm></PwdForm>
          <PayPwdForm></PayPwdForm>
        </Tabs>
      </div>
    );
  }
}
export default Pwd;
