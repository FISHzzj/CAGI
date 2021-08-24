import React from "react";
import { List, InputItem, Button, Toast, NavBar, Icon } from "antd-mobile";
// import { ForgetGesture } from "./forgetGesture";
import { createForm } from "rc-form";
import "./forgetForm.less";

import { forgetGesturePassword } from "@src/api/auth";

class ForgetGestureForm extends React.Component {

  // CAGI319290
  state = {
    showGestureSet: false,
  };

  next = () => {
    this.props.form.validateFields((error, value) => {
      console.log(value)
      if (!value.member) {
        Toast.info('请输入个人编号', 2, null, false)
        return false
      }

      if (!value.password) {
        Toast.info('请输入一级密码', 2, null, false)
        return false
      }

      if (!value.pay_password) {
        Toast.info('请输入二级密码', 2, null, false)
        return false
      }

      this.setState({ showGestureSet: true });
    });

  };

  submit = gesturePassword => {
    this.props.form.validateFields((error, forgetForm) => {
      forgetGesturePassword({
        ...forgetForm,
        gesture_password: gesturePassword.join("")
      }).then(resp => {
        localStorage.setItem("gp", gesturePassword.join(""));
        Toast.success("手势密码修改成功", 2, () => {
          this.props.history.go(-1);
        });
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div className={Css.wrap}>
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          修改手势密码
        </NavBar>


        <List>
          <InputItem
            {...getFieldProps("member")}
            placeholder="请输入个人编号"
            clear
          >
            个人编号
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("password")}
            placeholder="请输入一级密码"
            clear
          >
            一级密码
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("pay_password")}
            placeholder="请输入二级密码"
            clear
          >
            二级密码
          </InputItem>
        </List>

        <Button onClick={this.next} className={Css.submit}>
          下一步
        </Button>

        {/* {this.state.showGestureSet && (
          <div className={`${Css.gesture_wrap}`}>
            <ForgetGesture
              hide={() => this.setState({ showGestureSet: false })}
              submit={this.submit}
            ></ForgetGesture>
          </div>
        )} */}
      </div>
    );
  }
}
const ForgetGestureFormWrapper = createForm()(ForgetGestureForm);

export { ForgetGestureFormWrapper as ForgetGestureForm };
