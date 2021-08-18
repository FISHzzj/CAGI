import React from "react";
import { withRouter } from "react-router";
import { NavBar, Icon, Button, Toast, Modal } from "antd-mobile";
import "./jybInvest.less";

import { investmentList, investmentConfirm } from "@api/home";
import { userAccount } from "@api/asset";


class JybInvest extends React.Component {
  constructor(props) {
    super(props);
    investmentList().then(resp => {
      this.setState({
        investList: resp,
        selectedId: resp[0].id
      });
    });
    userAccount().then(resp => {
      this.setState({ accountInfo: resp });
    });
  }

  state = {
    investList: [],
    selectedId: 1,
    accountInfo: {}
  };

  submit = () => {
    Modal.alert("创投提示", "确定进行此操作？", [
      {
        text: "取消",
        style: "default"
      },
      {
        text: "确定",
        onPress: () =>
          investmentConfirm({
            type: 2,
            investment_id: this.state.selectedId
          }).then(resp => {
            Toast.success("已成功创投", 2, () => {
              this.props.history.push("/index/invest-record");
            });
          })
      }
    ]);
  };

  render() {
    return (
      <div className="wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <i
              key="1"
              className={`iconfont icon-history history`}
              onClick={() => {
                this.props.history.push("/index/invest-record");
              }}
            ></i>
          ]}
        >
          JYB创投
        </NavBar>

        <div className="remain_wrap">
          <div className="remain_bg_top"></div>
          <div className="remain">
            <span>JYB 账户余额</span>
            <span>{this.state.accountInfo[2] || '-'}</span>
          </div>
        </div>

        <div className="content">
          {this.state.investList.map(i => {
            return (
              <div key={i.id} className="item_wrap">
                <div
                  className="item"
                  style={{
                    border: `1px solid ${
                      this.state.selectedId === i.id ? "#EBB807" : "#666"
                      } `
                  }}
                  onClick={() => this.setState({ selectedId: i.id })}
                >
                  <span className="item_name">{i.name}</span>
                  <span>
                    <span className="item_color">{i.base_price}</span> JYB
                  </span>
                  <span>
                    ≈ <span className="item_color">{i.price}</span>
                    USDT
                  </span>
                  <span></span>
                </div>
              </div>
            );
          })}
        </div>

        <Button onClick={this.submit} className="submit">
          购买
        </Button>
      </div>
    );
  }
}

const JybInvestWrap = withRouter(JybInvest);

// export { JybInvestWrap as JybInvest };
export default JybInvestWrap