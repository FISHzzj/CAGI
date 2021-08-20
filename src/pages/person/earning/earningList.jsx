import React from "react";
import { PullToRefresh } from "antd-mobile";
import "./earning.less";

import { awardRecordList } from '@api/home'


class EarningList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: []
    };

    console.log(this.props.type)
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
    awardRecordList({ page, pagesize, award_id: this.props.type }).then(
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
              <span>{i.award_name}</span>
              <span>+{i.money}</span>
            </div>
            <div className="item_line">
              <span>收益类型</span>
              <span>{i.award_name}</span>
            </div>
            <div className="item_line">
              <span>实际金额</span>
              <span style={{ color: "#FFD200" }}>{i.money}</span>
            </div>
            <div className="item_line">
              <span>备注描述</span>
              <span>{i.remark}</span>
            </div>
            <div className="item_line">
              <span>交易日期</span>
              <span>{i.create_time}</span>
            </div>
          </div>
        ))}
        {this.state.data.length === 0 && (
          <div className="no_data">暂无数据</div>
        )}
      </PullToRefresh>
    );
  }
}
export default EarningList;
