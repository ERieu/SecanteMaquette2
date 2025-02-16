document.addEventListener('DOMContentLoaded', function() {
    // Charger le fichier JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const gridContainer = document.getElementById('grid-container');

            // Parcourir les données JSON et créer les éléments grid-item
            data.forEach((item, index) => {
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

            // Initialiser le reste du script pour le slider et les modales
            initSliderAndModals();
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

    function initSliderAndModals() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const closeModal = document.querySelector('.close-btn');

        // Gérer le clic sur les boutons des images
        document.querySelectorAll('.extend-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Empêche le comportement par défaut du lien
                const imgSrc = button.closest('.grid-item').querySelector('img').src;
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

        // Sélectionner les trois premières images de la grille qui ne sont pas dans un élément avec la classe 'infos'
        const gridItems = document.querySelectorAll('.grid-item img:not(.infos img)');
        const slider = document.querySelector('.slider');
        const sliderNav = document.querySelector('.slider-nav');

        // Vider le slider
        slider.innerHTML = '';
        sliderNav.innerHTML = '';

        // Ajouter les trois premières images au slider
        for (let i = 0; i < 3; i++) {
            if (gridItems[i]) { // Vérifiez si l'image existe
                const cloneImg = gridItems[i].cloneNode(true);
                cloneImg.id = `slide-${i + 1}`;
                slider.appendChild(cloneImg);

                const navLink = document.createElement('a');
                navLink.href = `#slide-${i + 1}`;
                sliderNav.appendChild(navLink);
            }
        }

        //auto-slide slider
        const slides = Array.from(slider.querySelectorAll('img'));
        const navLinks = Array.from(sliderNav.querySelectorAll('a'));

        let currentIndex = 0;
        const interval = 3000; // Temps entre chaque défilement (en millisecondes)

        // Fonction pour afficher un slide spécifique
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });

            navLinks.forEach((link, i) => {
                link.style.opacity = i === index ? '1' : '0.5';
            });

            currentIndex = index; // Mettre à jour l'index courant
        }

        // Défilement automatique
        function startSlider() {
            return setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                showSlide(nextIndex);
            }, interval);
        }

        // Gestion des clics sur les liens de navigation
        navLinks.forEach((link, i) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(i);
                clearInterval(sliderInterval); // Stopper le défilement automatique
                sliderInterval = startSlider(); // Redémarrer le slider
            });
        });

        // Initialisation du slider
        slides.forEach((slide, index) => {
            slide.style.position = 'absolute';
            slide.style.width = '100%';
            slide.style.transition = 'transform 0.5s ease-in-out';
        });

        // Démarrer le slider
        let sliderInterval = startSlider();
        showSlide(0); // Afficher le premier slide
    }
});
