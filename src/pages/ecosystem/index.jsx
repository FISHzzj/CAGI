import React from 'react'
import './index.scss'
import Bscroll from 'better-scroll'
export default class App extends React.Component {
    constructor() {
        super()
        this.buy = React.createRef()
    }
    componentDidMount() {
        // new Bscroll(this.buy.current)
    }
    render() {
        return (
            <div className="buy-wrap" ref={this.buy}>
                生态
            </div>
        )
    }
}