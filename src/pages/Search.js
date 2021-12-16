import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './components/Loading';

import '../styles/search.css';

const MIN_CHARACTERS_SEARCH = 2;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameSearch: '',
      album: '',
      loading: false,
      apiDone: false,
    };

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
    this.setState({ loading: true, apiDone: false });
    searchAlbumsAPI(nameSearch)
      .then((resultArtist) => {
        if (resultArtist !== null) {
          this.nameArtist = nameSearch;
          this.setState({
            nameSearch: '',
            album: resultArtist,
            loading: false,
            apiDone: true,
          });
        }
      });
  }

  createInput(nameSearch) {
    return (
      <div className="mt-3 text-center">
        <Form className="row d-flex justify-content-center">
          <Form.Label htmlFor="input-artist">
            <Form.Control
              size="sm"
              type="text"
              name="nameSearch"
              value={ nameSearch }
              onChange={ this.handleChangeSearch }
            />
          </Form.Label>
          <Button
            size="sm"
            variant="success"
            type="button"
            data-testid="search-artist-button"
            disabled={ nameSearch.length < MIN_CHARACTERS_SEARCH }
            onClick={ this.handleChangeButton }
          >
            Pesquisar
          </Button>
        </Form>
      </div>);
  }

  createAlbumCard(album) {
    const { apiDone } = this.state;
    if (album.length > 0) {
      return (
        <div>
          <h3 className="text-center">{`Resultado de álbuns de: ${this.nameArtist}`}</h3>
          <Row xs={ 1 } md="auto" className="g-4 justify-content-center">
            {album.map((
              { artistName,
                collectionId,
                collectionName,
                artworkUrl100,
              },
            ) => (
              <Col
                key={ collectionId }
              >
                <Card
                  style={ { width: '18rem' } }
                >
                  <Link
                    to={ `/album/${collectionId}` }
                  >
                    <div
                      className="bg-image hover-overlay hover-zoom hover-shadow ripple"
                    >
                      <Card.Img
                        className="w-100"
                        variant="top"
                        data-testid={ `link-to-album-${collectionId}` }
                        src={ artworkUrl100 }
                        alt="Capa do álbum"
                      />
                    </div>
                  </Link>
                  <Card.Body>
                    <Card.Title>{ artistName }</Card.Title>
                    <Card.Text>
                      { collectionName }
                    </Card.Text>
                  </Card.Body>
                  <Card.Body />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    } if (apiDone === true) {
      return (
        <h3>Nenhum álbum foi encontrado</h3>
      );
    }
  }

  render() {
    const { nameSearch, album, loading } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-search">
        <Header history={ history } />
        {loading ? <Loading /> : this.createInput(nameSearch)}

        {this.createAlbumCard(album)}

      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Search;
