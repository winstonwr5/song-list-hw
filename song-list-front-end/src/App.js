import React from 'react'
import './css/materialize.min.css'
// import NewForm from './components/NewForm.js'
import Show from './components/Show.js'
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
        this.getSongs = this.getSongs.bind(this)
        this.handleAddSong = this.handleAddSong.bind(this)
        this.deleteSong = this.deleteSong.bind(this)
        this.togglePlaylist = this.togglePlaylist.bind(this)
        this.getSong = this.getSong.bind(this)
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
    handleAddSong(song) {
        const copySongs = [song, ...this.state.songs]
        this.setState({
            songs: copySongs,
            song: '',
            album: '',
            artist: '',
            release: 0 ,
            likes: 0
        })
    }
    async deleteSong (id){
         console.log('I made a delete request to here:', `${baseURL}/songs/${id}`)
         try{
         let response = await fetch(baseURL + '/songs/' + id, {
             method: 'DELETE'
         })
         let data = await response.json()
         const foundSong =
           this.state.songs.findIndex(song =>
           song._id === id)
           const copySongs =
           //spread operator copies the array and prevents you from mutating state. this is making a brand new array - and passing by REFERENCE to the original array
            [...this.state.songs]
           //this BELOW will find the holiday and splice it out of the copyHolidays array
           copySongs.splice(foundSong, 1)
           this.setState({songs: copySongs})
     } catch(e){
         console.error(e);
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
     getSong(song) {
         this.setState({song: song})
         console.log(song)
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
