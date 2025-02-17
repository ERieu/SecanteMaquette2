// document.addEventListener('DOMContentLoaded', function() {
//     // Charger le fichier JSON
//     fetch('data.json')
//         .then(response => response.json())
//         .then(data => {
//             const gridContainer = document.getElementById('grid-container');
//             const yearSelect = document.getElementById('year-select');

//             // Fonction pour afficher les images en fonction de l'année sélectionnée
//             function displayImagesByYear(year) {
//                 // Vider la grille
//                 gridContainer.innerHTML = '';

//                 // Filtrer les données par année ou afficher toutes les images
//                 const filteredData = year === 'all' ? data : data.filter(item => item.year === year);

//                 // Parcourir les données filtrées et créer les éléments grid-item
//                 filteredData.forEach((item, index) => {
//                     const gridItem = document.createElement('div');
//                     gridItem.classList.add('grid-item');

//                     const img = document.createElement('img');
//                     img.src = item.images[0]; // Utiliser la première image de l'item
//                     img.alt = item.title;
//                     img.dataset.id = item.id;

//                     img.addEventListener('load', function() {
//                         const aspectRatio = img.naturalWidth / img.naturalHeight;
//                         if (aspectRatio > 2) {
//                             // Image en format paysage avec un aspect ratio supérieur à 2:1
//                             gridItem.classList.add('grid-item-large');
//                         } else if (aspectRatio < 1) {
//                             // Image en format portrait avec un aspect ratio inférieur à 1:2
//                             gridItem.classList.add('grid-item-tall');
//                         }
//                     });

//                     gridItem.appendChild(img);

//                     const infos = document.createElement('div');
//                     infos.classList.add('infos');

//                     const title = document.createElement('h2');
//                     title.textContent = item.title;
//                     infos.appendChild(title);

//                     const infosButtons = document.createElement('div');
//                     infosButtons.classList.add('infos-buttons');

//                     const infoBtn = document.createElement('a');
//                     infoBtn.classList.add('info-btn');
//                     infoBtn.href = `details.html?image=${item.id}`;
//                     infoBtn.innerHTML = '<img src="icones/ic--sharp-info-light.png" alt="Info">';
//                     infosButtons.appendChild(infoBtn);

//                     const extendBtn = document.createElement('a');
//                     extendBtn.classList.add('extend-btn');
//                     extendBtn.href = '#';
//                     extendBtn.innerHTML = '<img src="icones/system-uicons--scale-extend-light.png" alt="Extend">';
//                     infosButtons.appendChild(extendBtn);

//                     infos.appendChild(infosButtons);
//                     gridItem.appendChild(infos);
//                     gridContainer.appendChild(gridItem);
//                 });

//                 // Réinitialiser les écouteurs d'événements pour les modales
//                 initModals();
//             }

//             // Afficher les images pour l'année par défaut
//             displayImagesByYear(yearSelect.value);

//             // Ajouter un écouteur d'événements pour le changement d'année
//             yearSelect.addEventListener('change', function() {
//                 const selectedYear = yearSelect.value;
//                 displayImagesByYear(selectedYear);
//             });
//         })
//         .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

//     function initModals() {
//         const modal = document.getElementById('image-modal');
//         const modalImg = document.getElementById('modal-image');
//         const closeModal = document.querySelector('.close-btn');

//         // Gérer le clic sur les boutons des images
//         document.querySelectorAll('.extend-btn').forEach(button => {
//             button.addEventListener('click', function(event) {
//                 event.preventDefault(); // Empêche le comportement par défaut du lien
//                 const imgSrc = event.target.closest('.grid-item').querySelector('img').src;
//                 modalImg.src = imgSrc;
//                 modal.style.display = 'flex';
//             });
//         });

//         // Fermer la modale
//         closeModal.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });

//         // Fermer la modale en cliquant à l'extérieur de l'image
//         modal.addEventListener('click', (e) => {
//             if (e.target === modal) {
//                 modal.style.display = 'none';
//             }
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
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

                    // Ajouter un écouteur d'événement pour le hover
                    attachHoverEvent(gridItem, infosButtons);
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

    function attachHoverEvent(gridItem, infosButtons) {
        gridItem.addEventListener('mouseenter', function() {
            infosButtons.classList.add('no-click');
            setTimeout(() => {
                infosButtons.classList.remove('no-click');
            }, 100); // 100 millisecondes de délai
        });
    }

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
});
