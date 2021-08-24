import React from "react";
import { NavBar, Icon, Accordion } from "antd-mobile";
import "./team.less";

import { teamInfo } from '@api/home'

class MyTeam extends React.Component {
  constructor(props) {
    super(props)
    teamInfo(localStorage.getItem('member')).then(resp => {
      this.setState({ memberList: resp })
    })

    // 团队统计
    let search = this.props.location.search;
    let statistic = search.substr(search.indexOf('=') + 1).split(',')
    this.state.statistic = statistic
  }

  state = {
    memberList: [],
    activeMember: '',
    statistic: []
  }

  teamItem(id, rank_name, name, member, performance) {
    return (
      <div key={id} className="team_item">
        <div className="dot"></div>
        <span>{rank_name}：{name}({member})</span>
        <span className="team_item_performance">{performance}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="team_wrap">
        <NavBar
          icon={<Icon type="left" size="xs" />}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          我的团队
        </NavBar>

        {/* 统计部分 */}
        <div className="statistic">
          <div className="statistic_item">
            <span>团队人数</span>
            <span className="statistic_item_num">{this.state.statistic[0]}</span>
          </div>
          <div className="statistic_item">
            <span>新增业绩</span>
            <span className="statistic_item_num">{this.state.statistic[1]}</span>
          </div>
          <div className="statistic_item">
            <span>团队总业绩</span>
            <span className="statistic_item_num">{this.state.statistic[2]}</span>
          </div>
        </div>

        {/* 内容部分 */}
        <div className="content">
          <Accordion onChange={this.onChange}>
            {
              this.state.memberList.map(i => (
                <Accordion.Panel key={i.member} header={this.teamItem(i.id, i.rank_name, i.nick_name, i.member, i.group_achievement_money)}>
                  <div className="team_item_sub">
                    {
                      i.child.map(l => this.teamItem(l.id, l.rank_name, l.nick_name, l.member, l.group_achievement_money))
                    }
                  </div>
                </Accordion.Panel>
              ))
            }

          </Accordion>
        </div>
      </div>
    );
  }
}
export default  MyTeam ;
