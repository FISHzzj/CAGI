import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { MyImage } from '@component/MyImage/MyImage'
import Css from "./content.module.scss";

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        title: '',
        create_time: '',
        content: ''
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            create_time: this.props.create_time,
            content: this.props.content,
            type: this.props.type ?? 1,
            // type: 1新闻 2公告 3留言
            image: this.props.image ?? ''
        })
    }


    render() {
        return (
            <div className={Css.wrap}>
                <NavBar
                    icon={<Icon type="left" size="xs" />}
                    onLeftClick={() => {
                        this.props.close()
                    }}
                >
                    {['', '新闻详情', '公告', '留言详情'][this.props.type]}
                </NavBar>

                <div className={Css.content_wrap}>

                    <div className={Css.title}>{this.state.title}</div>

                    <div className={Css.time}>{this.state.create_time}</div>

                    <div className={Css.content}>
                        {this.state.image && this.state.type != 1 && <MyImage src={this.state.image} className='wscnph'></MyImage>}
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                    </div>
                </div>

            </div>
        )
    }
}
export { Content };
