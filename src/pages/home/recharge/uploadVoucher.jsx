import React from "react";
import {
  NavBar,
  Icon,
  List,
  InputItem,
  ImagePicker,
  Button,
  Toast
} from "antd-mobile";
import { createForm } from "rc-form";
import { uploadImage } from "@src/utility/imageUpload";
import { remittanceCommit } from "@api/asset";
import "./recharge.less";

class UploadVoucher extends React.Component {
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
    const money = this.props.form.getFieldValue("money");

    if (
      !/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([1-9]\d*))$/.test(
        money
      )
    ) {
      Toast.info("请输入正确的充币数量", 2, null, false);
      return false;
    }

    if (this.state.files.length !== 1) {
      Toast.info("请上传凭证", 2, null, false);
      return false;
    }

    remittanceCommit({ money, pay_voucher: this.state.files[0].url }).then(
      resp => {
        Toast.success("提交成功，请等待审核结果", 2, () => {
          this.props.history.replace("/rechargerecord");
        });
      }
    );
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { files } = this.state;

    return (
      <div className="upload_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          上传凭证
        </NavBar>

        <List className={`form_wrap`}>
          <InputItem
            {...getFieldProps("money")}
            clear
            placeholder="请输入充币数量"
          >
            充币数量
          </InputItem>
        </List>

        <div className="qr_title">上传凭证</div>
        <div className={`qr_content`}>
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
          提交
        </Button>
      </div>
    );
  }
}
const UploadVoucherWrapper = createForm()(UploadVoucher);

export default  UploadVoucherWrapper
