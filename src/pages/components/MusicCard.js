import React, { Component } from 'react';
import { Badge, Card } from 'react-bootstrap';
import PropTypes, { oneOfType } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { song, handleCheckBox, checked } = this.props;
    const { trackName, previewUrl, trackNumber, trackId } = song;
    return (
      <Card className="text-center">
        <Card.Header><Badge pill>{trackNumber}</Badge></Card.Header>
        <Card.Body>
          <Card.Title>{trackName}</Card.Title>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </Card.Body>
        <Card.Footer className="text-muted">
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
        </Card.Footer>
      </Card>
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
