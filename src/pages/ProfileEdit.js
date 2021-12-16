import PropTypes from 'prop-types';
import React from 'react';
import Header from './components/Header';

class ProfileEdit extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header history={ history } />
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileEdit;
