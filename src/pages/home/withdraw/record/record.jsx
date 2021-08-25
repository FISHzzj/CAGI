import React from "react";
import { NavBar, Icon, Tabs } from "antd-mobile";
import RecordList  from "./recordList";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl} from 'react-intl';

import "./record.less";
import { createForm } from "rc-form";

class WithdrawRecord extends React.Component {
  navTab = [
    { title: "已审核", sub: "1" },
    { title: "待审核", sub: "2" }
  ];

  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="wrap_record">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
           <FormattedMessage
              id="tibijilv"
              defaultMessage={defaultApp['tibijilv']}
            />
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
          <RecordList status={1}></RecordList>
          <RecordList status={0}></RecordList>
        </Tabs>
      </div>
    );
  }
}

const withdrawRecord = createForm()(WithdrawRecord);
export default withdrawRecord;
