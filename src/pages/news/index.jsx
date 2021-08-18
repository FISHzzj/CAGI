import React from 'react'
import { MyImage } from "@component/MyImage/MyImage";
import { PullToRefresh, Carousel } from "antd-mobile";
import { Content } from '@component/Content/Content'
import './index.less'
import Bscroll from 'better-scroll'
import { news, banner } from "@api/home";

class App extends React.Component {
    constructor(props) {
        super(props)
        // this.buy = React.createRef()
        this.genData = this.genData.bind(this);
        banner(2).then(resp => {
            console.log(resp)
            console.log(resp.res)
            this.setState({
              bannerList: resp.res 
            });
          });
    }
    componentDidMount() {
        // new Bscroll(this.buy.current)
    }

    state = {
        showContent: false,
        info: {},
        refreshing: false,
        data: [],
        bannerList: []
      }
    
      page = 1;
      pagesize = 6;
      noMore = false;
    
      componentDidMount() {
        setTimeout(() => this.genData(this.page, this.pagesize), 0);
    
      }
    
      // 获取新闻列表
      genData(page, pagesize) {
        if (this.noMore) {
          return false;
        }
        this.setState({ refreshing: true });
        news({ page, pagesize }).then(resp => {
          console.log(resp.res)
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
        });
      }

    render() {
        return (
            <div className="wrapper">
                {/* banner栏位 */}
                <div className="banner">
                  <Carousel
                      className="my-carousel"
                      infinite
                  >
                      {this.state.bannerList.map((i) => (
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
        
                {/* 新闻页-列表 */}
                <div className="list_wrap">
                  <PullToRefresh
                      className="list_container"
                      indicator={{
                        deactivate: "上拉可以刷新"
                      }}
                      direction="up"
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.genData(this.page, this.pagesize)}
                  >
                      {this.state.data.map(i => (
                      <div key={i.id} className="item_profile" onClick={() => { this.setState({ info: i, showContent: true }) }}>
                          <MyImage
                          src={i.image}
                          className="item_image"
                          ></MyImage>
                          <div className="item_des">
                              <div className="item_header">{i.title}</div>
                              <div className="item_content">{i.desc}</div>
                              <div className="item_time">{i.create_time}</div>
                          </div>
                      </div>
                      ))}
                  </PullToRefresh>
                </div>
        
                {this.state.showContent && (
                <div className="content_wrap">
                    <Content {...this.state.info} type={1} close={() => { this.setState({ showContent: false }) }}></Content>
                </div>
                )}
            </div>
        )
    }
}

export default App
