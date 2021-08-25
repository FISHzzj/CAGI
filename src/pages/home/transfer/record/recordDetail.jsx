import React from "react";
import { NavBar, Icon, List } from "antd-mobile";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl} from 'react-intl';

import "./record.less";

class TransferRecordDetail extends React.Component {
  render() {
    const defaultApp = window.app['en-US'];

    return (
      <div className="detail_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          <FormattedMessage
              id="zhuanzhangxiangqin"
              defaultMessage={defaultApp['zhuanzhangxiangqin']}
            />
        </NavBar>

        <div className="detail_wrap_header">
          <div>+3000.00</div>
          <div><FormattedMessage
              id="jiayichenggong"
              defaultMessage={defaultApp['jiayichenggong']}
            /></div>
        </div>

        <List className="detail_wrap_content">
          <List.Item extra="131400"><FormattedMessage
              id="shurubianhao"
              defaultMessage={defaultApp['shurubianhao']}
            /></List.Item>
          <List.Item extra="USDT">
            <FormattedMessage
              id="zhuanrubizhong"
              defaultMessage={defaultApp['zhuanrubizhong']}
            />
          </List.Item>
          <List.Item extra="3000.00">
            <FormattedMessage
              id="zhuanzhangjine"
              defaultMessage={defaultApp['zhuanzhangjine']}
            />
          </List.Item>
          <List.Item extra="-200.00">
            <FormattedMessage
              id="shouxufei"
              defaultMessage={defaultApp['shouxufei']}
            />
          </List.Item>
          <List.Item extra="2800.00">
            <FormattedMessage
              id="shijijine"
              defaultMessage={defaultApp['shijijine']}
            />
          </List.Item>
          <List.Item extra="2017-08-30 15:50">
            <FormattedMessage
              id="chuanjianshijian"
              defaultMessage={defaultApp['chuanjianshijian']}
            />
          </List.Item>
        </List>
      </div>
    );
  }
}
export { TransferRecordDetail };
