import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { song } = this.props;
    const { trackName, previewUrl } = song;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>

    );
  }
}

MusicCard.propTypes = {
  song: PropTypes
    .objectOf(oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};
export default MusicCard;
