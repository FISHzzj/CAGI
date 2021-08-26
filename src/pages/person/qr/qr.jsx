import React from "react";
import { NavBar, Icon, Button, Toast } from "antd-mobile";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./qr.less";

import { userInfo } from "@api/auth";

class Qr extends React.Component {
  constructor(props) {
    super(props);
    userInfo().then(resp => {
      this.setState({ uuid: resp.uuid });
    });
  }

  state = {
    uuid: "-"
  };

  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="qr_wrap">
        <NavBar
          className="nav_bar"
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
           <FormattedMessage
              id="wodeerweima"
              defaultMessage={defaultApp['wodeerweima']}
          />
        </NavBar>

        <QRCode className="qr" value={`http://${window.location.host}/#/register/?uuid=${this.state.uuid}`} />

        <div className="seperate"></div>

        <div className="address_wrap">
          <div><FormattedMessage
              id="yaoqingma"
              defaultMessage={defaultApp['yaoqingma']}
          /></div>
          <div className="address">{this.state.uuid}</div>
        </div>

        <CopyToClipboard
          text={this.state.uuid}
          onCopy={() => Toast.info("复制成功", 2, null, false)}
        >
          <Button className="upload_btn">
            <FormattedMessage
                id="fuzhi"
                defaultMessage={defaultApp['fuzhi']}
            />
          </Button>
        </CopyToClipboard>
      </div>
    );
  }
}
export  default Qr;
