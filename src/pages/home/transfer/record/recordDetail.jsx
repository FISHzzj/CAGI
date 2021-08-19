import React from "react";
import { NavBar, Icon, List } from "antd-mobile";
import "./record.less";

class TransferRecordDetail extends React.Component {
  render() {
    return (
      <div className="detail_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          转账详情
        </NavBar>

        <div className="detail_wrap_header">
          <div>+3000.00</div>
          <div>交易成功</div>
        </div>

        <List className="detail_wrap_content">
          <List.Item extra="131400">转入编号</List.Item>
          <List.Item extra="USDT">转入币种</List.Item>
          <List.Item extra="3000.00">转账金额</List.Item>
          <List.Item extra="-200.00">手续费</List.Item>
          <List.Item extra="2800.00">实际金额</List.Item>
          <List.Item extra="2017-08-30 15:50">创建时间</List.Item>
        </List>
      </div>
    );
  }
}
export { TransferRecordDetail };
