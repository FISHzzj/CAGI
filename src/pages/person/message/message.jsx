import React from "react";
import { NavBar, Icon, Tabs } from "antd-mobile";
import {Content}   from '@component/Content/Content'
import  MessageList  from "./messageList.jsx";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./message.less";

class Message extends React.Component {
  navTab = [
    { title: "我的留言", sub: "1" },
    { title: "系统留言", sub: "2" }
  ];

  state = {
    showContent: false,
    info: {}
  }

  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="wrap_message">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <i
              key="1"
              onClick={() => this.props.history.push('/messageForm')}
              className={`iconfont icon-icon_add add_message`}
            ></i>
          ]}
        >
          <FormattedMessage
            id="wodeliuyan"
            defaultMessage={defaultApp['wodeliuyan']}
          />
        </NavBar>

        {/* 内容部分 */}
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
          <MessageList type={1} showContent={content => { this.setState({ info: content, showContent: true }) }}></MessageList>
          <MessageList type={2} showContent={content => { this.setState({ info: content, showContent: true }) }}></MessageList>
        </Tabs>

        {this.state.showContent && (
          <div className="content_wrap">
            <Content {...this.state.info} type={3} close={() => { this.setState({ showContent: false }) }}></Content>
          </div>
        )}
      </div>
    );
  }
}
export default  Message;
