import React from "react";
import { PullToRefresh } from "antd-mobile";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl} from 'react-intl';

import "./record.less";

import { drawRecordList } from "@api/asset";

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    this.genData = this.genData.bind(this);

    this.state = {
      refreshing: false,
      data: []
    };

    this.status = props.status || 0;
  }

  status = 0;
  page = 1;
  pagesize = 6;
  noMore = false;

  componentDidMount() {
    setTimeout(() => this.genData(this.page, this.pagesize), 0);
  }

  // 获取新闻列表
  genData(page, pagesize) {
    if (this.noMore) {
      return false;
    }
    this.setState({ refreshing: true });
    drawRecordList({ page, pagesize, status: this.status }).then(resp => {
      if (resp.length === 0) {
        this.noMore = true;
        this.setState({ refreshing: false });
        return false;
      }
      this.noMore = true;
      this.page++;
      this.setState({
        data: this.state.data.concat(resp),
        refreshing: false
      });
    });
  }

  render() {
    const defaultApp = window.app['en-US'];

    return (
      <PullToRefresh
        className="list_wrap"
        indicator={{ deactivate: "上拉可以刷新" }}
        direction="up"
        refreshing={this.state.refreshing}
        onRefresh={() => this.genData(this.page, this.pagesize)}
      >
        {this.state.data.map(i => (
          <div key={i} className="item">
            <div className="item_left">
              <div>{i.money} USDT</div>
              <div>{i.address}</div>
            </div>
            <div className="item_right">
              <div style={{ color: i.status == 1 ? '#36DB97' : '#FC7383' }}>{i.status == 1 ? '已审核' : '待审核'}</div>
              <div>{i.create_time.substr(0, 10)}</div>
              <div>{i.create_time.substr(11)}</div>
            </div>
          </div>
        ))}
        {this.state.data.length === 0 && (
          <div className="no_data">
            <FormattedMessage
              id="zanwushuju"
              defaultMessage={defaultApp['zanwushuju']}
            />
          </div>
        )}
      </PullToRefresh>
    );
  }
}
export default RecordList;
