import React from 'react'
import moment from 'moment'
import Dotdotdot from 'react-dotdotdot'

import './index.css'

class OrderComponent extends React.Component {
  constructor(){
    super()

    this.state = {

    }

  }

  renderComments() {
    let { comments } = this.props.data
    if (comments) {
      let renderCommentsArr = []
      comments.forEach((data,index) => {
          if (index < 3) {
            renderCommentsArr.push(
              <div className="orderComponent-comments-container" key={index}>
                <div className="orderComponent-comments-container-text">
                  {data}
                </div>
              </div>
            )
          }
      })
      return (
        <div className="orderComponent-comments">
          <div className="orderComponent-comments-divider" />
          {renderCommentsArr}
        </div>
      )
    }
  }

  renderPeriodColor(period) {
    if(period){
      switch (period) {
        case 'Breakfast':
          return '#ff9933'
        case 'Lunch':
          return '#cc3300'
        case 'Dinner':
          return '#802b00'
        case 'Urgent':
          return '#e60000'
        default:
          return '#00e699'
      }
    }
  }

  render() {
    let  { name, deadline, period } = this.props.data
    let date = moment(deadline).format('D MMM, ddd')
    return (
      <div className="orderComponent">
        <div className="orderComponent-wrapper">
          <div className="orderComponent-headerContainer">
            <div className="orderComponent-headerContainer-text">
              {date}
            </div>
            <div className="orderComponent-headerContainer-period">
              <div className="orderComponent-headerContainer-period-container" style={{backgroundColor: this.renderPeriodColor(period)}}>
                <div className="orderComponent-headerContainer-period-container-text">
                  {period}
                </div>
              </div>
            </div>
          </div>
          <div className="orderComponent-itemContainer">
            <div className="orderComponent-itemContainer-text">
              <Dotdotdot clamp={3}>
                {name}
              </Dotdotdot>
            </div>
          </div>
          {this.renderComments()}
        </div>
      </div>
    )
  }
}

export default OrderComponent
