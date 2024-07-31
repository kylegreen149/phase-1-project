// Accesses the DOM to locate form element, calls submit event listener and issues sumbitNewSong function as a callback
document.getElementById("add-songs-form").addEventListener("submit", submitNewSong)

function submitNewSong(event) {
    event.preventDefault() // Prevents page from reloading after form submission
    // Creates object that retrieves the value of each element from the form after submission
    let songObj = {
        link: event.target.link.value,
        name: event.target.name.value,
        artist: event.target.artist.value,
        album: event.target.album.value,
        genre: event.target.genre.value
    }
    showSongs(songObj) // Calls showSongs function to display songs from JSON file
    addNewSong(songObj) // Calls addNewSong which will post the new information after form submission into JSON file
}

// Accesses pre-added songs from JSON file and orders them into a list element by accessing the DOM, and then adds event listeners
// for user interaction
function showSongs(song) {
    let songCard = document.createElement("div")
    songCard.className = "song-card"
    songCard.innerHTML = `
    <br>
    <iframe height="400" width="400" src="${song.link}"></iframe>
    <p style="text-align: center"><b>${song.name}</b></p>
    <p>Artist: ${song.artist}</p>
    <p>Album: ${song.album}</p>
    <p>Genre: ${song.genre}</p>
    <button type="button" class="fiya" id="button1">This song is fiya🔥🔥🔥</button>
    <button type="button" class="mid" id="button2">This song is mid😐😐😐</button>
    <button type="button" class="trash" id="button3">This song is trash🗑️🗑️🗑️</button>
    <br>
    <br>
    ` // Uses innerHTML in order to create HTML elements simultaneously as we access the data from the JSON file

    // Used to access the DOM by gathering ID's in order to create event listeners
    let songsList = document.getElementById("songs-list")
    songsList.appendChild(songCard)

    songCard.querySelector(".fiya").addEventListener("click", () => {
       songCard.style.background = "#068a2f"
       
    })

    songCard.querySelector(".mid").addEventListener("click", () => {
        songCard.style.background = "#735a08" 
    })

    songCard.querySelector(".trash").addEventListener("click", () => {
        songCard.remove(song.id)
        deleteTrashSong(song.id) // Invokes deleteTrashSong function to execute upon click
        
    })

    songCard.addEventListener("mouseover", () => {
        
        songCard.style.color = "#87e1f5" 
    })

    songCard.addEventListener("mouseout", () => {
        songCard.style.color = "#000000"
    })
}

// Issues a GET request to the server to retreive the information from the JSON file
function getSongs() {
    fetch("http://localhost:3000/songs") 
    .then(response => response.json()) 
    .then(songData => songData.forEach(song => showSongs(song)))
}

// Issues a POST request to add data to the JSON file
function addNewSong(songObj) {
    fetch("http://localhost:3000/songs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songObj) // Converts information from form submission into a JSON readable object
    })
    .then(response => response.json())
    .then(song => song)
}

// Issues a DELETE request to remove data from the JSON file with the click of a button
function deleteTrashSong(id) {
    fetch(`http://localhost:3000/songs/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response)
}

// Simply invokes the getSongs function
getSongs()