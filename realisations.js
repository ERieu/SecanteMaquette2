/*document.addEventListener('DOMContentLoaded', function() {
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
});*/

document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid-container');
    const yearSelect = document.getElementById('year-select');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-btn');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            function displayImagesByYear(year) {
                gridContainer.innerHTML = ''; // On vide le container
                const filteredData = year === 'all' ? data : data.filter(item => item.year === year);

                // Création d'un fragment pour éviter le reflow/repaint excessif
                const fragment = document.createDocumentFragment();

                filteredData.forEach(item => {
                    const gridItem = createGridItem(item);
                    fragment.appendChild(gridItem);
                });

                gridContainer.appendChild(fragment);

                // On attend le chargement de toutes les images avant d'ajuster leur taille
                setTimeout(adjustGridItemSizes, 100);
            }

            yearSelect.addEventListener('change', () => {
                displayImagesByYear(yearSelect.value);
            });

            displayImagesByYear(yearSelect.value);
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

        // Gestion d'erreur si l'image ne se charge pas
        img.onerror = function () {
            img.src = 'icones/image-placeholder.png'; // Image de secours
        };

        img.onload = function () {
            adjustGridItemSize(gridItem, img);
        };

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('infos');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('infos-buttons');

        const infoBtn = document.createElement('a');
        infoBtn.classList.add('info-btn');
        infoBtn.href = `details.html?image=${item.id}`;
        infoBtn.innerHTML = `<img src="icones/ic--sharp-info-light.png" alt="Info">`;

        const extendBtn = document.createElement('a');
        extendBtn.classList.add('extend-btn');
        extendBtn.href = "#";
        extendBtn.innerHTML = `<img src="icones/system-uicons--scale-extend-light.png" alt="Extend">`;

        buttonsDiv.appendChild(infoBtn);
        buttonsDiv.appendChild(extendBtn);
        infoDiv.appendChild(title);
        infoDiv.appendChild(buttonsDiv);

        gridItem.appendChild(img);
        gridItem.appendChild(infoDiv);

        return gridItem;
    }

    function adjustGridItemSize(gridItem, img) {
        if (!img.naturalWidth || !img.naturalHeight) return;

        const aspectRatio = img.naturalWidth / img.naturalHeight;
        if (aspectRatio > 2) {
            gridItem.classList.add('grid-item-large');
        } else if (aspectRatio < 1) {
            gridItem.classList.add('grid-item-tall');
        }
    }

    function adjustGridItemSizes() {
        document.querySelectorAll('.grid-item img').forEach(img => {
            if (img.complete) {
                adjustGridItemSize(img.closest('.grid-item'), img);
            } else {
                img.onload = () => adjustGridItemSize(img.closest('.grid-item'), img);
            }
        });
    }

    // Délégation d'événement pour les modales (évite d'ajouter des écouteurs multiples)
    gridContainer.addEventListener('click', function (event) {
        const btn = event.target.closest('.extend-btn');
        if (!btn) return;
        event.preventDefault();

        const img = btn.closest('.grid-item').querySelector('img');
        modalImg.src = img.src;
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
