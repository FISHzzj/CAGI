import React from "react";
import { MyImage } from "@component/MyImage/MyImage";
import { NavBar, Icon, List, Button } from "antd-mobile";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./intro.less";

import { userInfo } from "@api/auth";

class Intro extends React.Component {
  constructor(props) {
    super(props);
    userInfo().then(resp => {
      this.setState({ userInfo: resp });
    });
  }

  state = {
    userInfo: {
      head_image: localStorage.getItem('avatar')
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.replace("/login");
  };
  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="intro_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
          rightContent={[
            <i
              key="1"
              onClick={() => this.props.history.push('/introEdit')}
              className={`iconfont icon-editor`}
            ></i>
          ]}
        >
           <FormattedMessage
              id="gerenziliao"
              defaultMessage={defaultApp['gerenziliao']}
          />
        </NavBar>

        <List className="list_wrap">
          <List.Item
            extra={<MyImage src={this.state.userInfo.head_image} className="logo"></MyImage>}
          >
             <FormattedMessage
              id="gerentouxiang"
              defaultMessage={defaultApp['gerentouxiang']}
          />
          </List.Item>
          <List.Item extra={this.state.userInfo.phone || '-'}>
            <FormattedMessage
                id="zhuceshouji"
                defaultMessage={defaultApp['zhuceshouji']}
            />
          </List.Item>
          <List.Item extra={this.state.userInfo.member}>
            <FormattedMessage
                id="huiyuanbianhao"
                defaultMessage={defaultApp['huiyuanbianhao']}
            />
          </List.Item>
          <List.Item extra={this.state.userInfo.nick_name}>
            <FormattedMessage
                id="huiyuannicheng"
                defaultMessage={defaultApp['huiyuannicheng']}
            />
          </List.Item>
        </List>

        <Button onClick={this.logout} className="logout">
          <FormattedMessage
                id="tuichudenglv"
                defaultMessage={defaultApp['tuichudenglv']}
            />
        </Button>
      </div>
    );
  }
}
export default Intro;
