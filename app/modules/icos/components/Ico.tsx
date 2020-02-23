import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Ico extends Component {
  render() {
    const {
      start_time,
      end_time,
      timezone,
      description,
      image,
      name,
    } = this.props;

    return (
      <div className="ico">
        <div className="infos">
          <img src={image} width={150} alt={name} />
          <p>{description}</p>
        </div>
        <div className="date">
          <span>{moment(`${start_time} ${timezone}`, 'YYYY-MM-DD HH:mm Z').utc().format()}</span>
          <span>{moment(`${end_time} ${timezone}`, 'YYYY-MM-DD HH:mm Z').utc().format()}</span>
        </div>
      </div>
    );
  }
}

Ico.propTypes = {
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Ico;
