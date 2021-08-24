import React from "react";
import { List, InputItem, Button, Toast } from "antd-mobile";
import { withRouter } from 'react-router'
import { createForm } from "rc-form";
import  "./pwd.less";

import { editPayPassword } from '@api/auth'

class PayPwdForm extends React.Component {

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!value.old_pay_password) {
        Toast.info('请输入原密码', 2, null, false)
        return false
      }

      if (!value.pay_password) {
        Toast.info('请输入新密码', 2, null, false)
        return false
      }

      if (value.pay_password !== value.pay_password_re) {
        Toast.info('两次密码不一致', 2, null, false)
        return false
      }

      editPayPassword({ ...value }).then(resp => {
        Toast.success('修改成功！', 2, () => {
          this.props.history.go(-1)
        })
      })
    });
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="form_wrap">
        <List>
          <InputItem
            type="password"
            {...getFieldProps("old_pay_password")}
            placeholder="原支付密码"
            clear
          >
            旧密码
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("pay_password")}
            placeholder="新支付密码"
            clear
          >
            新密码
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps("pay_password_re")}
            placeholder="确认新密码"
            clear
          >
            确认密码
          </InputItem>
        </List>

        <Button onClick={this.submit} className="submit">提交</Button>
      </div >
    )
  }
}

const PayPwdFormWrapper = createForm()(withRouter(PayPwdForm));

export default  PayPwdFormWrapper;
