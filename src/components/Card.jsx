import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { collectionName, artistName, artworkUrl100, collectionId } = this.props;
    return (
      <div key={ collectionId }>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          {collectionName}
        </Link>
        <span>{ artistName }</span>
        <img src={ artworkUrl100 } alt={ collectionName } />
      </div>
    );
  }
}

Card.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
