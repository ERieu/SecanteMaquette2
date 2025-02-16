document.addEventListener('DOMContentLoaded', async function () {
    const gridContainer = document.getElementById('grid-container');
    const yearSelect = document.getElementById('year-select');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-btn');

    let imageData = await fetchData();

    function fetchData() {
        const cache = localStorage.getItem('imageData');
        if (cache) return Promise.resolve(JSON.parse(cache));

        return fetch('data.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('imageData', JSON.stringify(data));
                return data;
            })
            .catch(error => console.error('Erreur JSON:', error));
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

        setTimeout(adjustGridItemSizes, 50);
    }

    function createGridItem(item) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Réserver l'espace avec une div "squelette"
        gridItem.innerHTML = `
            <div class="skeleton" style="width:${item.width}px; height:${item.height}px"></div>
        `;

        const img = new Image();
        img.src = item.images[0];
        img.alt = item.title;
        img.dataset.id = item.id;
        img.width = item.width;
        img.height = item.height;
        img.loading = "lazy";

        img.onerror = () => {
            img.src = 'icones/image-placeholder.png';
        };

        img.onload = function () {
            gridItem.innerHTML = ''; // Retire le skeleton
            gridItem.appendChild(img);
            adjustGridItemSize(gridItem, img);
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

    function adjustGridItemSizes() {
        document.querySelectorAll('.grid-item img').forEach(img => {
            if (img.complete) {
                adjustGridItemSize(img.closest('.grid-item'), img);
            } else {
                img.onload = () => adjustGridItemSize(img.closest('.grid-item'), img);
            }
        });
    }

    // Délégation d'événement pour éviter d'attacher trop d'écouteurs
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
