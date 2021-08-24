import React from "react";
import { List, InputItem, Button, Toast, NavBar, Icon } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
import { CountDown } from "@component/CountDown/CountDown";
// import { SetGesture } from "./gesture/setGesture";
import { createForm } from "rc-form";
import "./register.less";

import { register, member } from "@src/api/auth";

class Register extends React.Component {
  constructor(props) {
    super(props);
    member().then(resp => {
      this.setState({
        member: resp.member
      });
    });

    const qs = this.props.location.search;
    if (qs.length > 1) {
      const searchParams = new URLSearchParams(this.props.location.search.substr(1))
      this.state.uuid = searchParams.get('uuid')
      if (searchParams.has('uuid')) {
        this.showNav = false;
        this.uuid = searchParams.get('uuid')
      }
    }
  }

  showNav = true

  // CAGI319290
  state = {
    member: "",
    showGestureSet: false,
    timeLimit: '请输入验证码'
  };

  componentDidMount() {
    if (this.uuid) {
      this.props.form.setFieldsValue({ uuid: this.uuid })
    }
  }

  next = () => {
    const { getFieldValue } = this.props.form;

    // const uuid = getFieldValue("uuid")?.trim();
    // if (!uuid) {
    //   Toast.info("请输入邀请码", 2, null, false);
    //   return false;
    // }

    const nick_name = getFieldValue("nick_name");
    if (!nick_name) {
      Toast.info("请输入昵称", 2, null, false);
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

    this.setState({ showGestureSet: true });
  };

  submit = gesturePassword => {
    this.props.form.validateFields((error, registerForm) => {
      register({
        ...registerForm,
        member: this.state.member,
        gesture_password: gesturePassword.join("")
      }).then(resp => {
        localStorage.setItem("member", this.state.member);
        Toast.success("注册成功", 2, () => {
          this.props.history.go(-1);
        });
      });
    });
  };

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;



    return (
      <div className="register_wrap">
        {this.showNav && <NavBar
          className="nav_bar"
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          注 册
        </NavBar>
        }

        <List className="form_wrap">
          <InputItem
            {...getFieldProps("uuid")}
            placeholder="请输入邀请码"
            disabled={!!this.uuid}
            clear
          >
            <MyImage
              src={require("@static/icon/register_invite.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem value={this.state.member} editable={false} clear>
            <MyImage
              src={require("@static/icon/login_account.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            {...getFieldProps("nick_name")}
            placeholder="请输入昵称"
            clear
          >
            <MyImage
              src={require("@static/icon/register_nickname.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            {...getFieldProps("phone")}
            placeholder="请输入国家区号+手机号码"
            clear
          >
            <MyImage
              src={require("@static/icon/register_nickname.png")}
              className="icon"
            ></MyImage>
          </InputItem>
          <InputItem
            {...getFieldProps("code")}
            placeholder={this.state.timeLimit}
            extra={<CountDown phone={getFieldValue("phone")} showPlaceholder={(time) => { this.setState({ timeLimit: time }) }}></CountDown>}
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
          下一步
        </Button>
        <div className="download">已有账号，下载APP</div>

        {/* {this.state.showGestureSet && (
          <div className={`gesture_wrap`}>
            <SetGesture
              hide={() => this.setState({ showGestureSet: false })}
              submit={this.submit}
            ></SetGesture>
          </div>
        )} */}
      </div>
    );
  }
}
const RegisterWrapper = createForm()(Register);

export default  RegisterWrapper;
