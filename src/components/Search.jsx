import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  render() {
    const { logged } = this.props;
    console.log(logged);
    if (logged) {
      return <div data-testid="page-search">search</div>;
    }
    return <div>permission denied, please login! </div>;
  }
}

Search.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Search;
