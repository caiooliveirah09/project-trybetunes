import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
      artistName: '',
      collectionName: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ loading: true }, async () => {
      const fetchMusics = await getMusics(id);
      this.setState({ musics: fetchMusics.slice(1),
        loading: false,
        artistName: fetchMusics[0].artistName,
        collectionName: fetchMusics[0].collectionName });
    });
  }

  render() {
    const { loading, artistName, collectionName, musics } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <span data-testid="artist-name">{ artistName }</span>
        <span data-testid="album-name">{ collectionName }</span>
        {musics.map((music) => (<MusicCard
          key={ music.previewUrl }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
