import React from "react";
import { List, InputItem, Button, Toast, NavBar, Icon } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
import { CountDown } from "@component/CountDown/CountDown";
import { createForm } from "rc-form";
import "./forget.less";

import { forgetPassword } from "@src/api/auth";

class Forget extends React.Component {

  componentDidMount() {
    this.props.form.setFieldsValue({
      member: localStorage.getItem("member")
    });
  }

  next = () => {
    const { getFieldValue } = this.props.form;

    const nick_name = getFieldValue("member");
    if (!nick_name) {
      Toast.info("请输入个人编号", 2, null, false);
      return false;
    }

    const phone = getFieldValue("phone");
    if (!phone) {
      Toast.info("请输入手机号码", 2, null, false);
      return false;
    }

    const code = getFieldValue("code");
    if (!code) {
      Toast.info("请输入验证码", 2, null, false);
      return false;
    }

    const password = getFieldValue("password");
    const password_re = getFieldValue("password_re");
    if (!password) {
      Toast.info("请输入密码", 2, null, false);
      return false;
    }
    if (password !== password_re) {
      Toast.info("两次输入密码不一致", 2, null, false);
      return false;
    }

    const pay_password = getFieldValue("pay_password");
    const pay_password_re = getFieldValue("pay_password_re");
    if (!pay_password) {
      Toast.info("请输入二级密码", 2, null, false);
      return false;
    }
    if (pay_password !== pay_password_re) {
      Toast.info("两次输入的二级密码不一致", 2, null, false);
      return false;
    }

    this.submit()

  };

  submit = () => {
    this.props.form.validateFields((error, registerForm) => {
      forgetPassword({
        ...registerForm
      }).then(resp => {
        Toast.success("密码重置成功", 2, () => {
          this.props.history.go(-1);
        });
      });
    });
  };

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;

    return (
      <div className="forget_wrap">
        <NavBar
          className="nav_bar"
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          找回密码
        </NavBar>

        <List className="form_wrap">
          <InputItem
            {...getFieldProps("member")}
            placeholder="请输入个人编号"
            clear
          >
            <MyImage
              src={require("@static/icon/register_invite.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            {...getFieldProps("phone")}
            placeholder="请输入手机号码"
            clear
          >
            <MyImage
              src={require("@static/icon/register_nickname.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            {...getFieldProps("code")}
            placeholder="请输入验证码"
            extra={<CountDown phone={getFieldValue("phone")}></CountDown>}
            clear
          >
            <MyImage
              src={require("@static/icon/register_nickname.png")}
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
          <InputItem
            type="password"
            {...getFieldProps("password_re")}
            placeholder="请确认密码"
            clear
          >
            <MyImage
              src={require("@static/icon/register_password_again.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("pay_password")}
            placeholder="请输入二级密码"
            clear
          >
            <MyImage
              src={require("@static/icon/login_password.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("pay_password_re")}
            placeholder="请确认二级密码"
            clear
          >
            <MyImage
              src={require("@static/icon/register_password_again.png")}
              className="icon"
            ></MyImage>
          </InputItem>
        </List>

        <Button onClick={this.next} className="submit">
          提 交
        </Button>
      </div>
    );
  }
}
const ForgetWrapper = createForm()(Forget);

export default ForgetWrapper;
