import React from 'react'
import { withRouter } from "react-router";
import { Toast } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
import "./index.less";

import { userInfo } from "@api/auth";
import { userAccount } from "@api/asset";

class App extends React.Component{
    constructor(props) {
        super(props);
        userInfo().then(resp => {
          this.setState({ userInfo: resp });
        });
        userAccount().then(resp => {
          this.setState({ accountInfo: resp.res });
        });
    }

    state = {
        userInfo: {
          head_image: localStorage.getItem('avatar')
        },
        accountInfo: {}
      };
    render(){
        return (
            <div className="wrap">
              {/* 页面头部
              <div className="header">个人中心</div> */}
      
              <div className="content">
      
                <div className="part">
                  <div className="part_title">创投</div>
                  <div className="remain">
                    <div className="remain_item">
                      <div>{this.state.userInfo.investment_money}</div>
                      <div>创投杠杆账户总额</div>
                    </div>
                    <div className="remain_item">
                      <div>{parseFloat(this.state.userInfo.investment_money - this.state.accountInfo[5]).toFixed(4)}</div>
                      <div>已释放数量</div>
                    </div>
                    <div className="remain_item">
                      <div>{this.state.accountInfo[5]}</div>
                      <div>剩余杠杆余额</div>
                    </div>
                  </div>
                </div>
      
      
                {/* 账户余额部分 */}
                <div className="part">
                  <div className="part_title">账户余额</div>
                  <div className="balance">
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_tbau.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>TBAU账户</div>
                        <div>{this.state.accountInfo[3]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_psbau.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>PSBAU账户</div>
                        <div>{this.state.accountInfo[4]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_usdt.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>USDT账户</div>
                        <div>{this.state.accountInfo[1]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_jyb.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>JYB账户</div>
                        <div>{this.state.accountInfo[2]}</div>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="part">
                  <div className="part_title">功能</div>
                  <div className="control">
                    <div
                      className="control_item"
                      onClick={() => {
                        this.props.history.push("/finance");
                      }}
                    >
                      <MyImage
                        src={require("@static/icon/my/zichanmingxi.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">资产明细</span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => {
                        this.props.history.push("/earning");
                      }}
                    >
                      <MyImage
                        src={require("@static/icon/my/tuanduishouyi.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">团队收益</span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => {
                        this.props.history.push("/exchange");
                      }}
                    >
                      <MyImage
                        src={require("@static/icon/my/zaixianduihuan.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">在线兑换</span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => {
                        this.props.history.push("/transfer");
                      }}
                    >
                      {/* <MyImage
                      src={require("@static/icon/my/zaixianduihuan.png")}
                      className="control_item_img"
                    ></MyImage> */}
                      <i
                        className={`iconfont icon-weibiaoti5  control_item_img`}
                      ></i>
                      <span className="control_item_des">转账</span>
                    </div>
      
                    <div className="control_item"
                      onClick={() => {
                        this.props.history.push("/pwd");
                      }}>
                      <MyImage
                        src={require("@static/icon/my/xiugaimima.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">修改密码</span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => {
                        this.props.history.push("/message");
                      }}
                    >
                      <MyImage
                        src={require("@static/icon/my/zaixianliuyan.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">在线留言</span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => {
                        this.props.history.push({ pathname: "/myteam", search: `info=${this.state.userInfo.group_person_count},${this.state.userInfo.achievement_money},${this.state.userInfo.group_achievement_money}` });
                      }}
                    >
                      <MyImage
                        src={require("@static/icon/my/wodetuandui.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">我的团队</span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => { this.props.history.push("/qr"); }}
                    >
                      <MyImage
                        src={require("@static/icon/my/tuiguangerweima.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">推广二维码</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}

export default App
