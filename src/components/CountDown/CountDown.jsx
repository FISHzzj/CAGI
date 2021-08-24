import React from "react";
import { sendSms } from "@api/auth";
import { Toast, Button } from "antd-mobile";

import "./CountDown.less";

class CountDown extends React.Component {
  state = {
    btnDescription: "获取验证码",
    disabled: false
  };

  sendSms = phone => {
    if (!phone?.trim()) {
      Toast.info("请输入手机号码", 2, null, false);
      return false;
    }

    if (this.state.disabled) {
      return false;
    }

    let timeLimit = 60;

    const intervalId = setInterval(() => {
      if (timeLimit <= 0) {
        this.setState({
          btnDescription: "获取验证码",
          disabled: false
        });
        clearInterval(intervalId);
      } else {
        this.setState({
          btnDescription: `${timeLimit--} 秒后重试`,
          disabled: true
        });
      }
    }, 1000);

    sendSms(phone).then(resp => {
      let timeTip = new Date(new Date().valueOf() + resp.time * 1000).toLocaleTimeString()
      Toast.info(`验证码已发送`, 2, null, false);
      this.props.showPlaceholder && this.props.showPlaceholder(`${timeTip}前有效`)

    });
  };



  render() {
    return (
      <Button
        className={`countdown_btn ${
          this.state.disabled ? Css.countdown_disabled : ""
          }`}
        onClick={() => this.sendSms(this.props.phone)}
      >
        {this.state.btnDescription}
      </Button>
    );
  }
}

export { CountDown };
