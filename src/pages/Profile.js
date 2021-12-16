import PropTypes from 'prop-types';
import React from 'react';
import Header from './components/Header';

class Profile extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-profile">
        <Header history={ history } />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Profile;
