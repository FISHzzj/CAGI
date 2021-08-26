import React from "react";
import {
    NavBar,
    Icon,
    List,
    InputItem,
    TextareaItem,
    ImagePicker,
    Button,
    Toast
} from "antd-mobile";
import { createForm } from "rc-form";
import { uploadImage } from "@src/utility/imageUpload";
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
import "./message.less";

import { sendMail } from '@api/home'

class MessageForm extends React.Component {
    state = {
        files: [],
        multiple: false
    };

    fileChange = (files, type, index) => {
        if (type === "add") {
            Toast.loading("上传中...", 0);
            uploadImage(files[0].file).then(imgUrl => {
                this.setState({
                    files: [{ url: imgUrl }]
                });
            });
        }

        if (type === "remove") {
            this.setState({
                files: []
            });
        }
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
            if (!value.title) {
                Toast.info('请输入标题', 2, null, false)
                return false
            }

            if (!value.content) {
                Toast.info('请输入内容', 2, null, false)
                return false
            }

            sendMail({ ...value, image: this.state.files[0]?.url }).then(resp => {
                Toast.success('提交成功', 2, () => {
                    this.props.history.go(-1)
                })
            })
        });
    };

    render() {
        const { getFieldProps } = this.props.form;
        const { files } = this.state;
        const defaultApp = window.app['en-US'];

        return (
            <div className="form_wrap">
                <NavBar
                    icon={<Icon type="left" size="xs" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >
                    <FormattedMessage
                        id="wodeliuyan"
                        defaultMessage={defaultApp['wodeliuyan']}
                    />
                </NavBar>

                <div className="list_wrap">
                    <List>
                        <InputItem
                            {...getFieldProps("title")}
                            clear
                            placeholder="请输入标题"
                        >
                            <FormattedMessage
                                id="biaoti"
                                defaultMessage={defaultApp['biaoti']}
                            />  
                    </InputItem>
                        <TextareaItem
                            title="内容"
                            autoHeight
                            rows={5}
                            count={300}
                            {...getFieldProps("content")}
                            clear
                            placeholder="请输入内容"
                        >
                        </TextareaItem>
                    </List>

                    <div className="message_title"> 
                            <FormattedMessage
                                id="shangchuanpinzheng"
                                defaultMessage={defaultApp['shangchuanpinzheng']}
                            /> </div>
                    <div className={`pic_content`}>
                        <ImagePicker
                            files={files}
                            length={1}
                            onChange={this.fileChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 1}
                            multiple={this.state.multiple}
                        />
                    </div>

                    <Button onClick={this.submit} className="submit">
                        <FormattedMessage
                            id="tijiao"
                            defaultMessage={defaultApp['tijiao']}
                        /> 
                </Button>
                </div>
            </div>
        );
    }
}
const MessageFormWrapper = createForm()(MessageForm);

export default MessageFormWrapper;
