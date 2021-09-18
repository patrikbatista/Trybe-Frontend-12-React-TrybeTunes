import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './components/Loading';

const MIN_CHARACTERS_SEARCH = 2;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameSearch: '',
      album: '',
      loading: false,
    };

    this.nameArtist = '';
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.createInput = this.createInput.bind(this);
    this.createAlbumCard = this.createAlbumCard.bind(this);
  }

  handleChangeSearch({ target }) {
    this.setState(
      { [target.name]: target.value },
    );
  }

  handleChangeButton() {
    const { nameSearch } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(nameSearch)
      .then((resultArtist) => {
        if (resultArtist !== null) {
          this.nameArtist = nameSearch;
          this.setState({
            nameSearch: '',
            album: resultArtist,
            loading: false,
          });
        }
      });
  }

  createInput(nameSearch) {
    return (
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
          onClick={ this.handleChangeButton }
        >
          Pesquisar
        </button>
      </form>);
  }

  createAlbumCard(album) {
    if (album.length > 0) {
      return (
        <div>
          <h3>{`Resultado de álbuns de: ${this.nameArtist}`}</h3>
          {album.map((
            { artistName,
              collectionId,
              collectionName,
              artworkUrl100,
              releaseDate },
          ) => (
            <section key={ collectionId }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt="Capa do álbum" />
                <h2>{ collectionName }</h2>
              </Link>
              <h3>{ artistName }</h3>
              <h4>{ releaseDate }</h4>
            </section>
          ))}
        </div>
      );
    } return (
      <h2>Nenhum álbum foi encontrado</h2>
    );
  }

  render() {
    const { nameSearch, album, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : this.createInput(nameSearch)}

        {this.createAlbumCard(album)}

      </div>
    );
  }
}

export default Search;
