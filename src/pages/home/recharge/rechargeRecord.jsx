import React from "react";
import { NavBar, Icon, PullToRefresh } from "antd-mobile";
import "./recharge.less";

import { remittanceRecordList } from "@api/asset";

class RechargeRecord extends React.Component {
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
    remittanceRecordList({ page, pagesize }).then(resp => {
      this.noMore = true;
      if (resp.length === 0) {
        this.noMore = true;
        this.setState({ refreshing: false });
        return false;
      }
      this.page++;
      this.setState({
        data: this.state.data.concat(resp),
        refreshing: false
      });
    });
  }

  render() {
    return (
      <div className="record_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          充币记录
        </NavBar>

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
                <div>{i.address || "-"}</div>
                <div>{i.create_time}</div>
              </div>
              <div className="item_right">+{i.reality_money}</div>
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
export default  RechargeRecord 
