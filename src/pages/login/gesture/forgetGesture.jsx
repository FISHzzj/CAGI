import React from "react";
import { Toast, Icon, Button } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
// import GesturePassword from "@alitajs/gesture-password-react";
import { withRouter } from "react-router";
import Css from "./gesture.module.scss";

class ForgetGesture extends React.Component {
  config = {
    width: 355,
    height: 355,
    background: "rgba(0,0,0,0)",
    lineColor: "#EBB808",
    lineBackground: "#fff",
    onChange: pwd => {
      this.time++;
      this.time = this.time % 2;
      if (this.time === 1) {
        this.firstInputPwd = pwd;
        this.setState({
          wizardTip: "确认手势密码",
          animateTip: true,
          showSubmit: false
        });
      } else {
        if (this.firstInputPwd.join() === pwd.join()) {
          localStorage.setItem("gp", pwd.join());
          localStorage.removeItem("gesture");
          this.setState({
            showSubmit: true,
            wizardTip: "手势密码设置成功",
            pwd: pwd
          });
        } else {
          this.setState({
            wizardTip: "设置手势密码",
            animateTip: true,
            errorTip: true
          });
          setTimeout(() => {
            this.setState({ animateTip: false, errorTip: false });
          }, 2000);
        }
      }
    }
  };

  state = {
    wizardTip: "忘记手势密码",
    animateTip: false,
    errorTip: false,
    showSubmit: false,
    pwd: ""
    // time: 0,
    // firstInputPwd: []
  };

  time = 0;
  firstInputPwd = [];

  render() {
    return (
      <div className={Css.wrap}>
        <Icon
          type="left"
          size="lg"
          className={Css.back_btn}
          onClick={this.props.hide}
        />
        <div className={`${Css.header}`}>{this.state.wizardTip}</div>
        <MyImage
          src={require("@static/icon/gesture.png")}
          className={Css.gesture_icon}
        ></MyImage>
        <span>绘制解锁图案</span>
        <GesturePassword {...this.config} />
        {this.state.errorTip && (
          <span
            className={`${Css.wrong_password} ${
              this.state.animateTip ? Css.confirm_pwd : ""
              }`}
          >
            手势密码错误，请重新输入
          </span>
        )}
        {this.state.showSubmit && (
          <Button
            onClick={() => this.props.submit(this.state.pwd)}
            className={`${Css.submit} ${Css.translate_submit}`}
          >
            重置
          </Button>
        )}
      </div>
    );
  }
}

const ForgetGestureWrap = withRouter(ForgetGesture);

export { ForgetGestureWrap as ForgetGesture };
