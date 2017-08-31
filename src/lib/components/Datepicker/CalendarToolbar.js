import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateTimeFormat } from './dateUtils';
import styled from 'styled-components';

const Icon = styled.i`
  font-weight: bold;
  padding: 5px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-style: normal;
  font-size: 0.7em;
  :hover {
    background-color: #026aa7;
    color: white;
  }
`;

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: inherit;
  height: 48px;
`;

const TitleDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

const TitleText = styled.div`
  height: inherit;
  padding-top: 12px;
`;

class CalendarToolbar extends Component {
  static propTypes = {
    displayDate: PropTypes.object.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool
  };

  static defaultProps = {
    nextMonth: true,
    prevMonth: true
  };

  state = {
    transitionDirection: 'up'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction =
        nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
      this.setState({
        transitionDirection: direction
      });
    }
  }

  handleTouchTapPrevMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1);
    }
  };

  handleTouchTapNextMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1);
    }
  };

  render() {
    const { displayDate } = this.props;

    const dateTimeFormatted = new dateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(displayDate);

    return (
      <Root>
        <Icon
          disabled={!this.props.prevMonth}
          onClick={this.handleTouchTapPrevMonth}
        >
          {String.fromCharCode(9664)}
        </Icon>

        <TitleDiv>
          <TitleText key={dateTimeFormatted}>{dateTimeFormatted}</TitleText>
        </TitleDiv>
        <Icon
          disabled={!this.props.nextMonth}
          onClick={this.handleTouchTapNextMonth}
        >
          {String.fromCharCode(9654)}
        </Icon>
      </Root>
    );
  }
}

export default CalendarToolbar;