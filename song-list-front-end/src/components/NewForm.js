import React from 'react'
class NewForm extends React.Component {
  constructor (props) {
  super(props)
  this.state = {
      Song: '',
      Album: '',
      Artist: '',
      Released: 0 ,
      Likes: 0
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
      let response =   await fetch(this.props.baseURL + '/songs', {
          method: 'POST',
          body: JSON.stringify({Song: this.state.Song, Album: this.state.Album, Artist: this.state.Artist, Released: this.state.Released, Likes: this.state.Released}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let data =  await response.json()
          this.props.handleAddSong(data)
          this.setState({
              Song: '',
              Album: '',
              Artist: '',
              Released: 0 ,
              Likes: 0
          })
        }catch(e){
          console.error({'Error': e})
        }
      }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="label" htmlFor="Song">Song</label>
        <input type="text" id="Song" name="Song" onChange={this.handleChange} value={this.state.Song} placeholder="add a song"/>
        <label className="label" htmlFor="name">Album</label>
        <input type="text" id="Album" name="Album" onChange={this.handleChange} value={this.state.Album} placeholder="add an album"/>
        <label className="label" htmlFor="name">Artist</label>
        <input type="text" id="Artist" name="Artist" onChange={this.handleChange} value={this.state.Artist} placeholder="add an artist"/>
        <label className="label" htmlFor="name">Release Date</label>
        <input type="number" id="Released" name="Released" onChange={this.handleChange} value={this.state.Released} placeholder="Release Date"/>
        <label className="label" htmlFor="name">Likes</label>
        <input type="number" id="Likes" name="Likes" onChange={this.handleChange} value={this.state.Likes} />
        <input type="submit" value="Add Your Song"/>
      </form>
    )
  }
}
export default NewForm
