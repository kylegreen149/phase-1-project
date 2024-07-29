document.getElementById("add-songs-form").addEventListener("submit", submitNewSong)

function submitNewSong(event) {
    event.preventDefault()
    let songObj = {
        link: event.target.link.value,
        name: event.target.name.value,
        artist: event.target.artist.value,
        album: event.target.album.value,
        genre: event.target.genre.value
    }
    showSongs(songObj)
    addNewSong(songObj)
}

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

function addNewSong(songObj) {
    fetch("http://localhost:3000/songs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songObj)
    })
    .then(response => response.json())
    .then(song => song)
}

function initialize() { 
    getSongs()
}
initialize()