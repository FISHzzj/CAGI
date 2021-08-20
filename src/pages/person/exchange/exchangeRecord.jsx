import React from "react";
import { NavBar, Icon, PullToRefresh } from "antd-mobile";
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
    return (
      <div className={Css.list_wrap}>
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          兑换记录
        </NavBar>

        <PullToRefresh
          className={Css.pull_wrap}
          indicator={{ deactivate: "上拉可以刷新" }}
          direction="up"
          refreshing={this.state.refreshing}
          onRefresh={() => this.genData(this.page, this.pagesize)}
        >
          {this.state.data.map(i => (
            <div key={i.id} className={Css.item}>
              <div className={Css.item_title}>
                <span>转换数量</span>
                <span>{i.money}</span>
              </div>
              <div className={Css.item_line}>
                <span>转出账户</span>
                <span>{i.currency_name} 账户</span>
              </div>
              <div className={Css.item_line}>
                <span>转入账户</span>
                <span>{i.target_currency_name} 账户</span>
              </div>
              <div className={Css.item_line}>
                <span>转换比例</span>
                <span>1 ：{(1 / i.rate).toFixed(2)}</span>
              </div>
              <div className={Css.item_line}>
                <span>交易日期</span>
                <span>{i.create_time}</span>
              </div>
            </div>
          ))}
        </PullToRefresh>
      </div>
    );
  }
}
export { ExchangeRecord };
