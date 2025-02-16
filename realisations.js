/* document.addEventListener('DOMContentLoaded', function() {
    // Charger le fichier JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const gridContainer = document.getElementById('grid-container');
            const yearSelect = document.getElementById('year-select');

            // Fonction pour afficher les images en fonction de l'année sélectionnée
            function displayImagesByYear(year) {
                // Vider la grille
                gridContainer.innerHTML = '';

                // Filtrer les données par année ou afficher toutes les images
                const filteredData = year === 'all' ? data : data.filter(item => item.year === year);

                // Parcourir les données filtrées et créer les éléments grid-item
                filteredData.forEach((item, index) => {
                    const gridItem = document.createElement('div');
                    gridItem.classList.add('grid-item');

                    const img = document.createElement('img');
                    img.src = item.images[0]; // Utiliser la première image de l'item
                    img.alt = item.title;
                    img.dataset.id = item.id;

                    img.addEventListener('load', function() {
                        const aspectRatio = img.naturalWidth / img.naturalHeight;
                        if (aspectRatio > 2) {
                            // Image en format paysage avec un aspect ratio supérieur à 2:1
                            gridItem.classList.add('grid-item-large');
                        } else if (aspectRatio < 1) {
                            // Image en format portrait avec un aspect ratio inférieur à 1:2
                            gridItem.classList.add('grid-item-tall');
                        }
                    });

                    gridItem.appendChild(img);

                    const infos = document.createElement('div');
                    infos.classList.add('infos');

                    const title = document.createElement('h2');
                    title.textContent = item.title;
                    infos.appendChild(title);

                    const infosButtons = document.createElement('div');
                    infosButtons.classList.add('infos-buttons');

                    const infoBtn = document.createElement('a');
                    infoBtn.classList.add('info-btn');
                    infoBtn.href = `details.html?image=${item.id}`;
                    infoBtn.innerHTML = '<img src="icones/ic--sharp-info-light.png" alt="Info">';
                    infosButtons.appendChild(infoBtn);

                    const extendBtn = document.createElement('a');
                    extendBtn.classList.add('extend-btn');
                    extendBtn.href = '#';
                    extendBtn.innerHTML = '<img src="icones/system-uicons--scale-extend-light.png" alt="Extend">';
                    infosButtons.appendChild(extendBtn);

                    infos.appendChild(infosButtons);
                    gridItem.appendChild(infos);
                    gridContainer.appendChild(gridItem);
                });

                // Réinitialiser les écouteurs d'événements pour les modales
                initModals();
            }

            // Afficher les images pour l'année par défaut
            displayImagesByYear(yearSelect.value);

            // Ajouter un écouteur d'événements pour le changement d'année
            yearSelect.addEventListener('change', function() {
                const selectedYear = yearSelect.value;
                displayImagesByYear(selectedYear);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

    function initModals() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const closeModal = document.querySelector('.close-btn');

        // Gérer le clic sur les boutons des images
        document.querySelectorAll('.extend-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Empêche le comportement par défaut du lien
                const imgSrc = event.target.closest('.grid-item').querySelector('img').src;
                modalImg.src = imgSrc;
                modal.style.display = 'flex';
            });
        });

        // Fermer la modale
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Fermer la modale en cliquant à l'extérieur de l'image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}); */

document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');
    const yearSelect = document.getElementById('year-select');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-btn');

    // Charger le fichier JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Fonction pour afficher les images en fonction de l'année sélectionnée
            function displayImagesByYear(year) {
                gridContainer.innerHTML = '';
                const filteredData = year === 'all' ? data : data.filter(item => item.year === year);

                filteredData.forEach(item => {
                    const gridItem = createGridItem(item);
                    gridContainer.appendChild(gridItem);
                });

                // Forcer le recalcul de la taille après le chargement des images
                adjustGridItemSizes();
                initModals();
            }

            // Afficher les images pour l'année par défaut
            displayImagesByYear(yearSelect.value);

            // Ajouter un écouteur d'événements pour le changement d'année
            yearSelect.addEventListener('change', function() {
                displayImagesByYear(yearSelect.value);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

    function createGridItem(item) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const img = document.createElement('img');
        img.src = item.images[0];
        img.alt = item.title;
        img.dataset.id = item.id;
        img.loading = "lazy";

        img.addEventListener('load', function() {
            adjustGridItemSize(gridItem, img);
        });

        img.addEventListener('error', function() {
            console.error('Erreur de chargement de l\'image:', img.src);
        });

        gridItem.innerHTML = `
            <img src="${item.images[0]}" alt="${item.title}" data-id="${item.id}" loading="lazy">
            <div class="infos">
                <h2>${item.title}</h2>
                <div class="infos-buttons">
                    <a class="info-btn" href="details.html?image=${item.id}">
                        <img src="icones/ic--sharp-info-light.png" alt="Info">
                    </a>
                    <a class="extend-btn" href="#">
                        <img src="icones/system-uicons--scale-extend-light.png" alt="Extend">
                    </a>
                </div>
            </div>
        `;

        return gridItem;
    }

    function adjustGridItemSize(gridItem, img) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        if (aspectRatio > 2) {
            gridItem.classList.add('grid-item-large');
        } else if (aspectRatio < 1) {
            gridItem.classList.add('grid-item-tall');
        }
    }

    function adjustGridItemSizes() {
        const images = document.querySelectorAll('.grid-item img');
        images.forEach(img => {
            if (img.complete) {
                adjustGridItemSize(img.closest('.grid-item'), img);
            } else {
                img.addEventListener('load', function() {
                    adjustGridItemSize(img.closest('.grid-item'), img);
                });
            }
        });
    }

    function initModals() {
        document.querySelectorAll('.extend-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const imgSrc = event.target.closest('.grid-item').querySelector('img').src;
                modalImg.src = imgSrc;
                modal.style.display = 'flex';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});