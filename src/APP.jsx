import React from 'react';
import Title from './components/title/index.jsx';
import  Home  from './pages/home/index.jsx';
import  Category  from './pages/category/index.jsx';
import  Buy  from './pages/buy/index.jsx';
import Shopcart from './pages/shopcart/index.jsx';
import  Person  from './pages/person/index.jsx';
import Search from './pages/search/index.jsx';
import Shop from './pages/shop/index.jsx';
import  Ecosystem  from './pages/ecosystem/index.jsx';
import  News  from './pages/news/index.jsx';
import  JybInvest  from './pages/home/jybInvest/jybInvest.jsx';
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
        'jyb-invest'
      ],
      selectedTab: this.props.match.params.selectedTab || "index",
      hidden: false,
      fullScreen: false,
      userInfo: {
        head_image: "http://cagi.315red.com.cn/h5/static/media/img_holder.76c53636.png",
        nick_name: "ben05",
        rank_name: "J0",
        member: "CAGI636729"

      }
    };
  }

  render() {
    let showFooter = true;
    const { pathname } = this.props.location;
    const { showSearchArr } = this.state;
    if (!showSearchArr.find((item) => item === pathname)) {
      showFooter = false;
    }
    return (

      <div className="app_container">
         {/* 用户头像部分 */}
         {showFooter ? (
          <div
            className="account"
            onClick={() => {
              this.props.history.push("/personal/intro");
            }}
          >
            <MyImage src={this.state.userInfo.head_image} className="avatar"></MyImage>
            <div className="account_info">
              <div>
                <span>{this.state.userInfo.nick_name}</span>
                <span className="rank_span">{this.state.userInfo.rank_name}</span>
              </div>
              <div>{this.state.userInfo.member}</div>
            </div>
            {/* <div className={Css.account_arrow}>></div> */}
          </div>
          ) : null}
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/ecosystem" component={Ecosystem}></Route>
            <Route path="/news" component={News}></Route>
            <Route path="/shopcart" component={Shopcart}></Route>
            <Route path="/person" component={Person}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/shop" component={Shop}></Route>
            <Route path="/jyb-invest" component={JybInvest}></Route>
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
               <span>生态</span>
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

        {/* 选项卡页 */}
        {/* <TabBar
          barTintColor="#121010"
          unselectedTintColor="#6F7070"
          tintColor="#EBB807"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}

        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_index.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_index_o.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selected={this.state.selectedTab === "index"}
            onPress={() => {
              this.setState({
                selectedTab: "index"
              });
              this.props.history.replace("/index");
            }}
            data-seed="logId"
          >
            <Home></Home>
          </TabBar.Item>
          <TabBar.Item
            title="生态"
            key="Ecosystem"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_ecosystem.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_ecosystem_o.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selected={this.state.selectedTab === "ecosystem"}
            onPress={() => {
              this.setState({
                selectedTab: "ecosystem"
              });
              this.props.history.replace("/ecosystem");
            }}
            data-seed="logId"
          >
            <Ecosystem></Ecosystem>
          </TabBar.Item>
          <TabBar.Item
            title="新闻"
            key="Life"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_news.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_news_o.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selected={this.state.selectedTab === "news"}
            onPress={() => {
              this.setState({
                selectedTab: "news"
              });
              this.props.history.replace("/news");
            }}
            data-seed="logId"
          >
            <News></News>
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="Life"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_my.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${require("@static/icon/home_tab_my_o.png")}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selected={this.state.selectedTab === "personal"}
            onPress={() => {
              this.setState({
                selectedTab: "personal"
              });
              this.props.history.replace("/personal");
            }}
            data-seed="logId"
          >
            <Person></Person>
          </TabBar.Item>
        </TabBar>

        {this.state.selectedTab === "index" && <MyImage onClick={() => this.props.history.push('/index/box')} src={require('@static/icon/home_redpack.png')} className="redpack"></MyImage>} */}


      </div>

      // <div className="wrap">
      //   <header className="Title">
      //     <Title></Title>
      //   </header>
      //   <div className="content">
      //     <Switch>
      //       <Route path="/home" component={Home}></Route>
      //       <Route path="/ecosystem" component={Ecosystem}></Route>
      //       <Route path="/news" component={News}></Route>
      //       <Route path="/shopcart" component={Shopcart}></Route>
      //       <Route path="/person" component={Person}></Route>
      //       <Route path="/search" component={Search}></Route>
      //       <Route path="/shop" component={Shop}></Route>
      //       <Redirect to="/home"></Redirect>
      //     </Switch>
      //   </div>
      //   {showFooter ? (
      //     <footer className="footer">
      //       <NavLink to="/home" activeClassName="active" className="link">
      //         <i className="material-icons">favorite_border</i>
      //         <span>首页</span>
      //       </NavLink>
      //       <NavLink to="/ecosystem" activeClassName="active" className="link">
      //         <i className="material-icons">reorder</i>
      //         <span>生态</span>
      //       </NavLink>
      //       <NavLink to="/buy" activeClassName="active" className="link">
      //         <i className="material-icons">card_giftcard</i>
      //         <span>新闻</span>
      //       </NavLink>
      //       {/* <NavLink to="/shopcart" activeClassName="active" className="link">
      //         <i className="material-icons">bookmark_border</i>
      //         <span>购物车</span>
      //       </NavLink> */}
      //       <NavLink to="/person" activeClassName="active" className="link">
      //         <i className="material-icons">account_box</i>
      //         <span>我的</span>
      //       </NavLink>
      //     </footer>
      //   ) : null}
      // </div>
    );
  }
}

export default withRouter(App);
