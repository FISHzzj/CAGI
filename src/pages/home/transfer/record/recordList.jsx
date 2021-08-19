import React from "react";
import { PullToRefresh } from "antd-mobile";
import { withRouter } from "react-router";
import { MyImage } from "@component/MyImage/MyImage";
import "./record.less";

import { transferRecordList } from "@api/asset";

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    this.isIncome = props.type === "in";
    this.state = {
      refreshing: false,
      data: {}
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
    transferRecordList({ page, pagesize, type: this.isIncome ? 2 : 1 }).then(
      resp => {
        if (resp.length === 0) {
          this.noMore = true;
          this.setState({ refreshing: false });
          return false;
        }
        this.noMore = true;
        this.page++;

        this.setState({
          data: Object.assign(this.state.data, resp),
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
        {Object.keys(this.state.data).map(i => (
          <div key={i} className="item_wrap">
            <div className="item_wrap_title">
              {i}
            </div>
            {this.state.data[i].map(info => (
              <div
                key={info.create_time}
                className="item"
                onClick={() => {
                  this.props.history.push("/index/transfer/record-detail/1");
                }}
              >
                <MyImage className="item_avatar"></MyImage>
                <div className="item_info">
                  <div className="item_info_content">{this.isIncome ? info.member : info.target_member}</div>
                  <div className="item_info_time">{info.create_time}</div>
                </div>
                <div
                  className="item_amount"
                  style={{ color: this.isIncome ? "#36db97" : "#FD6F7D" }}
                >
                  {this.isIncome ? "+" : "-"}{this.isIncome ? info.reality_money : info.money} {info.currency_name}
                </div>
              </div>
            ))
            }
          </div>
        ))}
        {Object.keys(this.state.data).length === 0 && (
          <div className="no_data">暂无数据</div>
        )}
      </PullToRefresh>
    );
  }
}

const RecordListWrap = withRouter(RecordList);
export { RecordListWrap as RecordList };
