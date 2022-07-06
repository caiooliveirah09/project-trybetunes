import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Card from './Card';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      artist: '',
      loading: false,
      searched: false,
      artistSearched: '',
      results: [],
      noResults: false,
    };
  }

  validateInput = (event) => {
    const min = 2;
    const input = event.target.value;
    this.setState({ artist: input });
    if (input.length >= min) {
      this.setState({ buttonDisabled: false });
    } else { this.setState({ buttonDisabled: true }); }
  }

  fetchArtist = () => {
    const { artist } = this.state;
    this.setState({ loading: true,
      searched: false,
      artistSearched: artist }, async () => {
      const response = await searchAlbumsAPI(artist);
      this.setState({ artist: '', loading: false, searched: true, results: response });
      if (response.length === 0) {
        this.setState({ noResults: true });
      } else {
        this.setState({ noResults: false });
      }
    });
  }

  render() {
    const { buttonDisabled, artist, loading, searched, artistSearched,
      results, noResults } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-artist-input">
            Artist
            <textarea
              data-testid="search-artist-input"
              cols="10"
              rows="1"
              value={ artist }
              onChange={ this.validateInput }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.fetchArtist }
          >
            Pesquisar
          </button>
        </form>
        { searched && (
          <span>
            Resultado de álbuns de:
            {` ${artistSearched}`}
          </span>
        )}
        { noResults && (
          <span>
            Nenhum álbum foi encontrado
          </span>
        )}
        {results.map((result) => (
          <Card
            key={ result.collectionId }
            collectionName={ result.collectionName }
            artistName={ result.artistName }
            artworkUrl100={ result.artworkUrl100 }
            collectionId={ result.collectionId }
          />
        ))}
      </div>
    );
  }
}

export default Search;
