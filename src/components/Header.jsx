import React from 'react';
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
        <span data-testid="header-user-name">{name}</span>
      </div>
    );
  }
}

Header.propTypes = {
  // userName: PropTypes.string.isRequired,
};

export default Header;
