// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find, isEmpty, map, values } from 'lodash';
import { getIcos } from '../actions';
import Ico from '../components/Ico';
import Navbar from "../components/Navbar";

class IcosPage extends Component {
  componentWillMount() {
    if (isEmpty(this.props.icos)) {
      this.props.getIcos();
    }
  }

  render() {
    const { icos } = this.props;

    console.log(this.props);
    console.log(this.props);
    console.log(this.props);

    if (isEmpty(icos)) {
      return <div>Loading...</div>;
    }

    const icosDisplay = map(icos, (ico, key) => {
      return (
        <Ico key={key} {...ico} />
      );
    });

    return (
      <div className="app-container icos">
        <Navbar />
        <div className="icos-container">
          {icosDisplay}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ icos }, { match }) {
  const data = icos.data ? icos.data[match.params.status] : null;

  return {
    icos: data,
    status: match.params.status,
  };
}

export default connect(mapStateToProps, { getIcos })(IcosPage);
