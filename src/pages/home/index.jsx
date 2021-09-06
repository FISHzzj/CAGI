import React, { PureComponent } from 'react';
import { Tabs, Badge, Carousel, NoticeBar, TabBar} from 'antd-mobile';
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

// import BScroll from 'better-scroll';
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
import  '../../localeprovider/home/index'
import  "./index.less";


import { currencyList, notice, banner, ventureList } from "@api/home";




// const tabs = [
//   { title: <Badge text={'3'}>今日推荐</Badge> },
//   { title: <Badge text={'今日(20)'}>今日热卖</Badge> },
//   { title: <Badge z>折扣到底</Badge> }
// ];


class App extends React.Component {
  constructor() {
    super();
    this.wrap = React.createRef();
    currencyList().then(resp => {
      // console.log(resp)
      this.setState({
        currencyList: resp
      });
    });
    ventureList().then(resp => {
      this.setState({
        ventureList: resp
      });
    });
    notice().then(resp => {
      this.setState({
        noticeList: resp
      });
    });
    banner(1).then(resp => {
      this.setState({
        bannerList: resp ?? []
      });
    });
  }
  state = {
    currencyList: [],
    noticeList: [],
    ventureList: [],
    bannerList: [],
    showContent: false,
    info: {},
    userInfo: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34578/22/10349/98741/5cda304eE9744e4ab/0fe030d12e36e851.jpg!cr_1125x549_0_72!q70.jpg'
  };

  componentDidMount() {
    // this.props.IndexActivityModule();
    // forceCheck();
    // this.myScroll = new BScroll(this.wrap.current, {
    //   bounce: false,
    //   scrollbar: true,
    //   probeType: 3,
    //   click: true,
    //   pullUpLoad: {
    //     threshold: 50
    //   }
    // });
  }
  // refresh = () => {
  //   if (this.myScroll) {
  //     this.myScroll.refresh();
  //     requestAnimationFrame(this.refresh);
  //   }
  // };
  componentDidUpdate() {
    // requestAnimationFrame(this.refresh);
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

    const defaultApp = window.app['en-US'];
    // const defaultApp = homeIndex['en-US'];
    // }
    return (
      <div className="wrap" >
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
            <span className="part_one_item_title"><FormattedMessage
              id="JYB"
              defaultMessage={defaultApp['JYB']}
            /></span>
          </div>
          <div
            className="part_one_item"
            onClick={() => {
              this.props.history.push("/ustd-invest");
            }}
          >
            <MyImage
              src={require("@static/icon/home_usdt_chuangtou.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title"><FormattedMessage
              id="USDT"
              defaultMessage={defaultApp['USDT']}
            /></span>
          </div>
          <div
            className="part_one_item"
            // onClick={() => {
            //   this.props.history.push("/profit");
            // }}
          >
            <MyImage
              src={require("@static/icon/home_my_invest.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title"><FormattedMessage
              id="jiaoyisuo"
              defaultMessage={defaultApp['jiaoyisuo']}
            /></span>
          </div>
          <div
            className="part_one_item"
            onClick={() => {
              this.props.history.push("/transfer");
            }}
          >
            <MyImage
              src={require("@static/icon/home_transfer.png")}
              className="part_one_item_img"
            ></MyImage>
            <span className="part_one_item_title"><FormattedMessage
              id="zhuanzhan"
              defaultMessage={defaultApp['zhuanzhan']}
            /></span>
          </div>
        </div>
                
        <div className="part part_four">
          <div className="part_four_title"><FormattedMessage
              id="Price"
              defaultMessage={defaultApp['Price']}
            /></div>
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
          <div className="part_four_item">
            <MyImage
              src={require("@static/icon/home_cagi.png")}
              className="part_four_item_img"
            ></MyImage>
            <span className="part_four_item_name">CAGI</span>
            <span className="part_four_item_price">
              $ {(this.state.currencyList[2]?.rate / 100).toFixed(4)}
            </span>
          </div>
          <div className="part_four_item">
            <MyImage
              src={require("@static/icon/home_mkl.png")}
              className="part_four_item_img"
            ></MyImage>
            <span className="part_four_item_name">MKL</span>
            <span className="part_four_item_price">
              $ {(this.state.currencyList[2]?.rate / 100).toFixed(4)}
            </span>
          </div>
          <div className="part_four_item">
            <MyImage
              src={require("@static/icon/home_tsm.png")}
              className="part_four_item_img"
            ></MyImage>
            <span className="part_four_item_name">TSM</span>
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



        <div className="part part_two">
          <div
            className="part_two_item"
            onClick={() => this.props.history.push("/recharge")}
          >
            <MyImage
              src={require("@static/icon/home_recharge.png")}
              className="part_two_item_img"
            ></MyImage>
            <span><FormattedMessage
              id="chongbi"
              defaultMessage={defaultApp['chongbi']}
            /></span>
          </div>
          <div className="part_two_seperate"></div>
          <div
            className="part_two_item"
            onClick={() => this.props.history.push("/withdraw")}
          >
            <MyImage
              src={require("@static/icon/home_withdraw.png")}
              className="part_two_item_img"
            ></MyImage>
            <span><FormattedMessage
              id="tibi"
              defaultMessage={defaultApp['tibi']}
            /></span>
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
