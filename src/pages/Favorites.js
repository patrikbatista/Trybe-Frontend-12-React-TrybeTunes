import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Header from './components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((results) => this.setState({ songs: results }));
  }

  render() {
    const { songs } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header history={ history } />
        <div className="w-50 mx-auto mt-3">
          <Carousel
            fade
          >
            {songs.map((song) => (
              <Carousel.Item key={ song.trackId }>
                <img
                  className="d-block w-100"
                  src={ song.artworkUrl100 }
                  alt={ song.artistName }
                />
                <Carousel.Caption>
                  <h2>{song.artistName}</h2>
                  <h3>{song.trackName}</h3>
                  <audio src={ song.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Favorites;
