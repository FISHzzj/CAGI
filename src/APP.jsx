import React from 'react';
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';


// import Title from './components/title/index.jsx';
import  Home  from './pages/home/index.jsx';
import  Category  from './pages/category/index.jsx';
import  Buy  from './pages/buy/index.jsx';
import  Shopcart from './pages/shopcart/index.jsx';
import  Person  from './pages/person/index.jsx';
import  Finance  from './pages/person/finance/finance.jsx';
import  ExchangeWrapper  from './pages/person/exchange/exchange.jsx';
import  ExchangeRecord  from './pages/person/exchange/exchangeRecord.jsx';
import  Earning  from './pages/person/earning/earning.jsx';
import  Pwd  from './pages/person/pwd/pwd.jsx';
import  Message  from './pages/person/message/message.jsx';
import  MessageFormWrapper  from './pages/person/message/messageForm.jsx';

import  MyTeam  from './pages/person/team/team.jsx';
import  Qr  from './pages/person/qr/qr.jsx';
import  Intro  from './pages/person/intro/intro.jsx';
import  IntroFormWrapper  from './pages/person/intro/introForm.jsx';



import Search from './pages/search/index.jsx';
import Shop from './pages/shop/index.jsx';
import  Ecosystem  from './pages/ecosystem/index.jsx';
import  News  from './pages/news/index.jsx';
import  JybInvest  from './pages/home/jybInvest/jybInvest.jsx';
import  investRecord  from './pages/home/investRecord/investRecord.jsx';
import  usdtInvest  from './pages/home/usdtInvest/usdtInvest.jsx';
import  profit  from './pages/home/profit/profit.jsx';
import  transfer  from './pages/home/transfer/transfer.jsx';
import  transferrecord  from './pages/home/transfer/record/record.jsx';
import  recordDetail  from './pages/home/transfer/record/recordDetail.jsx';
import  recordList  from './pages/home/transfer/record/recordList.jsx';
import  recharge  from './pages/home/recharge/recharge.jsx';
import  rechargeRecord  from './pages/home/recharge/rechargeRecord.jsx';
import  uploadVoucher  from './pages/home/recharge/uploadVoucher.jsx';
import  WithdrawWrapper  from './pages/home/withdraw/withdraw.jsx';
import  withdrawRecord  from './pages/home/withdraw/record/record.jsx';

import  LoginWrapper  from './pages/login/index.jsx';
import  RegisterWrapper  from './pages/login/register.jsx';
import  ForgetWrapper  from './pages/login/forget.jsx';




import { TabBar } from "antd-mobile";
import { MyImage } from "@component/MyImage/MyImage";
// import { Index as IndexPage } from "./index/index";

import { hot } from 'react-hot-loader'


import { withRouter } from 'react-router-dom';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
const cache = {};
function importAll (r) {
  // console.log(r,'r')
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('./pages', true, /\.jsx$/));
console.log(cache,'cache')




//第二页，分类模块的文件使用react-loadable按需加载并且代码分割
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchArr: [
        '/home',
        '/category',
        '/buy',
        'shopcart',
        '/person',
        '/search',
        '/ecosystem',
        '/news',
        'jyb-invest',
        'invest-record',
        'ustd-invest',
        'profit',
        'transfer',
        'transferrecord',
        'recordDetail',
        'recordList',
        'recharge',
        'rechargeRecord',
        'uploadVoucher',
        'withdraw',
        'withdrawRecord',
        'finance',
        'exchange',
        'exchangeRecord',
        'earning',
        'pwd',
        'message',
        'messageForm',
        'myteam',
        'qr',
        'intro',
        'introEdit',
        'login',
        'register',
        'forget',
   


      ],
      selectedTab: this.props.match.params.selectedTab || "index",
      hidden: false,
      fullScreen: false,
      userInfo: {
        head_image: "http://cagi.315red.com.cn/h5/static/media/img_holder.76c53636.png",
        nick_name: "ben05",
        rank_name: "J0",
        member: "CAGI636729"

      },
      locale: 'en',
    };
  }
  // onChange = (value) => {
  //   this.setState({
  //     locale: value[0],
  //   });
  // }

  render() {
    // const locale = qs.parse(location.search && location.search.slice(1)).locale || 'en-US';
    // const localePrefix = locale.slice(0, locale.indexOf('-'));
    // this.setState({
      //     locale: value[0],
      //   });
    

  //   const { locale } = this.state;
  //   const languages = [
  //     {
  //       value: '中国',
  //       label: '中国',
  //       language: undefined,
  //     },
  //     {
  //       value: 'English',
  //       label: 'English',
  //       language: enUS,
  //     },
  //     {
  //       value: 'Русский',
  //       label: 'Русский',
  //       language: ruRU,
  //     },
  //   ];
  //   const currentLocale = languages.find(item => item.value === locale).language;


    let showFooter = true;
    const { pathname } = this.props.location;
    const { showSearchArr } = this.state;
    if (!showSearchArr.find((item) => item === pathname)) {
      showFooter = false;
    }
    const defaultApp = window.app['en-US'];

    return (
      // <LocaleProvider locale={currentLocale}>
        <div className="app_container">
          
          {/* 用户头像部分 */}
          {showFooter ? (
            <div
              className="account"
              
            >
              <MyImage src={this.state.userInfo.head_image} className="avatar"></MyImage>
              <div className="account_info" 
                onClick={() => {
                  this.props.history.push("/intro");
                }}
              >
                <div>
                  <span>{this.state.userInfo.nick_name}</span>
                  <span className="rank_span">{this.state.userInfo.rank_name}</span>
                </div>
                <div>{this.state.userInfo.member}</div>
              </div>
              <div className="account_arrow">
                {/* <p> */}
                  <a href="?locale=en-US" className="localeclass"><FormattedMessage
                    id="app.en"
                    defaultMessage={defaultApp['app.en']}
                  /></a>
                {/* </p> */}
                {/* <p> */}
                  <a href="?locale=zh-Hans-CN" className="localeclass"><FormattedMessage
                    id="app.zh"
                    defaultMessage={defaultApp['app.zh']}
                  /></a>
                {/* </p> */}
              </div>
            </div>
            ) : null}

            {/* <WingBlank>
              <Picker
                data={languages}
                onChange={this.onChange}
                cols={1}
                value={[locale]}
              >
                <List.Item arrow="horizontal">Choose language</List.Item>
              </Picker>
    
            </WingBlank> */}


            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/ecosystem" component={Ecosystem}></Route>
              <Route path="/news" component={News}></Route>
              <Route path="/shopcart" component={Shopcart}></Route>
              <Route path="/person" component={Person}></Route>
              <Route path="/search" component={Search}></Route>
              <Route path="/shop" component={Shop}></Route>
              <Route path="/jyb-invest" component={JybInvest}></Route>
              <Route path="/invest-record" component={investRecord}></Route>
              <Route path="/ustd-invest" component={usdtInvest}></Route>
              <Route path="/profit" component={profit}></Route>
              <Route path="/transfer" component={transfer}></Route>
              <Route path="/transferrecord" component={transferrecord}></Route>
              <Route path="/recordDetail" component={recordDetail}></Route>
              <Route path="/recordList" component={recordList}></Route>
              <Route path="/recharge" component={recharge}></Route>
              <Route path="/rechargeRecord" component={rechargeRecord}></Route>
              <Route path="/uploadVoucher" component={uploadVoucher}></Route>
              <Route path="/withdraw" component={WithdrawWrapper}></Route>
              <Route path="/withdrawRecord" component={withdrawRecord}></Route>
              <Route path="/finance" component={Finance}></Route>
              <Route path="/exchange" component={ExchangeWrapper}></Route>
              <Route path="/exchangeRecord" component={ExchangeRecord}></Route>
              <Route path="/earning" component={Earning}></Route>
              <Route path="/pwd" component={Pwd}></Route>
              <Route path="/message" component={Message}></Route>
              <Route path="/messageForm" component={MessageFormWrapper}></Route>
              <Route path="/myteam" component={MyTeam}></Route>
              <Route path="/qr" component={Qr}></Route>
              <Route path="/intro" component={Intro}></Route>
              <Route path="/introEdit" component={IntroFormWrapper}></Route>
              <Route path="/login" component={LoginWrapper}></Route>
              <Route path="/register" component={RegisterWrapper}></Route>
              <Route path="/forget" component={ForgetWrapper}></Route>

              
              <Redirect to="/home"></Redirect>
            </Switch>
        

          {showFooter ? (
            <footer className="footer">
              <NavLink to="/home" activeClassName="active" className="link">
                <i className="material-icons">favorite_border</i>
                <span>首页</span>
              </NavLink>
              <NavLink to="/ecosystem" activeClassName="active" className="link">
                <i className="material-icons">reorder</i>
                <span>商城</span>
              </NavLink>
              <NavLink to="/news" activeClassName="active" className="link">
                <i className="material-icons">card_giftcard</i>
              <span>新闻</span>
              </NavLink>
              {/* <NavLink to="/shopcart" activeClassName="active" className="link">
                <i className="material-icons">bookmark_border</i>
              <span>购物车</span>
              </NavLink> */}
              <NavLink to="/person" activeClassName="active" className="link">
                <i className="material-icons">account_box</i>
                <span>我的</span>
              </NavLink>
            </footer>
          ) : null}
            
        </div>
      // </LocaleProvider>
    );
  }
}

export default withRouter(App);
