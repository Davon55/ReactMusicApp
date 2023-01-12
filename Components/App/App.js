import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';



class App extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    searchResults: [{
    name: 'Donnell',
    artist: 'Don2times',
    album: 'TheDon',
    id: 1
  }],
  playListName: 'My Best Playlist',
  playListTracks: [{
    name: 'Don',
    artist: 'The Done',
    album: 'Don2times',
    id: 2
  }]
}
//bind methods to this
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
 this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
  
  render(){
    return (
      <div>
           <h1>Ja<span className="highlight">mmm</span>ing</h1>
           <div className="App">    
             <SearchBar />
           <div className="App-playlist">
             <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
             <Playlist playListName={this.state.playListName} 
                       playListTracks={this.state.playListTracks} onAdd={this.addTrack} 
                        onRemove={this.removeTrack} 
                       onNameChange={this.updatePlaylistName}   />
           </div>
           </div>
      </div>
    )
   }
}
export default App;
