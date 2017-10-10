import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ValueComponent extends Component {
  render () {
    console.log('TOTOTOTOTOTO');

    return (
      <div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<Gravatar email={this.props.value.email} size={15} style={gravatarStyle} />
          {this.props.children}
				</span>
      </div>
    );
  }
}

ValueComponent.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.object,
};

export default ValueComponent;
