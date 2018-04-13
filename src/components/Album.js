import React from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends React.Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false
    }

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play(song) {
    this.audioElement.play(song);
    this.setState({ isPlaying: true });
  }

  pause(song) {
    this.audioElement.pause(song);
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;

    if (this.state.isPlaying && isSameSong) {
      this.pause(song);
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play(song);
    }

  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    const newSong = this.state.album.songs[prevIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  render () {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover art" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column"/>
            <col id="song-title-column"/>
            <col id="song-duration-column"/>
          </colgroup>
          <tbody>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
            {
              this.state.album.songs.map((song, index) =>
                <tr className="song" key={index} onClick={() =>  this.handleSongClick(song)}>
                  <td className="song-actions">
                    <button>
                      <span className="song-number">{index + 1}</span>
                      <span className="ion-play"></span>
                      <span className="ion-pause"></span>
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{song.duration}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          handlePrevClick={() => this.handlePrevClick()}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
        />
      </section>
    )
  }
}

export default Album;
