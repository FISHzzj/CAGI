import React from "react";
import { NavBar, Icon, PullToRefresh } from "antd-mobile";
import "./investRecord.less";

import { investmentRecord } from "@api/home";

class InvestRecord extends React.Component {
  constructor(props) {
    super(props);
    this.genData = this.genData.bind(this);

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

  // 获取新闻列表
  genData(page, pagesize) {
    if (this.noMore) {
      return false;
    }
    this.setState({ refreshing: true });
    investmentRecord({ page, pagesize }).then(resp => {
      if (resp.res.length === 0) {
        this.noMore = true;
        this.setState({ refreshing: false });
        return false;
      }
      this.noMore = true;
      this.page++;
      this.setState({
        data: this.state.data.concat(resp.res),
        refreshing: false
      });
    });
  }

  render() {
    return (
      <div className="wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          创投记录
        </NavBar>

        <PullToRefresh
          className="list_wrap"
          indicator={{ deactivate: "上拉可以刷新" }}
          direction="up"
          refreshing={this.state.refreshing}
          onRefresh={this.genData}
        >
          {this.state.data.map(i => (
            <div key={i.create_time} className="item">
              <div className="item_left">
                <div>
                  {i.currency_id === 2 ? i.investment_base_money : i.investment_money} {i.currency_name}
                </div>
                <div>{i.create_time}</div>
              </div>
              <div className="item_right">创投成功</div>
            </div>
          ))}
          {this.state.data.length === 0 && (
            <div className="no_data">暂无数据</div>
          )}
        </PullToRefresh>
      </div>
    );
  }
}
export  default InvestRecord ;
