import React from "react";
import { NavBar, Icon, PullToRefresh } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import "./profit.less";

import { awardRecordList } from '@api/home'

class Profit extends React.Component {
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

  genData(page, pagesize) {
    if (this.noMore) {
      return false;
    }
    this.setState({ refreshing: true });
    awardRecordList({ page, pagesize, award_id: 1 }).then(
      resp => {
        if (resp.res.data.length === 0) {
          this.noMore = true;
          this.setState({ refreshing: false });
          return false;
        }
        this.page++;
        this.setState({
          data: this.state.data.concat(resp.res.data),
          refreshing: false
        });
      }
    );
  }

  render() {
    const defaultApp = window.app['en-US'];
    return (
      <div className="wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          <FormattedMessage
            id="fenhong"
            defaultMessage={defaultApp['fenhong']}
          />
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
                <MyImage
                  src={require("@static/icon/redpack.png")}
                  className="item_left_redpack"
                ></MyImage>
                <div className="item_left_info">
                  <div>{i.remark}</div>
                  <div>{i.create_time}</div>
                </div>
              </div>
              <div className="item_right"> {i.money} {i.currency_name}</div>
            </div>
          ))}
          {this.state.data.length === 0 && (
            <div className="no_data">
               <FormattedMessage
                id="nodata"
                defaultMessage={defaultApp['nodata']}
              />
            </div>
          )}
        </PullToRefresh>
      </div>
    );
  }
}
export default Profit ;
