import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

     handleNameChange(e){
       let nameChange = e.target.value
       this.props.onNameChange(nameChange)
    }
    render(){
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} defaultValue={'New PlayList'}/>
                <TrackList tracks={this.props.playListTracks} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
export default Playlist;