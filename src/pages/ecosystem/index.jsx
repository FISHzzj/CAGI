import React from 'react'
import { Modal, Button } from 'antd-mobile';
import { MyImage } from "@component/MyImage/MyImage";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl} from 'react-intl';

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
        const defaultApp = window.app['en-US'];

        return (
            <div className="wrap">
                <div className="part" onClick={() => {
                    this.setState({ showTip: true })
                }}>
                <div className="title">
                <FormattedMessage
                    id="bianminfuwu"
                    defaultMessage={defaultApp['bianminfuwu']}
                    />
                </div>
                <div className="content">
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/jiaofeifuwu.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="jiaofeifuwu"
                            defaultMessage={defaultApp['jiaofeifuwu']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/jiaoyupeixun.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="jiaoyupeixun"
                            defaultMessage={defaultApp['jiaoyupeixun']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/shequtoupiao.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="shequtoupiao"
                            defaultMessage={defaultApp['shequtoupiao']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/shequzhibo.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="shequzhibo"
                            defaultMessage={defaultApp['shequzhibo']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/guojisaishi.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="guojisaishi"
                            defaultMessage={defaultApp['guojisaishi']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/haiwaishangcheng.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="haiwaishangcheng"
                            defaultMessage={defaultApp['haiwaishangcheng']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/youxiyule.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="youxiyule"
                            defaultMessage={defaultApp['youxiyule']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                        <MyImage
                            src={require("@static/icon/eco/wenhualvyou.png")}
                            className="content_item_logo"
                        ></MyImage>
                        <div className="content_item_tag">
                            <FormattedMessage
                                id="wenhualvyou"
                                defaultMessage={defaultApp['wenhualvyou']}
                            />
                        </div>
                    </div>
                </div>
                </div>
        
                <div className="separate"></div>
        
                <div className="part" onClick={() => {
                    this.setState({ showTip: true })
                }}>
                <div className="title">
                    <FormattedMessage
                        id="caifuguangli"
                        defaultMessage={defaultApp['caifuguangli']}
                    />
                </div>
                <div className="content">
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/shangjiazhifu.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="shangjiazhifu"
                            defaultMessage={defaultApp['shangjiazhifu']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/guojibaoxian.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="guojibaoxian"
                            defaultMessage={defaultApp['guojibaoxian']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/guojitouzi.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="guojitouzi"
                            defaultMessage={defaultApp['guojitouzi']}
                        />
                    </div>
                    </div>
                    <div className="content_item">
                    <MyImage
                        src={require("@static/icon/eco/aixinjuanzhu.png")}
                        className="content_item_logo"
                    ></MyImage>
                    <div className="content_item_tag">
                        <FormattedMessage
                            id="aixinjuanzu"
                            defaultMessage={defaultApp['aixinjuanzu']}
                        />
                    </div>
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
                        <Button className="tip_btn" onClick={() => { this.setState({ showTip: false }) }}>
                            <FormattedMessage
                                id="haode"
                                defaultMessage={defaultApp['haode']}
                            />
                        </Button>
                    </div>
                </Modal>
            </div >
        )
    }
}

export default App
