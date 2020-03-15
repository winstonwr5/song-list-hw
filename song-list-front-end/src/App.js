import React from 'react'
import './css/materialize.min.css'
let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://localhost:3003'
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            Playlist: null
        }
        this.getSongs= this.getSongs.bind(this)
        this.togglePlaylist = this.togglePlaylist.bind(this)
    }
    componentDidMount(){
        this.getSongs()
    }
    async getSongs() {
        try{
            let response = await fetch(`${baseURL}/songs`)
            let data = await response.json()
            this.setState({songs: data})
        } catch(error){
            console.error(error)
        }
    }
    async togglePlaylist (song){
        console.log(song.Playlist);
        try{
            let response = await fetch(baseURL + '/songs/' + song._id, {
                method: 'PUT',
                body: JSON.stringify({Playlist: !song.Playlist}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let updatedSong = await response.json()
            const foundSong = this.state.songs.findIndex(foundItem => foundItem._id === song._id)
            const copySongs = [...this.state.songs]
            copySongs[foundSong].Playlist = updatedSong.Playlist
            console.log(updatedSong)
            this.setState({songs: copySongs})
        }catch(error){
            console.error(error)
        }
    }
    render() {
        return (
            <div className='container'>
                <h1>SONGS</h1>
                <table className="highlight">
                    <tbody>
                      { this.state.songs.map(song => {
                          return (
                              <tr key={song._id}>
                              <td>Song: {song.Song}</td>
                              <td>Album: {song.Album}</td>
                              <td>Artist: {song.Artist}</td>
                              <td>Released: {song.Released}</td>
                              <td>Likes: {song.Likes}</td>
                              <td  onDoubleClick={() => this.togglePlaylist(song)}>
                                  {song.Playlist ? 'On playlist': 'Not on playlist' }
                              </td>
                              </tr>
                          )
                      })
                  }
                  </tbody>
                  </table>
              </div>
          )
     }
}

export default App;
