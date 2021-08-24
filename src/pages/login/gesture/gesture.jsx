import React from "react";
import { MyImage } from "@component/MyImage/MyImage";
// import GesturePassword from "@alitajs/gesture-password-react";
import Css from "./gesture.module.scss";
import { createHashHistory } from 'history';
import { Toast } from "antd-mobile";

import { gesturePassword } from '@api/auth'


class Gesture extends React.Component {
  config = {
    width: 355,
    height: 355,
    background: "rgba(0,0,0,0)",
    lineColor: "#EBB808",
    lineBackground: "#fff",
    onChange: pwd => {
      if (pwd.join("") !== localStorage.getItem("gp")) {
        if (localStorage.getItem('token')) {
          gesturePassword().then(resp => {
            localStorage.setItem('gp', resp.gesturePassword)
          })
        }

        this.setState({
          animateTip: true,
          errorTip: true
        });
        setTimeout(() => {
          this.setState({ animateTip: false, errorTip: false });
        }, 2000);
      } else {
        localStorage.setItem('gestureAuth', 'hide')
        if (this.props.hideGesture) {
          this.props.hideGesture()
        }
      }
    }
  };

  state = {
    animateTip: false,
    errorTip: false
  };

  time = 0;
  firstInputPwd = [];

  render() {
    return (
      <div className={Css.wrap}>
        <div className={`${Css.header}`}>手势密码</div>
        <MyImage
          src={require("@static/icon/gesture.png")}
          className={Css.gesture_icon}
        ></MyImage>
        {this.state.errorTip ? (
          <span
            className={`${Css.wrong_password} ${
              this.state.animateTip ? Css.confirm_pwd : ""
              }`}
          >
            手势密码错误，请重新输入
          </span>
        ) : (
            <span>绘制解锁图案</span>
          )}
        <GesturePassword {...this.config} />

        <div className={Css.forget_href} onClick={() => { createHashHistory().push('/forget-gesture') }}> 忘记手势密码?</div>
      </div>
    );
  }
}


export { Gesture };
