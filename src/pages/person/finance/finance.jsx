import React from "react";
import { NavBar, Icon, Tabs } from "antd-mobile";
import FinanceList from "./financeList";
import "./finance.less";

class Finance extends React.Component {
  navTab = [
    { title: "全部", sub: 0 },
    { title: "USDT", sub: 3 },
    { title: "JYB", sub: 1 },
    { title: "TBAU", sub: 4 },
    { title: "PSBAU", sub: 2 }
  ];

  render() {
    return (
      <div className="wrap_finance">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          资产明细
        </NavBar>

        {/* 内容部分 */}
        <Tabs
          tabBarBackgroundColor="#171414"
          tabBarActiveTextColor="#EBB807"
          tabBarTextStyle={{ fontSize: "14px" }}
          tabBarUnderlineStyle={{ borderColor: "#EBB807" }}
          tabs={this.navTab}
          initialPage={0}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
        >
          <FinanceList type={0}></FinanceList>
          <FinanceList type={1}></FinanceList>
          <FinanceList type={2}></FinanceList>
          <FinanceList type={3}></FinanceList>
          <FinanceList type={4}></FinanceList>
        </Tabs>
      </div>
    );
  }
}
export default  Finance ;
