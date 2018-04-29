import React from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './../album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 1,
      realTime: "--:--",
      songTime: '',
      // className: "",
      // hoveredState: false
    }

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    // this.onHover = this.onHover.bind(this);
  }

  componentDidMount() {
    const songTime = this.formatTime(this.state.duration);
    this.setState({ songTime })

    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });

        const realTime = this.formatTime(this.state.currentTime);

        this.setState({ realTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  formatTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const getSeconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${getSeconds}`;
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.timeupdate);
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
        const songTime = this.formatTime(song.duration);
        this.setState({ songTime })
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
    const songTime = this.formatTime(newSong.duration);
    this.setState({ songTime })
  }

  handleNextClick() {
    const album = this.state.album;
    const currentIndex = album.songs.findIndex(song => this.state.currentSong === song);
    const nextIndex = currentIndex !== album.songs.length - 1 ? currentIndex + 1 : currentIndex;
    const newSong = album.songs[nextIndex];
    this.setSong(newSong);
    this.play(newSong);
    const songTime = this.formatTime(newSong.duration);
    this.setState({ songTime })
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value / 100;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  // onHover(e, index) {
  //   var buttons = document.getElementsByTagName("BUTTON");
  //   console.log(e.target);
  //
  //
  //   const hoveredState = this.state.hoveredState === false ? true : false;
  //   this.setState({ hoveredState: hoveredState });
  //
  //   const btnClass = this.state.className === "" ? "ion-play" : "";
  //   this.setState({ className: btnClass });
  //
  //   console.log(`onHover executed, index = ${index}`);
  //
  //   className={this.state.isPlaying && song === this.state.currentSong && this.state.currentTime !== this.state.duration ? "ion-pause" : "ion-play"}
  // }

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
                  <td key={index} className="song-actions">
                    <button>
                      <span>
                        <span  className="song-number">{this.state.isPlaying && song === this.state.currentSong ? "" : index + 1}</span>
                        <span  className={this.state.isPlaying && song === this.state.currentSong ? "" : "ion-play"}></span>
                        <span className={this.state.isPlaying && song === this.state.currentSong && this.state.currentTime !== this.state.duration ? ("ion-pause") : ""}></span>
                      </span>
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{this.formatTime(song.duration)}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          handleNextClick={() => this.handleNextClick()}
          handlePrevClick={() => this.handlePrevClick()}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.state.currentVolume}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          realTime={this.state.realTime}
          songTime={this.state.songTime}
        />
      </section>
    )
  }
}

export default Album;
