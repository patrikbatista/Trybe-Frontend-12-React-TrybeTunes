import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Loading from './components/Loading';
import MusicCard from './components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      albumCover: '',
      loading: false,
      checked: [],
    };

    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log(id);

    getMusics(id).then((result) => {
      const albumCover = result[0];
      const songs = result.slice(1);// fatia array a partir do indice array
      getFavoriteSongs().then((response) => {
        const checked = songs
          .map(({ trackId }) => response.some((song) => song.trackId === trackId));// adiciona false para cada elemeto array
        this.setState({ songs, albumCover, checked });
      });
    });
  }

  handleCheckBox(event) {
    const { name } = event.target; // evento recebido do MusiCard
    const { songs, checked } = this.state;
    const songIndex = songs.findIndex((song) => song.trackId === Number(name));
    const songResult = songs.find((song) => Number(name) === song.trackId);
    this.setState({ loading: true });
    if (checked[songIndex] === true) {
      checked[songIndex] = false;
      removeSong(songResult).then(() => this.setState({ loading: false, checked }));
    } else {
      checked[songIndex] = true;
      addSong(songResult).then(() => this.setState({ loading: false, checked }));
    }
  }

  renderAlbum() {
    const { albumCover, songs, checked } = this.state;
    const { artistName, collectionName } = albumCover;

    return (
      <div>

        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{collectionName}</h3>
        {songs
          .map((song, index) => (<MusicCard
            song={ song }
            handleCheckBox={ this.handleCheckBox }
            key={ song.trackId }
            checked={ checked[index] }
          />))}

      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : this.renderAlbum()}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes
    .arrayOf(PropTypes.object).isRequired,
};

export default Album;
