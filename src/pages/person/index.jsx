import React from 'react'
import { withRouter } from "react-router";
import { Toast } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

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
          this.setState({ accountInfo: resp });
        });
    }

    state = {
        userInfo: {
          head_image: localStorage.getItem('avatar')
        },
        accountInfo: {}
      };
    render(){
      const defaultApp = window.app['en-US'];

        return (
            <div className="wrap">
              {/* 页面头部
              <div className="header">个人中心</div> */}
      
              <div className="content">
      
                <div className="part">
                  <div className="part_title">
                    <FormattedMessage
                      id="chuantou"
                      defaultMessage={defaultApp['chuantou']}
                    />
                  </div>
                  <div className="remain">
                    <div className="remain_item">
                      <div>{this.state.userInfo.investment_money}</div>
                      <div>
                        <FormattedMessage
                        id="chuantouzonge"
                        defaultMessage={defaultApp['chuantouzonge']}
                      />
                      </div>
                    </div>
                    <div className="remain_item">
                      <div>{parseFloat(this.state.userInfo.investment_money - this.state.accountInfo[5]).toFixed(4)}</div>
                      <div>
                        <FormattedMessage
                          id="yisifangshuliang"
                          defaultMessage={defaultApp['yisifangshuliang']}
                        />
                      </div>
                    </div>
                    <div className="remain_item">
                      <div>{this.state.accountInfo[5]}</div>
                      <div>
                        <FormattedMessage
                          id="shengyugangangyue"
                          defaultMessage={defaultApp['shengyugangangyue']}
                        />
                      </div>
                    </div>
                  </div>
                </div>
      
      
                {/* 账户余额部分 */}
                <div className="part">
                  <div className="part_title">
                    <FormattedMessage
                          id="yuezhanghu"
                          defaultMessage={defaultApp['yuezhanghu']}
                        />
                  </div>
                  <div className="balance">
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_tbau.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="TBAUzhanghu"
                            defaultMessage={defaultApp['TBAUzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[3]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_psbau.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="PSBAUzhanghu"
                            defaultMessage={defaultApp['PSBAUzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[4]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_usdt.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="USDTzhanghu"
                            defaultMessage={defaultApp['USDTzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[1]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_jyb.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="JYBzhanghu"
                            defaultMessage={defaultApp['JYBzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[2]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_cagi.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="CAGIzhanghu"
                            defaultMessage={defaultApp['CAGIzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[2]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_mkl.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="MKLzhanghu"
                            defaultMessage={defaultApp['JYBzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[2]}</div>
                      </div>
                    </div>
                    <div className="balance_item">
                      <MyImage src={require("@static/icon/home_tsm.png")} className="balance_item_logo"></MyImage>
                      <div className="balance_item_info">
                        <div>
                          <FormattedMessage
                            id="TSMzhanghu"
                            defaultMessage={defaultApp['TSMzhanghu']}
                          />
                        </div>
                        <div>{this.state.accountInfo[2]}</div>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="part">
                  <div className="part_title">
                    <FormattedMessage
                      id="gongneng"
                      defaultMessage={defaultApp['gongneng']}
                    />
                  </div>
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
                      <span className="control_item_des">
                        <FormattedMessage
                          id="zicangmingxi"
                          defaultMessage={defaultApp['zicangmingxi']}
                        />
                      </span>
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
                      <span className="control_item_des">
                        <FormattedMessage
                          id="tuanduishouji"
                          defaultMessage={defaultApp['tuanduishouji']}
                        />
                      </span>
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
                      <span className="control_item_des">
                        <FormattedMessage
                          id="zaixiantuihuan"
                          defaultMessage={defaultApp['zaixiantuihuan']}
                        />
                      </span>
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
                      <span className="control_item_des">
                        <FormattedMessage
                          id="zhuanzhang"
                          defaultMessage={defaultApp['zhuanzhang']}
                        />
                      </span>
                    </div>
      
                    <div className="control_item"
                      onClick={() => {
                        this.props.history.push("/pwd");
                      }}>
                      <MyImage
                        src={require("@static/icon/my/xiugaimima.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">
                        <FormattedMessage
                          id="xiugaimima"
                          defaultMessage={defaultApp['xiugaimima']}
                        />
                      </span>
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
                      <span className="control_item_des">
                        <FormattedMessage
                          id="zaixianliuyan"
                          defaultMessage={defaultApp['zaixianliuyan']}
                        />
                      </span>
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
                      <span className="control_item_des">
                        <FormattedMessage
                          id="mytuandui"
                          defaultMessage={defaultApp['mytuandui']}
                        />
                      </span>
                    </div>
                    <div
                      className="control_item"
                      onClick={() => { this.props.history.push("/qr"); }}
                    >
                      <MyImage
                        src={require("@static/icon/my/tuiguangerweima.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">
                        <FormattedMessage
                          id="tuiguangerweima"
                          defaultMessage={defaultApp['tuiguangerweima']}
                        />
                      </span>
                    </div>
                    {/* <div
                      className="control_item"
                      onClick={() => { 
                        // console.log(333333333)
                        window.location.href="http://shoptest.315red.com.cn/addons/ddwx_shop/m.php?s=/index/index/aid/1"; 
                       }}
                    >
                      <MyImage
                        src={require("@static/icon/my/tuiguangerweima.png")}
                        className="control_item_img"
                      ></MyImage>
                      <span className="control_item_des">
                        <FormattedMessage
                          id="shop"
                          defaultMessage={defaultApp['shop']}
                        />
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
    }
}

export default App
