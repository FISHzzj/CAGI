import React from "react";
import { MyImage } from "@component/MyImage/MyImage";
import { List, InputItem, Button } from "antd-mobile";
import { createForm } from "rc-form";
import "./index.less";

import { login } from "../../api/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("token")) {
      this.props.history.replace("/");
    }
  }

  login = () => {
    this.props.form.validateFields((error, loginForm) => {
      if (!loginForm.member || !loginForm.password) {
        return false
      }
      login({ ...loginForm }).then(resp => {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("member", resp.member);
        localStorage.setItem("gp", resp.gesture_password);
        localStorage.setItem("avatar", resp.head_image);
        this.props.history.replace("/");
      });
    });
  };

  componentDidMount() {
    this.props.form.setFieldsValue({
      member: localStorage.getItem("member")
    });
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div className="login_wrap">
        {/* <MyImage
          src={require("@static/icon/logo.png")}
          className="logo"
        ></MyImage> */}
        <div className="logo_img_height"></div>
        <List className="form_wrap">
          <InputItem
            {...getFieldProps("member")}
            placeholder="请输入手机号/会员编号"
            clear
          >
            <MyImage
              src={require("@static/icon/login_account.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("password")}
            placeholder="请输入密码"
            clear
          >
            <MyImage
              src={require("@static/icon/login_password.png")}
              className="icon"
            ></MyImage>
          </InputItem>
        </List>

        <Button onClick={this.login} className="submit">
          登录
        </Button>

        <div className="control">
          <span
            onClick={() => {
              this.props.history.push("/register");
            }}
          >
            立即注册
          </span>
          <span onClick={() => {
            this.props.history.push("/forget");
          }}>忘记密码？</span>
        </div>
      </div>
    );
  }
}
const LoginWrapper = createForm()(Login);
export default  LoginWrapper;
