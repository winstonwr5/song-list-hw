import React from 'react'
class NewForm extends React.Component {
  constructor (props) {
  super(props)
  this.state = {
      song: '',
      album: '',
      artist: '',
      release: 0 ,
      likes: 0
  }
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
}
handleChange (event) {
 this.setState({ [event.currentTarget.id]: event.currentTarget.value})
}
async handleSubmit (event) {
    event.preventDefault()
    try{
      let response =   await fetch(this.props.baseURL + '/holidays', {
          method: 'POST',
          body: JSON.stringify({name: this.state.song}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let data =  await response.json()
          this.props.handleAddSong(data)
          this.setState({
              song: '',
              album: '',
              artist: '',
              release: 0 ,
              likes: 0
          })
        }catch(e){
          console.e({'Error': e})
        }
      }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Song</label>
        <input type="text" id="song" name="song" onChange={this.handleChange} value={this.state.song.song} placeholder="add a song"/>
        <label htmlFor="name">Album</label>
        <input type="text" id="album" name="album" onChange={this.handleChange} value={this.state.song.album} placeholder="add an album"/>
        <label htmlFor="name">Artist</label>
        <input type="text" id="artist" name="artist" onChange={this.handleChange} value={this.state.song.artist} placeholder="add an artist"/>
        <label htmlFor="name">Release Date</label>
        <input type="number" id="release" name="release" onChange={this.handleChange} value={this.state.song.release} placeholder="Release Date"/>
        <label htmlFor="name">Likes</label>
        <input type="number" id="likes" name="likes" onChange={this.handleChange} value={this.state.song.likes} />
        <input type="submit" value="Add Your Song"/>
      </form>
    )
  }
}
export default NewForm
