import React from 'react'
import NewForm from './components/NewForm.js'
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
        }
        this.getSongs = this.getSongs.bind(this)
        this.handleAddSong = this.handleAddSong.bind(this)
        this.deleteSong = this.deleteSong.bind(this)
        this.toggleLiked = this.toggleLiked.bind(this)
        this.getSong = this.getSong.bind(this)
    }
    componentDidMount(){
        this.getSongs()
    }

    async getSongs (){
        try{
            let response = await fetch(`${baseURL}/songs`)
            let data = await response.json()
            this.setState({songs: data})
        } catch (e) {
            console.error(e)
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
     async toggleOnPlaylist (song) {
         console.log(song)
         try{
             let response = await fetch(baseURL + '/songs/' + song._id, {
                 method: 'PUT',
                 body: JSON.stringify({onPlaylist:
                 !song.onPlaylist}),
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             let updatedSong = await response.json()
             const foundSong = this.state.songs.findIndex(foundItem =>
             foundItem._id === song._id)
             const copySongs = [...this.state.songs]
             copySongs[foundSong].onPlaylist = updatedSong.onPlaylist
             console.log(updatedSong)
             this.setState({songs: copySongs})
        }catch(e){
            console.error(e)
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
                <NewForm
                handleAddSong={this.handleAddSong}
                baseURL={baseURL} />

            <table>
                <tbody>
                    {this.state.songs.map(song => {
                        return (
                            <tr key={song._id} onMouseOver={() =>
                                this.getSong(song)}>
                            <td onDoubleClick={() =>
                                this.toggleOnPlaylist(song)}
                            className={song.onPlaylist
                                ? 'On Playlist'
                                : null}>
                                {song.name} :
                                {song.onPlaylist ? 'on your list' : 'not on your list'}</td>
                            <td onClick ={() => {
                                this.deleteSong(song._id)}}>X</td>
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
