import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
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
                                this.toggleLiked(song)}
                            className={song.liked
                                ? 'liked'
                                : null}>
                                {song.name}
                            }}
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
