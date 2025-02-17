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
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            if (aspectRatio > 2) {
                gridItem.classList.add('grid-item-large');
            } else if (aspectRatio < 1) {
                gridItem.classList.add('grid-item-tall');
            }
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

