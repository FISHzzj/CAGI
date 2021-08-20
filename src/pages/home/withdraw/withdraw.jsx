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
import "./withdraw.less";

import { configDrawList, drawCommit, userAccount } from "@api/asset";

class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    Promise.all([configDrawList(), userAccount()]).then(resp => {
      this.setState({
        feeMoney: resp[0][0].fee_money,
        remainMoney: resp[1][resp[0][0].currency_id]
      });
      this.currencyId = resp[0][0].currency_id;
    });
  }

  state = {
    files: [],
    multiple: false,
    feeMoney: "-",
    remainMoney: "-",
    money: "",
    realMoney: "-"
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

  inputMoneyOnChange = e => {
    this.setState({
      money: e,
      realMoney: this.handleRealMoneyChange(e)
    });
  };

  handleRealMoneyChange(money) {
    if (isNaN(money)) {
      return "-";
    }

    let realMoney = money - this.state.feeMoney;
    if (realMoney < 0) {
      return 0;
    }
    return realMoney;
  }

  submit = () => {
    let address = this.props.form.getFieldValue("address")?.trim();
    if (address === undefined || address === "") {
      Toast.info("请输入钱包地址");
      return false;
    }
    if (isNaN(this.state.money) || this.state.money <= this.state.feeMoney) {
      Toast.info("请输入正确的提币数量");
      return false;
    }
    drawCommit({
      draw_id: this.currencyId,
      money: this.state.money,
      address: address,
      image: this.state.files[0]?.url,
      pay_password: this.props.form.getFieldValue("pay_password")
    }).then(resp => {
      Toast.success("提币申请已提交，请等待审核结果", 2, () => {
        this.props.history.replace("/index/withdraw/record");
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { files } = this.state;
    return (
      <div className="wrap_withdraw">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <i
              key="1"
              className={`iconfont icon-history history`}
              onClick={() => {
                this.props.history.push("/withdrawRecord");
              }}
            ></i>
          ]}
        >
          提币
        </NavBar>

        <List className={`part`}>
          <InputItem
            {...getFieldProps("address")}
            clear
            placeholder="请输入或粘贴地址"
          >
            钱包地址
          </InputItem>
          <InputItem
            clear
            placeholder={`可用余额 ${this.state.remainMoney} USDT`}
            value={this.state.money}
            onChange={this.inputMoneyOnChange}
            type="money"
            moneyKeyboardAlign="left"
          >
            数量
          </InputItem>
          <InputItem
            value={this.state.realMoney}
            onChange={this.realMoneyOnChange}
            disabled={true}
          >
            到账数量
          </InputItem>
          <InputItem value={this.state.feeMoney} disabled={true}>
            手续费
          </InputItem>
          <InputItem
            {...getFieldProps("pay_password")}
            clear
            placeholder="请输入二级密码"
            type="password"
          >
            输入二级密码
          </InputItem>
        </List>
        <div className="qr_title">上传钱包二维码</div>
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

const WithdrawWrapper = createForm()(Withdraw);
export default  WithdrawWrapper
