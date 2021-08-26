import React from "react";
import { NavBar, Icon, Tabs } from "antd-mobile";
import  EarningList  from "./earningList";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./earning.less";

class Earning extends React.Component {
  navTab = [
    { title: "全部", sub: 0 },
    { title: "销售奖", sub: 2 },
    { title: "团队奖", sub: 3 },
    { title: "管理奖", sub: 4 },
    { title: "辅导奖", sub: 5 }
  ];

  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="wrap_earning">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          <FormattedMessage
            id="tuanduishouyi"
            defaultMessage={defaultApp['tuanduishouyi']}
          />
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
          <EarningList type={0}></EarningList>
          <EarningList type={2}></EarningList>
          <EarningList type={3}></EarningList>
          <EarningList type={4}></EarningList>
          <EarningList type={5}></EarningList>
        </Tabs>
      </div>
    );
  }
}
export default Earning;
