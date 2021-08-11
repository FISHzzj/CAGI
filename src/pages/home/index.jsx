import React, { PureComponent } from 'react';
import { Tabs, Badge, Carousel, NoticeBar, TabBar} from 'antd-mobile';
import BScroll from 'better-scroll';
import Slide from './slide';
import { connect } from 'react-redux';
import {
  AsyncIndexActivityModule,
  AsyncTitleColor
} from '../../redux-file/actions-creators';
import Kingkong from './kingkongmodule';
import LazyLoad, { forceCheck } from 'react-lazyload';
import './index.less';
import { FixedSizeList as List } from 'react-window';
import { MyImage } from '@component/MyImage/MyImage';
import { Content } from '@component/Content/Content'
import  "./index.scss";


// import { currencyList, notice, banner, ventureList } from "@api/home";




const tabs = [
  { title: <Badge text={'3'}>今日推荐</Badge> },
  { title: <Badge text={'今日(20)'}>今日热卖</Badge> },
  { title: <Badge z>折扣到底</Badge> }
];


class App extends React.Component {
  constructor() {
    super();
    this.wrap = React.createRef();
    // this.state = {
      
    // };
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
    this.props.IndexActivityModule();
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
    this.myScroll.on('scroll', e => {
      forceCheck();
      if (e.y < -130) {
        this.props.TitleColor('red');
      } else if (e.y > -130) {
        this.props.TitleColor('transparent');
      }
    });
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
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.IndexActivityModule,
    KingkongModule: state.KingKong
  }),
  dispatch => ({
    IndexActivityModule() {
      const action = AsyncIndexActivityModule();
      dispatch(action);
    },
    TitleColor(data) {
      const action = AsyncTitleColor(data);
      dispatch(action);
    }
  })
)(App);
