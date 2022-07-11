import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
      artistName: '',
      collectionName: '',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ loading: true }, async () => {
      const fetchMusics = await getMusics(id);
      const favoriteSongs = await getFavoriteSongs();
      this.setState((previousState) => ({
        musics: fetchMusics.slice(1),
        loading: false,
        artistName: fetchMusics[0].artistName,
        collectionName: fetchMusics[0].collectionName,
        favoriteSongs: [...previousState.favoriteSongs, ...favoriteSongs],
      }));
    });
  }

  render() {
    const { loading, artistName, collectionName, musics, favoriteSongs } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <span data-testid="artist-name">{ artistName }</span>
        <span data-testid="album-name">{ collectionName }</span>
        {musics.map((music) => (<MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          musicInfo={ music }
          favoriteSongs={ favoriteSongs }
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
