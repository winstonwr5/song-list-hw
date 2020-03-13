import React from 'react'
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
    render() {
        return ()
            <div className='container'>
                <h1>SONGS</h1>
    }
}

export default App;
