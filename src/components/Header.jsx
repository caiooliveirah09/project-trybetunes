import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.asyncGetUser();
  }

  asyncGetUser = async () => {
    this.setState(
      { loading: true },
      async () => {
        this.setState({ userName: await getUser(), loading: false });
      },
    );
  }

  render() {
    const { userName, loading } = this.state;
    const { name } = userName;
    console.log(name);
    const divStyle = { backgroundColor: '#322a31',
      color: 'white',
      fontSize: '35px',
      padding: '15px',
    };

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="header-component" style={ divStyle }>
        <span>TrybeTunes</span>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
        <span data-testid="header-user-name">{name}</span>
      </div>
    );
  }
}

Header.propTypes = {
  // userName: PropTypes.string.isRequired,
};

export default Header;
