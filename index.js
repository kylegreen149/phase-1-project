function showSongs(song) {
    let songCard = document.createElement("li")
    songCard.className = "song-card"
    songCard.innerHTML = `
    <iframe height="400" width="400" src="${song.link}"></iframe>
    <p style="text-align: center"><b>${song.name}</b></p>
    <p>Artist: ${song.artist}</p>
    <p>Album: ${song.album}</p>
    <p>Genre: ${song.genre}</p>
    <button type="button">This song is fiya🔥🔥🔥</button>
    <button type="button">This song is mid😐😐😐</button>
    <button type="button">This song is trash🗑️🗑️🗑️</button>
    `
    
    let songsList = document.getElementById("songs-list")
    songsList.appendChild(songCard)

}


function getSongs() {
    fetch("http://localhost:3000/songs")
    .then(response => response.json())
    .then(songData => songData.forEach(song => showSongs(song)))
    
}

function initialize() { // Do I need this function??
    // songs.forEach(song => showSongs(song))
    getSongs()
}
initialize()