import React from "react";
import { PullToRefresh } from "antd-mobile";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./finance.less";

import { billList } from '@api/asset'

class FinanceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: []
    };
  }

  page = 1;
  pagesize = 6;
  noMore = false;

  componentDidMount() {
    setTimeout(() => this.genData(this.page, this.pagesize), 0);
  }

  genData(page, pagesize) {
    if (this.noMore) {
      return false;
    }
    this.setState({ refreshing: true });
    billList({ page, pagesize, currency_id: this.props.type }).then(
      resp => {
        if (resp.data.length === 0) {
          this.noMore = true;
          this.setState({ refreshing: false });
          return false;
        }
        this.page++;
        this.setState({
          data: this.state.data.concat(resp.data),
          refreshing: false
        });
      }
    );
  }

  render() {
    const defaultApp = window.app['en-US'];

    return (
      <PullToRefresh
        className="list_wrap"
        damping={60}
        indicator={{ deactivate: "上拉可以刷新" }}
        direction="up"
        refreshing={this.state.refreshing}
        onRefresh={() => this.genData(this.page, this.pagesize)}
      >
        {this.state.data.map(i => (
          <div key={i.create_time} className="item">
            <div className="item_title">
              <span>{i.currency_name}</span>
              <span style={{ color: i.type === 1 ? '#36db97' : '#FC7383' }}>{i.type === 1 ? '+' : '-'}{i.account}</span>
            </div>
            <div className="item_line">
              <span>
                <FormattedMessage
                  id="zhanghuleixing"
                  defaultMessage={defaultApp['zhanghuleixing']}
                />
              </span>
              <span>{i.bill_type}</span>
            </div>
            <div className="item_line">
              <span>
                <FormattedMessage
                  id="zhanghuyue"
                  defaultMessage={defaultApp['zhanghuyue']}
                />
              </span>
              <span style={{ color: "#FFD200" }}>{i.after_account}</span>
            </div>
            <div className="item_line">
              <span>
                <FormattedMessage
                  id="beizhumiaoshu"
                  defaultMessage={defaultApp['beizhumiaoshu']}
                />
              </span>
              <span>{i.remark || '无'}</span>
            </div>
            <div className="item_line">
              <span>
                <FormattedMessage
                  id="jiaoyiri"
                  defaultMessage={defaultApp['jiaoyiri']}
                />
              </span>
              <span>{i.create_time}</span>
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
export default  FinanceList;
