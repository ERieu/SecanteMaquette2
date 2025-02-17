document.addEventListener('DOMContentLoaded', async function () {
    const gridContainer = document.getElementById('grid-container');
    const yearSelect = document.getElementById('year-select');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-btn');

    console.log("Grid container trouvé ?", gridContainer);
    console.log("Select année trouvé ?", yearSelect);

    let imageData = await fetchData();

    async function fetchData() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            console.log("Données chargées :", data); // Vérifier si les données sont bien récupérées
            return data;
        } catch (error) {
            console.error('Erreur JSON:', error);
            return [];
        }
    }

    function displayImagesByYear(year) {
        console.log("Affichage des images pour l'année :", year);
        gridContainer.innerHTML = '';

        const filteredData = year === 'all' ? imageData : imageData.filter(item => item.year === year);
        console.log("Images filtrées :", filteredData);

        if (filteredData.length === 0) {
            console.warn("Aucune image trouvée pour cette année.");
        }

        const fragment = document.createDocumentFragment();
        filteredData.forEach(item => {
            const gridItem = createGridItem(item);
            fragment.appendChild(gridItem);
        });

        gridContainer.appendChild(fragment);
    }

    function createGridItem(item) {
        console.log("Création de l'élément pour :", item.title);
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const img = new Image();
        img.src = item.images[0];
        console.log(img.src);
        img.alt = item.title;
        img.dataset.id = item.id;
        img.loading = "lazy";

        img.onload = function () {
            console.log("Image chargée :", img.src);
            gridItem.appendChild(img);
        };

        img.onerror = function () {
            console.error("Erreur de chargement de l'image :", img.src);
            img.src = 'icones/image-placeholder.png';
        };

        return gridItem;
    }

    yearSelect.addEventListener('change', () => {
        displayImagesByYear(yearSelect.value);
    });

    displayImagesByYear(yearSelect.value);
});
