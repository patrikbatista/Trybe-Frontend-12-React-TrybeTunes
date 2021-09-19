import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import MusicCard from './components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      albumCover: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    getMusics(id).then((result) => {
      const albumCover = result[0];
      const songs = result.slice(1);// fatia array a partir do indice array
      this.setState({ songs, albumCover });
    });
  }

  render() {
    const { albumCover, songs } = this.state;
    const { artistName, collectionName } = albumCover;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{collectionName}</h3>
        {songs.map((song) => <MusicCard song={ song } key={ song.trackId } />)}
        {/* <MusicCard songs={ songs } /> */}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes
    .arrayOf(PropTypes.object).isRequired,
};

export default Album;
