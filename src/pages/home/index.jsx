import React, { PureComponent } from 'react';
import { Tabs, Badge, Carousel, NoticeBar, TabBar} from 'antd-mobile';
import BScroll from 'better-scroll';
import Slide from './slide';
// import { connect } from 'react-redux';
// import {
//   AsyncIndexActivityModule,
//   AsyncTitleColor
// } from '../../redux-file/actions-creators';
// import Kingkong from './kingkongmodule';
import LazyLoad, { forceCheck } from 'react-lazyload';
// import './index.less';
import { FixedSizeList as List } from 'react-window';
import { MyImage } from '@component/MyImage/MyImage';
import { Content } from '@component/Content/Content'
import  "./index.less";


import { currencyList, notice, banner, ventureList } from "@api/home";




const tabs = [
  { title: <Badge text={'3'}>今日推荐</Badge> },
  { title: <Badge text={'今日(20)'}>今日热卖</Badge> },
  { title: <Badge z>折扣到底</Badge> }
];


class App extends React.Component {
  constructor() {
    super();
    this.wrap = React.createRef();
    currencyList().then(resp => {
      // console.log(resp)
      this.setState({
        currencyList: resp.res
      });
    });
    ventureList().then(resp => {
      this.setState({
        ventureList: resp.res
      });
    });
    notice().then(resp => {
      this.setState({
        noticeList: resp.res
      });
    });
  }
  state = {
    currencyList: [],
    noticeList: [],
    ventureList: [],
    bannerList: [
      {id: 1, image: 'http://cagi.315red.com.cn/imgs/base/15851851461125450.jpg'},
      {id: 2, image: 'http://cagi.315red.com.cn/imgs/base/15852054998320993.jpg'},
    ],
    showContent: false,
    info: {},
    userInfo: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34578/22/10349/98741/5cda304eE9744e4ab/0fe030d12e36e851.jpg!cr_1125x549_0_72!q70.jpg'
  };

  componentDidMount() {
    // this.props.IndexActivityModule();
    forceCheck();
    this.myScroll = new BScroll(this.wrap.current, {
      bounce: false,
      scrollbar: true,
      probeType: 3,
      click: true,
      pullUpLoad: {
        threshold: 50
      }
    });
  }
  refresh = () => {
    if (this.myScroll) {
      this.myScroll.refresh();
      requestAnimationFrame(this.refresh);
    }
  };
  componentDidUpdate() {
    requestAnimationFrame(this.refresh);
    // this.myScroll.on('scroll', e => {
    //   forceCheck();
    //   if (e.y < -130) {
    //     this.props.TitleColor('red');
    //   } else if (e.y > -130) {
    //     this.props.TitleColor('transparent');
    //   }
    // });
  }

  render() {
    const { data } = this.props;
    // if (this.myScroll) {
    //   this.myScroll.refresh();
    // }
    return (
      <div className="wrap" ref={this.wrap}>
        {/* banner栏位 */}
        <div className="banner">
          <Carousel
            infinite
          >
            {this.state.bannerList.map(i => (
              <MyImage
                key={i.id}
                src={i.image}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                }}
                className="banner_img"
              ></MyImage>
            ))}
          </Carousel>
        </div>
        <div className="part part_four">
          <div className="part_four_title">价格</div>
          {/* <div className={Css.part_four_item}>
            <MyImage
              src={require("@static/icon/home_usdt.png")}
              className={Css.part_four_item_img}
            ></MyImage>
            <span className={Css.part_four_item_name}>USDT</span>
            <span className={Css.part_four_item_price}>
              $ {(this.state.currencyList[0]?.rate / 100).toFixed(4)}
            </span>
          </div> */}
          <div className="part_four_item">
            <MyImage
              src={require("@static/icon/home_jyb.png")}
              className="part_four_item_img"
            ></MyImage>
            <span className="part_four_item_name">JYB</span>
            <span className="part_four_item_price">
              $ {(this.state.currencyList[1]?.rate / 100).toFixed(4)}
            </span>
          </div>
          <div className="part_four_item">
            <MyImage
              src={require("@static/icon/home_psbau.png")}
              className="part_four_item_img"
            ></MyImage>
            <span className="part_four_item_name">PSBAU</span>
            <span className="part_four_item_price">
              $ {(this.state.currencyList[3]?.rate / 100).toFixed(4)}
            </span>
          </div>
          <div className="part_four_item">
            <MyImage
              src={require("@static/icon/home_tbau.png")}
              className="part_four_item_img"
            ></MyImage>
            <span className="part_four_item_name">TBAU</span>
            <span className="part_four_item_price">
              $ {(this.state.currencyList[2]?.rate / 100).toFixed(4)}
            </span>
          </div>
        </div>

        {/* 轮播图 */}
        {this.state.ventureList.length > 0 && <Carousel
          className="news_wrap"
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
        >
          {this.state.ventureList.map(i => (
            <div key={i.id} className="news_content">
              {i.content}
            </div>))
          }
        </Carousel>
        }

        {/* 轮播下面的部分一 */}
        <div className="part part_one">
          <div
            className="part_one_item"
            onClick={() => {
              this.props.history.push("/jyb-invest");
            }}
          >
            <MyImage
              src={require("@static/icon/home_jyp_chuangtou.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title">JYB创投</span>
          </div>
          <div
            className="part_one_item"
            onClick={() => {
              this.props.history.push("/home/ustd-invest");
            }}
          >
            <MyImage
              src={require("@static/icon/home_usdt_chuangtou.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title">USDT创投</span>
          </div>
          <div
            className="part_one_item"
            onClick={() => {
              this.props.history.push("/home/profit");
            }}
          >
            <MyImage
              src={require("@static/icon/home_my_invest.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title">我的分红</span>
          </div>
          <div
            className="part_one_item"
            onClick={() => {
              this.props.history.push("/home/transfer");
            }}
          >
            <MyImage
              src={require("@static/icon/home_transfer.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title">转账</span>
          </div>
        </div>

        <div className="part part_two">
          <div
            className="part_two_item"
            onClick={() => this.props.history.push("/home/recharge")}
          >
            <MyImage
              src={require("@static/icon/home_recharge.png")}
              className="part_two_item_img"
            ></MyImage>
            <span>充币</span>
          </div>
          <div className="part_two_seperate"></div>
          <div
            className="part_two_item"
            onClick={() => this.props.history.push("/home/withdraw")}
          >
            <MyImage
              src={require("@static/icon/home_withdraw.png")}
              className="part_two_item_img"
            ></MyImage>
            <span>提币</span>
          </div>
        </div>
        
        {this.state.noticeList.length > 0 && <div className="part part_three">
          <MyImage
            src={require("@static/icon/bugle.png")}
            className="part_three_bugle"
          ></MyImage>
          <Carousel
            className="part_three_content_wrap"
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
          >
            {this.state.noticeList.map(i => (
              <div key={i.id} className="part_three_content_item" onClick={() => { this.setState({ info: i, showContent: true }) }}>
                {i.title}
              </div>
            ))}
          </Carousel>
        </div>
        }


      </div>
    );
  }
}

// export default connect(
//   state => ({
//     data: state.IndexActivityModule,
//     KingkongModule: state.KingKong
//   }),
//   dispatch => ({
//     IndexActivityModule() {
//       const action = AsyncIndexActivityModule();
//       dispatch(action);
//     },
//     TitleColor(data) {
//       const action = AsyncTitleColor(data);
//       dispatch(action);
//     }
//   })
// )(App);

export default App
