import React from 'react';
import Header from './components/Header';

const MIN_CHARACTERS_SEARCH = 2;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameSearch: '',
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSearch({ target }) {
    this.setState(
      { [target.name]: target.value },
    );
  }

  render() {
    const { nameSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <label htmlFor="input-artist">
            <input
              data-testid="search-artist-input"
              type="text"
              name="nameSearch"
              value={ nameSearch }
              onChange={ this.handleChangeSearch }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ nameSearch.length < MIN_CHARACTERS_SEARCH }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
