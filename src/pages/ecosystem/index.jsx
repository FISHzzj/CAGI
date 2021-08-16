import React from 'react'
import { Modal, Button } from 'antd-mobile';
import { MyImage } from "@component/MyImage/MyImage";
import './index.less'
import Bscroll from 'better-scroll'
class App extends React.Component {
    constructor() {
        super()
        this.buy = React.createRef()
        this.state = {
            showTip: false
          }
        
    }
    componentDidMount() {
        // new Bscroll(this.buy.current)
    }
    render() {
        return (
            <div className="wrap">
                <div className="part" onClick={() => {
                    this.setState({ showTip: true })
                }}>
                <div className="title">便民服务</div>
                <div className="content">
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/jiaofeifuwu.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">缴费服务</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/jiaoyupeixun.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">教育培训</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/shequtoupiao.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">社区投票</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/shequzhibo.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">社区直播</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/guojisaishi.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">国际赛事</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/haiwaishangcheng.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">海外商城</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/youxiyule.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">游戏娱乐</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/wenhualvyou.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">文化旅游</div>
                    </div>
                </div>
                </div>
        
                <div className="separate"></div>
        
                <div className="part" onClick={() => {
                    this.setState({ showTip: true })
                }}>
                <div className="title">财富管理</div>
                <div className="content">
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/shangjiazhifu.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">商家支付</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/guojibaoxian.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">国际保险</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/guojitouzi.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">国际投资</div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/aixinjuanzhu.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">爱心捐助</div>
                    </div>
                </div>
                </div>
        
                <Modal
                    className="tip_wrap"
                    visible={this.state.showTip}
                    transparent
                    onClose={() => { this.setState({ showTip: false }) }}
                    >
                    <div className="tip_content">
                        <MyImage className="tip_img" src={require('@static/img/developing.png')}></MyImage>
                        <Button className="tip_btn" onClick={() => { this.setState({ showTip: false }) }}>好的</Button>
                    </div>
                </Modal>
            </div >
        )
    }
}

export default App
