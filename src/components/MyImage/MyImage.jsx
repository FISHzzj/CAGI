import React from "react";
import "./MyImage.module.scss";

class MyImage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.defaultSrc = props.defaultSrc || require("../../../static/img/img_holder.png");
    this.state = {
      src: props.src || this.defaultSrc
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('{')
    // console.log(prevProps.src);
    // console.log(prevState.src)
    // console.log('------------')
    // console.log(this.props.src)
    // console.log(this.state.src)
    // console.log('}')

    if (prevProps.src !== this.props.src) {
      this.setState({ src: this.props.src })
      // console.log('++++++++++++++++')
      // console.log(this.state.src)
      // console.log(123)
    }
  }

  render() {
    return (
      <img
        {...this.props}
        src={this.state.src}
        alt={this.props.alt}
        onError={() => {
          this.setState({ src: this.defaultSrc });
        }}
        className={`${"default_img_setting"} ${this.props.className}`}
      />
    )
  }
}


export { MyImage } ;
