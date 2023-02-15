//Declare an empty variable to hold the users access token
let accessToken;
//Const for client ID and redirect URI
const clientID = '0d37c5d6c523419b800653be7cc4601e';
const redirectURI = "http://localhost:3000/";

//Create a Module as an object
const Spotify = {

    //Method to check if the users access token is set 
    //If the access token is set, return the saved value
    getAccessToken(){

        if(accessToken){
            return accessToken;
        }
        //If access token is not set, check the URL to see if it has been obtained 
        //* Window.location.href gets the URL of the browser
          const accessTokenMatch =  window.location.href.match(/access_token=([^&]*)/);
          const expirationTime = window.location.match(/expires_in=([^&]*)/);
            
        // If acccessToken and the expiration time are in the URL set the following 
          if(accessTokenMatch && expirationTime){

            accessToken = accessTokenMatch[1];
            const expires_in = Number(expirationTime[1]);
        //Clears the parameters from the URL, so the app does not try grabbing the access token after it expires
            window.setTimeout(() => accessToken = '', expires_in * 1000);
            window.history.pushState('Access Token',null, '/');
            return accessToken

          }else{
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location(accessURL);
          }
        },

        search(term){
            const accessToken = Spotify.getAccessToken();
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
             headers: {
                Authorization: `Bearer ${accessToken}`
                     }
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if(!jsonResponse.tracks){
                  return [];
                }
                  return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
                  }));
                });
            },
            
            savePlaylist(name, trackURIs){
              if(!name || !trackURIs.length){
                return;
              }
              const accessToken = Spotify.getAccessToken();
              const headers = {
                Authorization: `Bearer ${accessToken}`
              };
              let userID;
              return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
              ).then(response => response.json()
              ).then(jsonResponse =>{
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                  headers: headers, 
                  method: 'POST',
                 body: JSON.stringify({name: name})        
                }).then(response => response.json()
                ).then(jsonResponse => {
                 const playlistID = jsonResponse.id;
                  return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`),{
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                  })
                })
              })
              
            }
            
          

}

export default Spotify;