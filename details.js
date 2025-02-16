// Récupérer les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('image');

// Charger les données JSON
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Trouver l'élément correspondant à l'ID de l'image
        const item = data.find(item => item.id === imageId);
        if (item) {
            // Afficher l'image principale, le titre et la description
            document.getElementById('detail-image').src = item.images[0];
            document.getElementById('detail-title').textContent = item.title;
            document.getElementById('detail-place').textContent = item.place;
            document.getElementById('detail-description').textContent = item.description;
            document.getElementById('detail-customer').textContent = item.customer ? `Maître d'ouvrage : ${item.customer}` : "";
            document.getElementById('detail-prime_contractor').textContent = item.prime_contractor ? `Maître d'oeuvre : ${item.prime_contractor}` : "";
            document.getElementById('detail-creator').textContent = item.creator ? `Concepteur : ${item.creator}` : "";
            document.getElementById('detail-installater').textContent = item.installater ? `Installateur : ${item.installater}` : "";
            document.getElementById('detail-lighting_engineer').textContent = item.lighting_engineer ? `Eclairagiste : ${item.lighting_engineer}` : "";
            document.getElementById('detail-lighting_type').textContent = item.lighting_type;

            // Vérifier si item.images contient plus d'une image
            if (item.images.length > 1) {
                // Créer les miniatures pour chaque image
                const imgSelector = document.getElementById('img-selector');
                imgSelector.innerHTML = ''; // Effacer les miniatures existantes
                item.images.forEach((imgSrc, index) => {
                    // Créer un conteneur pour chaque vignette
                    const thumbnailContainer = document.createElement('div');
                    thumbnailContainer.classList.add('thumbnail-container');

                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    imgElement.alt = `Thumbnail ${index + 1}`;
                    imgElement.classList.add('thumbnail');
                    if (index === 0) {
                        imgElement.classList.add('selected');
                    }
                    imgElement.addEventListener('click', () => {
                        document.querySelector('.thumbnail.selected').classList.remove('selected');
                        imgElement.classList.add('selected');
                        document.getElementById('detail-image').src = imgSrc;
                    });

                    // Ajouter l'image au conteneur
                    thumbnailContainer.appendChild(imgElement);
                    // Ajouter le conteneur au sélecteur d'images
                    imgSelector.appendChild(thumbnailContainer);
                });
            }
        } else {
            console.error('Image ID not found in JSON data:', imageId);
        }
    })
    .catch(error => console.error('Erreur lors du chargement des données JSON:', error));
