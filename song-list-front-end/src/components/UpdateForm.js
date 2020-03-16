import React from 'react'

class UpdateForm extends React.Component {

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
         [...this.state.songs]
         copySongs.splice(foundSongs, 1)
         this.setState({songs: copySongs})
    } catch(e){
        console.error(e);
    }
    }

    async toggleOnPlaylist (song){
        console.log(song)
        try{
            let response = await fetch(baseURL + '/holidays/' + holiday._id), {
                method: 'PUT',
                body: JSON.stringify({celebrated: !holiday.celebrated}),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            let updated = await response.json()
            const foundSong =
              this.state.songs.findIndex(song =>
              song._id === id)
              const copySongs =
               [...this.state.songs]
               copySongs[foundSong].onPlaylist = updatedSong.onPlaylist
               console.log(updatedSong)
               this.setState(songs)
        }catch(e){
            console.error(e)
        }
    }

  render () {
    return (
      <div className="modal edit">
        <form>
          <div className="row">
            <label htmlFor="song">Song</label>
            <input
              type="text"
              id="song"
            />
            <label htmlFor="album">Album</label>
            <input
              type="text"
              id="album"
            />
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              id="artist"
            />
            <label htmlFor="release">Release Date</label>
            <input
              type="number"
              id="release"
            />
            <label htmlFor="likes">Likes</label>
            <input
              type="number"
              id="likes"
            />
            <label htmlFor="onPlaylist">On Playlist</label>
            <input
              type="text"
              id="onPlaylist"
            />
            <input type="submit" value="Update Song" className="button-primary" />
            <button className="updateButton"> Don't Update </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateForm
