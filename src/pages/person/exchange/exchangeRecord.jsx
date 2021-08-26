import React from "react";
import { NavBar, Icon, PullToRefresh } from "antd-mobile";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./exchange.less";

import { convertRecordList } from '@api/asset'

class ExchangeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.genData = this.genData.bind(this);

    this.state = {
      refreshing: false,
      data: []
    };
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
    convertRecordList({ page, pagesize }).then(resp => {
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
      <div className="list_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
           <FormattedMessage
            id="duihuanjilv"
            defaultMessage={defaultApp['duihuanjilv']}
          />
        </NavBar>

        <PullToRefresh
          className="pull_wrap"
          indicator={{ deactivate: "上拉可以刷新" }}
          direction="up"
          refreshing={this.state.refreshing}
          onRefresh={() => this.genData(this.page, this.pagesize)}
        >
          {this.state.data.map(i => (
            <div key={i.id} className="item">
              <div className="item_title">
                <span>
                  <FormattedMessage
                    id="zhuanhuanshuliang"
                    defaultMessage={defaultApp['zhuanhuanshuliang']}
                  />
                </span>
                <span>{i.money}</span>
              </div>
              <div className="item_line">
                <span>
                  <FormattedMessage
                    id="zhuanchuzhanghu"
                    defaultMessage={defaultApp['zhuanchuzhanghu']}
                  />
                </span>
                <span>{i.currency_name} <FormattedMessage
                    id="zhanghu"
                    defaultMessage={defaultApp['zhanghu']}
                  /></span>
              </div>
              <div className="item_line">
                <span>
                  <FormattedMessage
                    id="zhuanruzhanghu"
                    defaultMessage={defaultApp['zhuanruzhanghu']}
                  />
                </span>
                <span>{i.target_currency_name} <FormattedMessage
                    id="zhanghu"
                    defaultMessage={defaultApp['zhanghu']}
                  /></span>
              </div>
              <div className="item_line">
                <span>
                  <FormattedMessage
                    id="zhuanhuanbili"
                    defaultMessage={defaultApp['zhuanhuanbili']}
                  />
                </span>
                <span>1 ：{(1 / i.rate).toFixed(2)}</span>
              </div>
              <div className="item_line">
                <span>
                  <FormattedMessage
                    id="jiaoyiriqi"
                    defaultMessage={defaultApp['jiaoyiriqi']}
                  />
                </span>
                <span>{i.create_time}</span>
              </div>
            </div>
          ))}
        </PullToRefresh>
      </div>
    );
  }
}
export default  ExchangeRecord ;
