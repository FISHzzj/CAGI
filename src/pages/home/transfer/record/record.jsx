import React from "react";
import { NavBar, Icon, Tabs } from "antd-mobile";
import { RecordList } from "./recordList";

import "./record.less";

class TransferRecord extends React.Component {
  navTab = [
    { title: "转出记录", sub: "1" },
    { title: "转入记录", sub: "2" }
  ];

  render() {
    return (
      <div className="wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          转账记录
        </NavBar>

        <Tabs
          tabBarBackgroundColor="#000"
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
          <RecordList type="out"></RecordList>
          <RecordList type="in"></RecordList>
        </Tabs>
      </div>
    );
  }
}
export default TransferRecord ;
