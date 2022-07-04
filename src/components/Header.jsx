import React from 'react';

class Header extends React.Component {
  render() {
    const divStyle = { backgroundColor: '#322a31',
      color: 'white',
      fontSize: '35px',
      padding: '15px',
    };

    return (
      <div style={ divStyle }>
        <p>TrybeTunes</p>
      </div>
    );
  }
}

export default Header;
