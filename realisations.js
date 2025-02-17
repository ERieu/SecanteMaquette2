document.addEventListener('DOMContentLoaded', async function () {
    const gridContainer = document.getElementById('grid-container');
    const yearSelect = document.getElementById('year-select');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-btn');

    let imageData = await fetchData();

    async function fetchData() {
        const cache = localStorage.getItem('imageData');
        if (cache) return JSON.parse(cache);

        try {
            const response = await fetch('data.json');
            const data = await response.json();
            localStorage.setItem('imageData', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Erreur JSON:', error);
            return [];
        }
    }

    function displayImagesByYear(year) {
        gridContainer.innerHTML = '';
        const filteredData = year === 'all' ? imageData : imageData.filter(item => item.year === year);

        const fragment = document.createDocumentFragment();
        filteredData.forEach(item => {
            const gridItem = createGridItem(item);
            fragment.appendChild(gridItem);
        });

        gridContainer.appendChild(fragment);
    }

    function createGridItem(item) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Vérifier que les dimensions existent, sinon définir des valeurs par défaut
        const imgWidth = item.width || 300;
        const imgHeight = item.height || 200;

        // Ajouter un squelette pour éviter le CLS
        const skeleton = document.createElement('div');
        skeleton.classList.add('skeleton');
        skeleton.style.width = imgWidth + 'px';
        skeleton.style.height = imgHeight + 'px';

        gridItem.appendChild(skeleton);

        // Créer l'image
        const img = new Image();
        img.src = item.images[0];
        img.alt = item.title;
        img.dataset.id = item.id;
        img.width = imgWidth;
        img.height = imgHeight;
        img.loading = "lazy";

        img.onload = function () {
            gridItem.removeChild(skeleton); // Supprimer le squelette
            gridItem.appendChild(img);
            adjustGridItemSize(gridItem, img);
        };

        img.onerror = function () {
            img.src = 'icones/image-placeholder.png';
        };

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

    yearSelect.addEventListener('change', () => {
        displayImagesByYear(yearSelect.value);
    });

    displayImagesByYear(yearSelect.value);
});
