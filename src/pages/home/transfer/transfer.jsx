import React from "react";
import {
  NavBar,
  Icon,
  List,
  InputItem,
  ActionSheet,
  Button,
  Toast
} from "antd-mobile";
import { createForm } from "rc-form";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl} from 'react-intl';

import "./transfer.less";

import { configTransferList, userAccount, transferCommit } from "@api/asset";

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    const {
      intl, // 通过react-intl的高阶函数injectIntl包裹当前组件获取 - 字符串国际化
      intlId,// 国际化对应的id
    } = props;

    configTransferList().then(resp => {
      this.setState({
        currencyOptions: resp.map(i => i.name)
      });
      this.currencyList = resp;
    });
    userAccount().then(resp => {
      this.userAccount = resp.res;
    });
  }

  state = {
    currencyOptions: [],
    selectedCurrency: "请选择",
    selectedCurrencyId: "",
    accountRemain: "0.00",
    feeMoney: 0,
    realMoney: 0,
    moneyTip: "请输入转账金额",
    money: ""
  };

  showActionSheet = () => {
    const BUTTONS = this.state.currencyOptions;
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        maskClosable: true,
        message: "选择币种",
        "data-seed": "logId"
      },
      buttonIndex => {
        let currencyId = this.currencyList.find(
          i => i.name === BUTTONS[buttonIndex]
        )?.currency_id;

        this.setState({
          selectedCurrency: BUTTONS[buttonIndex] || '请选择',
          accountRemain: this.userAccount[currencyId] || '0.00',
          selectedCurrencyId: currencyId,
          feeMoney: this.currencyList.find(i => i.name === BUTTONS[buttonIndex])?.rate
        });
      }
    );
  };

  moneyChange = value => {
    if (this.state.selectedCurrencyId === "") {
      this.setState({ moneyTip: "请先选择转账币种" });
      return false;
    }

    this.setState({
      money: value,
      realMoney: this.computeRealMoney(value)
    });
  };

  computeRealMoney(value) {
    if (isNaN(value)) {
      return "-";
    }
    let realMoney = value - this.state.feeMoney;
    if (realMoney < 0) {
      return 0;
    }
    return realMoney;
  }

  submit = () => {
    const target_member = this.props.form.getFieldValue("target_member");
    if (!target_member?.trim()) {
      Toast.info("请输入会员编号", 2, null, false);
      return false;
    }

    if (
      isNaN(this.state.money) ||
      this.state.money === "" ||
      this.state.money <= this.state.feeMoney
    ) {
      Toast.info("请输入正确的转账金额", 2, null, false);
      return false;
    }

    const pay_password = this.props.form.getFieldValue("pay_password");
    if (!pay_password?.trim()) {
      Toast.info("请输入支付密码", 2, null, false);
      return false;
    }

    transferCommit({
      target_member,
      money: this.state.money,
      pay_password,
      transfer_id: this.state.selectedCurrencyId
    }).then(resp => {
      Toast.info("操作成功", 2, () => {
        this.props.history.push("/transferrecord");
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const defaultApp = window.app['en-US'];

    return (
      <div className="wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <i

              key="1"
              className="iconfont icon-history history"
              onClick={() => {
                this.props.history.push("/transferrecord");
              }}
            ></i>
          ]}
        >
          <FormattedMessage
            id="zhuanzhangguagnli"
            defaultMessage={defaultApp['zhuanzhangguagnli']}
          />
        </NavBar>

        <List className="form_wrap">
          <InputItem
            {...getFieldProps("target_member")}
            clear
            placeholder={intl.formatMessage({ id: intlId })}
          >
             <FormattedMessage
              id="huiyuan"
              defaultMessage={defaultApp['huiyuan']}
            />
          </InputItem>
          <List.Item
            extra={this.state.selectedCurrency}
            arrow="horizontal"
            onClick={this.showActionSheet}
          >
            <FormattedMessage
              id="huiyuan"
              defaultMessage={defaultApp['huiyuan']}
            />
          </List.Item>
          <List.Item extra={this.state.accountRemain}>
            <FormattedMessage
              id="zhanghuyue"
              defaultMessage={defaultApp['zhanghuyue']}
            />
          </List.Item>
          <InputItem
            value={this.state.money}
            clear
            placeholder={this.state.moneyTip}
            onChange={this.moneyChange}
            onBlur={() => this.setState({ moneyTip: "请输入转账金额" })}
            type="money"
          >
            <FormattedMessage
              id="zhuanzhanjine"
              defaultMessage={defaultApp['zhuanzhanjine']}
            />
          </InputItem>
          <List.Item extra={this.state.realMoney}>
            <FormattedMessage
              id="shijijine"
              defaultMessage={defaultApp['shijijine']}
            />
          </List.Item>
          <List.Item extra={this.state.feeMoney}>
            <FormattedMessage
              id="shouxufei"
              defaultMessage={defaultApp['shouxufei']}
            />
          </List.Item>
          <InputItem
            {...getFieldProps("pay_password")}
            placeholder="请输入二级密码"
            type="password"
            clear
          >
             <FormattedMessage
              id="shuruerjimima"
              defaultMessage={defaultApp['shuruerjimima']}
            />
          </InputItem>
        </List>

        <Button onClick={this.submit} className="submit">
          <FormattedMessage
              id="tijiao"
              defaultMessage={defaultApp['tijiao']}
            />
        </Button>
      </div>
    );
  }
}
const TransferWrapper = createForm()(Transfer);

export default injectIntl(TransferWrapper) ;
