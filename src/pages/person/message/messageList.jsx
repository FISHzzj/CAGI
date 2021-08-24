import React from "react";
import { PullToRefresh } from "antd-mobile";
import "./messageList.less";

import { userSend, userReceive } from '@api/home'

class MessageList extends React.Component {
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

    const api = this.props.type === 1 ? userSend : userReceive

    api({ page, pagesize }).then(
      resp => {
        if (resp.length === 0) {
          this.noMore = true;
          this.setState({ refreshing: false });
          return false;
        }
        this.noMore = true
        this.page++;
        this.setState({
          data: this.state.data.concat(resp),
          refreshing: false
        });
      }
    );
  }

  render() {
    return (
      <PullToRefresh
        className="wrap_messageList"
        damping={60}
        indicator={{ deactivate: "上拉可以刷新" }}
        direction="up"
        refreshing={this.state.refreshing}
        onRefresh={() => this.genData(this.page, this.pagesize)}
      >
        {this.state.data.map((i, index) => (
          <div key={index} className="message_item" onClick={() => { this.props.showContent(i) }} >
            {/* {i.image && <MyImage src={i.image} className="message_item_avatar}></MyImage>} */}
            <div className="message_item_info">
              <div className="message_item_info_content">
                {i.title}
              </div>
              <div className="message_item_info_time">{i.create_time}</div>
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
export default MessageList ;
