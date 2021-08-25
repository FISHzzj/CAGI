import React from "react";
import { NavBar, Icon, Button, Toast } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl} from 'react-intl';

import "./recharge.less";

import { configRemittanceList } from "@api/asset";

class Recharge extends React.Component {
  constructor(props) {
    super(props);
    configRemittanceList().then(resp => {
      console.log(resp);
      this.setState({
        address: resp.address
      });
    });
  }

  state = {
    address: "-"
  };
  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="recharge_wrap">
        <NavBar
          className="nav_bar"
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <i
              key="1"
              className={`iconfont icon-history history`}
              onClick={() => {
                this.props.history.push("/rechargerecord");
              }}
            ></i>
          ]}
        >
          <FormattedMessage
              id="USDTchongbi"
              defaultMessage={defaultApp['USDTchongbi']}
            />
        </NavBar>

        <MyImage
          src={require("@static/img/home_recharge_logo.png")}
          className="logo"
        ></MyImage>

        <QRCode className="qr" value={this.state.address} />

        <div className="seperate"></div>

        <div className="address_wrap">
          <div>
            <FormattedMessage
              id="qianbaodizhi"
              defaultMessage={defaultApp['qianbaodizhi']}
            />
          </div>
          <div className="address">{this.state.address}</div>

          <CopyToClipboard
            text={this.state.address}
            onCopy={() => Toast.info("复制成功", 2, null, false)}
          >
            <div>
              <FormattedMessage
                id="fuzhi"
                defaultMessage={defaultApp['fuzhi']}
              />
            </div>
          </CopyToClipboard>
        </div>

        <Button
          onClick={() => {
            this.props.history.push("/uploadVoucher");
          }}
          className="upload_btn"
        >
            <FormattedMessage
              id="shangchuanpinzheng"
              defaultMessage={defaultApp['shangchuanpinzheng']}
            />
        </Button>
      </div>
    );
  }
}
export default  Recharge
