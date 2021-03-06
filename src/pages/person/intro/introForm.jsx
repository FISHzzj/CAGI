import React from "react";
import { MyImage } from "@component/MyImage/MyImage";
import { NavBar, Icon, List, Button, InputItem, Toast } from "antd-mobile";
import { uploadImage } from '@src/utility/imageUpload'
import { createForm } from "rc-form";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

import  "./intro.less";

import { userInfo, editUserInfo } from "@api/auth";

class IntroForm extends React.Component {
  constructor(props) {
    super(props);
    userInfo().then(resp => {
      this.setState({ userInfo: resp });
      this.props.form.setFieldsValue({ nick_name: resp.nick_name })

    });
    this.fileRef = React.createRef();

  }

  state = {
    userInfo: {
      head_image: localStorage.getItem('avatar')
    },
  };

  componentDidMount() {
    this.fileRef.current.addEventListener('change', this.uploadFile);
  }

  uploadFile = (e) => {
    uploadImage(e.target.files[0]).then(resp => {
      this.setState({
        userInfo: Object.assign({}, this.state.userInfo, { head_image: resp })
      })
    })
  }

  submit = () => {
    this.props.form.validateFields((err, value) => {
      editUserInfo({ nick_name: value.nick_name, head_image: this.state.userInfo.head_image }).then(resp => {
        localStorage.setItem('avatar', this.state.userInfo.head_image)
        Toast.info('个人资料编辑成功', 1, () => {
          this.props.history.go(-1)
        })
      })
    })
  };

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const defaultApp = window.app['en-US'];

    return (
      <div className="intro_form_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
           <FormattedMessage
              id="xiugaiziliao"
              defaultMessage={defaultApp['xiugaiziliao']}
          />
        </NavBar>

        <List className="list_wrap">
          <List.Item
            extra={<MyImage className="logo" src={this.state.userInfo.head_image}></MyImage>}
            arrow="horizontal"
            onClick={() => { this.fileRef.current.click(); }}
          >
            <FormattedMessage
              id="gerentouxiang"
              defaultMessage={defaultApp['gerentouxiang']}
          />
          </List.Item>

          <InputItem
            {...getFieldProps("nick_name")}
            placeholder="请输入会员昵称"
            clear
          >
            <FormattedMessage
              id="huiyuannicheng"
              defaultMessage={defaultApp['huiyuannicheng']}
          />
          </InputItem>
        </List>

        <Button onClick={this.submit} className="logout">
          <FormattedMessage
                id="wancheng"
                defaultMessage={defaultApp['wancheng']}
            />
        </Button>

        <input type="file" ref={this.fileRef} className="input_hidden" />
      </div>
    );
  }
}

const IntroFormWrapper = createForm()(IntroForm);

export default IntroFormWrapper;
