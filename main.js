
//Test fetch for the data
fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log('Error fetching data:', error))

fetch('https://api.artic.edu/api/v1/artworks/89503')
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
    })


const painting = [
    {
        id: "painting",
        title: "Starry Night",
        artist: "Vincent Van Gough",
        description: "A famous painting",
    },
];

//Modal Display when paintings are clicked
function showPaintingDetails(event) {
    const paintingId = event.target.getAttribute("data-id");

    fetch(`https://api.artic.edu/api/v1/artworks/${paintingId}`)
        .then(response => response.json())
        .then(data => {
            const painting = data.data;

            const modal = document.getElementById("modal");
            const modalContent = document.querySelector(".modal-content");
            
            modalContent.innerHTML = `
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <h2>${painting.title}</h2>
                <h3>By ${painting.artist_display}</h3>
                <p>${painting.date_display}</p>
                <p>${painting.main_reference_number}</p>
            `;

            modal.style.display = "block";
    }
)}

//Closes the Modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

//Gets the data from the chicago art API
document.querySelectorAll('gallery__img').forEach(image => {
    image.addEventListener('click', function() {
        const artworkId = this.getAttribute('data-id');

        fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display')
            .then(response => response.json())
            .then(data => {
                const painting = data.data;
                displayModal(painting);
            })
            .catch(error => console.log('Error fetching data:', error));
    });
});

//extra step to close the Modal
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        this.style.display = "none";
    }
});

document.getElementById("modal-close").addEventListener("click", closeModal);

//Randomizes the positioning of all the paintings/artworks
window.onload = () => {
    const paintings = document.querySelectorAll('.gallery figure');

    document.querySelectorAll(".painting").forEach(painting => {
        painting.addEventListener("click", showPaintingDetails);
    });
  
    paintings.forEach(painting => {
      const maxWidth = window.innerWidth - painting.clientWidth - 50;
      const maxHeight = window.innerHeight - painting.clientHeight - 50;
  
      const x = Math.random() * maxWidth;
      const y = Math.random() * maxHeight;
      const scale = Math.random() * (1.5 - 0.8) + 0.8;
  
      painting.style.position = "absolute";
      painting.style.left = `${x}px`;
      painting.style.top = `${y}px`;
    });
  };