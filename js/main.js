// Declaration for our song values;
let song;
let playSong;

// Spotify Client Credentials
const clientId = 'e27879e1f5e14fa4863b6afc8bc95db3';
const clientSecret = 'YOUR-CLIENT-ID';

// Function to get token from Spotify
const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    const data = await response.json();
    return data.access_token;
}


// Function to search a song

/**
 * @param track
 * @param artist
 * Function gets song from Spotify using track and artist as params
 * and returns the song's preview_url
 */
const searchSong = async (track, artist) => {
    // Get Token
    let token = await getToken();
    
    // Set up the search request to Spotify
    let headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)

    let request = new Request(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track`, {
        method: 'GET',
        headers: headers
    });

    // Make the request to Spotify using fetch
    let response = await fetch(request);
    let data = await response.json();
    console.log(data);

    // Return the preview_url of the first track
    let song = data.tracks.items[0].preview_url;
    return song;
}

