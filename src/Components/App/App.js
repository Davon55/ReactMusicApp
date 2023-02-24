import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import Spotify from '../../util/Spotify';



class App extends React.Component {
  constructor(props){
    super(props);

  this.state = {
    searchResults: [],
  playListName: 'My PlayList',
  playListTracks: []
}
//bind methods to this
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
 this.updatePlaylistName = this.updatePlaylistName.bind(this);
 this.savePlaylist = this.savePlaylist.bind(this);
this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playListTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
  }else{
    tracks.push(track);
    this.setState({playListTracks: tracks});
  }
};
   removeTrack(track){
     let tracks = this.state.playListTracks;
     tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
     this.setState({playListTracks: tracks});
   }
 
   // updates the playlist name
   updatePlaylistName(name){
     this.setState({playListName: name});
   }
   //Gets Uri from playListTracks and saves the uri to a users playlist
   savePlaylist(){
    const trackURIs = this.state.playListTracks.map(tracks => tracks.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      });
    });
   }
   search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
   }
  
  render(){
    return (
      <div>
           <h1>Ja<span className="highlight">mmm</span>ing</h1>
           <div className="App">    
             <SearchBar onSearch={this.search} />
           <div className="App-playlist">
             <SearchResults searchResults={this.state.searchResults}
                             onAdd={this.addTrack}
                             />
             <Playlist playListName={this.state.playListName} 
                       playListTracks={this.state.playListTracks}  
                       onSave={this.savePlaylist}
                       onRemove={this.removeTrack} 
                       onNameChange={this.updatePlaylistName}   />
           </div>
           </div>
      </div>
    )
   }
}
export default App;
