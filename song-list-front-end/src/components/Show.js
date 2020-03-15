import React from 'react'

class Show extends React.Component {
  render () {
    return (
      <>
        <div className="details">
         <h3>Song Info:</h3>
         <hr/>
         <h4> Song: { this.props.song.song } </h4>
         <h6> Album: {this.props.song.album} </h6>
         <h6><span>On Playlist:</span>   { this.props.song.onPlaylist ? 'On Playlist' : 'not on Playlist'} </h6>
         <h6><span>Artist:</span> {this.props.song.artist}</h6>
         <h6><span>Release Date:</span>{this.props.song.relase}</h6>
         <h6><span>Likes:</span> {this.props.song.likes}</h6>
       </div>
      </>
    )
  }
 }
export default Show
