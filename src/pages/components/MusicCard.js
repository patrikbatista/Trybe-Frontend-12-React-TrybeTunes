import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { song, handleCheckBox, checked } = this.props;
    const { trackName, previewUrl, trackId } = song;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="labelFavorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            type="checkbox"
            onChange={ handleCheckBox }
            checked={ checked }
          />
        </label>

      </div>

    );
  }
}

MusicCard.propTypes = {
  song: PropTypes
    .objectOf(oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
export default MusicCard;
