import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
    };
  }

  validateInput = (event) => {
    const min = 2;
    const input = event.target.value;
    if (input.length >= min) {
      this.setState({ buttonDisabled: false });
    } else { this.setState({ buttonDisabled: true }); }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-artist-input">
            Artist
            <textarea
              data-testid="search-artist-input"
              cols="10"
              rows="1"
              onChange={ this.validateInput }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
