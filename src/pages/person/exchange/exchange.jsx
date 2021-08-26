import React from "react";
import {
  NavBar,
  Icon,
  ActionSheet,
  List,
  InputItem,
  Button,
  Toast
} from "antd-mobile";
import { createForm } from "rc-form";
import { withRouter } from "react-router";
import { MyImage } from "@component/MyImage/MyImage";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./exchange.less";

import { configConvertList, convertCommit } from "@api/asset";

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    configConvertList().then(resp => {
      let tempButtons = resp.map(i => `${i.currency_name} -> ${i.target_currency_name}`)
      this.setState({
        actionButton: tempButtons,
        exchangeInfo: resp
      })
    });

  }

  state = {
    actionButton: [],
    exchangeInfo: [],
    selectedIndex: 0,
    inputMoney: 0,
    fromMoney: 0,
    toMoney: 0
  };

  showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: this.state.actionButton,
        maskClosable: true,
        "data-seed": "logId"
      },
      buttonIndex => {
        let tempMoney = this.state.inputMoney
        let selectedInfo = this.state.exchangeInfo[buttonIndex < 0 ? 0 : buttonIndex]

        this.setState({
          selectedIndex: buttonIndex < 0 ? 0 : buttonIndex,
          fromMoney: tempMoney * (100 - selectedInfo?.rate) / 100,
          toMoney: tempMoney * (100 - selectedInfo?.rate) / 100 * selectedInfo.currency_rate / selectedInfo.target_currency_rate,
        });

      }
    );
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      let info = this.state.exchangeInfo[this.state.selectedIndex];
      if (!value.money || value.money < info.min || value.money > info.max || value.money % info.cardinal_number !== 0) {
        Toast.info('请输入正确的兑换数量', 2, null, false)
        return false
      }

      if (!value.pay_password) {
        Toast.info('请输入支付密码', 2, null, false)
        return false
      }

      convertCommit({ ...value, convert_id: info.id }).then(resp => {
        Toast.success('兑换成功！', 2, () => {
          this.props.history.push('/personal/exchange/record')
        })
      })
    });
  }

  render() {
    const defaultApp = window.app['en-US'];
    const { getFieldProps } = this.props.form;
    let selectedInfo = this.state.exchangeInfo[this.state.selectedIndex]
    const _this = this;

    return (
      <div className="wrap_exchange">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <i
              onClick={() => {
                this.props.history.push("/exchangerecord");
              }}
              key="1"
              className={`iconfont icon-history`}
            ></i>
          ]}
        >
          <FormattedMessage
            id="duihuan"
            defaultMessage={defaultApp['duihuan']}
          />
        </NavBar>

        <div className={`part exchange_panel`}>
          <div className="exchange_panel_type">
            <div
              className="exchange_panel_type_block"
              onClick={() => {
                this.showActionSheet();
              }}
            >
              <span className="coin_name">{selectedInfo?.currency_name}</span>
              <span className="coin_num">{this.state.fromMoney} {selectedInfo?.currency_name}</span>
              <Icon className="coin_arrow" type="down" size="xxs" />
            </div>
            <MyImage
              className="exchange_panel_icon"
              src={require("@static/icon/exchange.png")}
            ></MyImage>
            <div
              className="exchange_panel_type_block"
            >
              <span className="coin_name">{selectedInfo?.target_currency_name}</span>
              <span className="coin_num">{this.state.toMoney} {selectedInfo?.target_currency_name}</span>
            </div>
          </div>
          <div className="exchange_rate">
            <span className="exchange_rate_span">
              <FormattedMessage
                id="huilv"
                defaultMessage={defaultApp['huilv']}
              />：
            </span>
            <span>1 {selectedInfo?.currency_name} = {selectedInfo ? selectedInfo.currency_rate / selectedInfo.target_currency_rate : '-'} {selectedInfo?.target_currency_name}</span>
          </div>
          <div className="exchange_rate">
            <span className="exchange_rate_span">
              <FormattedMessage
                id="zuixiaoshuliang"
                defaultMessage={defaultApp['zuixiaoshuliang']}
              />：  
            </span><span>{selectedInfo?.min}</span>
            <span className="exchange_rate_span">
              <FormattedMessage
                  id="zuidashuliang"
                  defaultMessage={defaultApp['zuidashuliang']}
                />：
            </span><span>{selectedInfo?.max}</span>
            <span className="exchange_rate_span">
              <FormattedMessage
                  id="jishu"
                  defaultMessage={defaultApp['jishu']}
                />：  
            </span><span>{selectedInfo?.cardinal_number}</span>
          </div>
        </div>

        <List className={`part exchange_form`}>
          <InputItem {...getFieldProps("money", {
            onChange(v) {
              let selectedInfo = _this.state.exchangeInfo[_this.state.selectedIndex]
              _this.setState({
                fromMoney: v * (100 - selectedInfo?.rate) / 100,
                toMoney: v * (100 - selectedInfo?.rate) / 100 * selectedInfo.currency_rate / selectedInfo.target_currency_rate,
                inputMoney: v
              })
            }

          })} type="money" placeholder="请输入兑换数量">
            <div className="exchange_form_label">
              <MyImage
                className="icon"
                src={require("@static/icon/num.png")}
              ></MyImage>
              <span>
                <FormattedMessage
                  id="duihuanshuliang"
                  defaultMessage={defaultApp['duihuanshuliang']}
                />：</span>
            </div>
          </InputItem>
          <List.Item extra={selectedInfo?.account || '-'}>
            <div className="exchange_form_label">
              <MyImage
                className="icon"
                src={require("@static/icon/num.png")}
              ></MyImage>
              <span>
                <FormattedMessage
                  id="zhanghuyue"
                  defaultMessage={defaultApp['zhanghuyue']}
                />：
              </span>
            </div>
          </List.Item>
          <List.Item extra={selectedInfo?.rate * this.state.inputMoney / 100 + ` (${selectedInfo?.rate}%)`}>
            <div className="exchange_form_label">
              <MyImage
                className="icon"
                src={require("@static/icon/fee.png")}
              ></MyImage>
              <span>
                <FormattedMessage
                  id="shouxufei"
                  defaultMessage={defaultApp['shouxufei']}
                />：
              </span>
            </div>
          </List.Item>
          <InputItem
            {...getFieldProps("pay_password")}
            placeholder="请输入交易密码"
            type="password"
            clear={true}
          >
            <div className="exchange_form_label">
              <MyImage
                className="icon"
                src={require("@static/icon/lock.png")}
              ></MyImage>
              <span>
                <FormattedMessage
                  id="erjimima"
                  defaultMessage={defaultApp['erjimima']}
                />：
              </span>
            </div>
          </InputItem>
        </List>
        <Button
          className="submit"
          activeStyle={{ backgroundColor: "#d6a706" }}
          onClick={this.submit}
        >
          <FormattedMessage
            id="tijiao"
            defaultMessage={defaultApp['tijiao']}
          />
        </Button>
      </div>
    );
  }
}

const ExchangeWrapper = createForm()(withRouter(Exchange));
export default ExchangeWrapper
