// --- GESTION DU PRELOADER ---
window.addEventListener('load', () => {
    // On bloque le scroll au début
    document.body.classList.add('loading');

    const loader = document.getElementById('preloader');

    // On attend exactement 2 secondes avant de lancer la disparition
    setTimeout(() => {
        loader.classList.add('loader-hidden'); // Lance la transition de fondu
        document.body.classList.remove('loading'); // Libère le scroll
        
        // On retire complètement l'élément du DOM après la transition
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800); 

    }, 2000); // 2 secondes
});


// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#whatsappBtn');
    const fill = document.querySelector('.btn-fill');

    btn.addEventListener('mouseenter', (e) => {
        // Calcul de la position de la souris à l'entrée
        const x = e.pageX - btn.offsetLeft;
        const y = e.pageY - btn.offsetTop;

        // On place le point de départ du remplissage là où est la souris
        fill.style.left = x + 'px';
        fill.style.top = y + 'px';
    });

    btn.addEventListener('mouseleave', (e) => {
        const x = e.pageX - btn.offsetLeft;
        const y = e.pageY - btn.offsetTop;

        // Le remplissage suit la souris quand elle sort
        fill.style.left = x + 'px';
        fill.style.top = y + 'px';
    });
});


// --- HERO SLIDER ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');
    let currentIdx = 0;
    let sliderTimer;
    const intervalTime = 15000; // 15 secondes

    function updateSlider(index) {
        // Gestion des limites
        if (index >= slides.length) currentIdx = 0;
        else if (index < 0) currentIdx = slides.length - 1;
        else currentIdx = index;

        // Reset des classes
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Activation
        slides[currentIdx].classList.add('active');
        if (dots[currentIdx]) dots[currentIdx].classList.add('active');
    }

    function startAutoPlay() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(() => {
            updateSlider(currentIdx + 1);
        }, intervalTime);
    }

    // Événements Flèches
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIdx + 1);
            startAutoPlay(); // Relance le chrono
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIdx - 1);
            startAutoPlay();
        });
    }

    // Événements Points
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateSlider(idx);
            startAutoPlay();
        });
    });

    // Lancement initial
    startAutoPlay();
});



// --- GESTION DE LA MODALE DE CONTACT  ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeModal');
    
    // On sélectionne TOUS les boutons qui doivent ouvrir la modale
    const triggers = [
        document.getElementById('openContactModal'),
        document.getElementById('openContactModal2')
    ];

    // On ajoute l'événement clic à chaque bouton détecté
    triggers.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Fermer la modale
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Libère le scroll
        });
    }

    // Fermer si clic à l'extérieur de la boîte blanche
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});



// Fonction pour l'animation de compteur
const runCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 200; // Plus c'est haut, plus c'est lent
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(runCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Fonction pour détecter le scroll (Reveal effect)
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
            // Si c'est la section stats, on lance le compteur
            if(reveal.classList.contains('stats-grid')) {
                setTimeout(runCounters, 500);
            }
        }
    });
};

window.addEventListener('scroll', scrollReveal);
// Lancer une fois au chargement
scrollReveal();

document.addEventListener('DOMContentLoaded', () => {
    let lastScrollY = window.scrollY;
    const body = document.body;

    // Gestion du scroll pour TopBar et Header
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 10) {
            body.classList.add('at-top');
            body.classList.remove('nav-up', 'nav-down');
        } 
        else if (currentScrollY > lastScrollY) {
            // On descend
            body.classList.add('nav-down');
            body.classList.remove('nav-up', 'at-top');
        } 
        else {
            // On monte
            body.classList.add('nav-up');
            body.classList.remove('nav-down', 'at-top');
        }
        lastScrollY = currentScrollY;
    });

    // Code pour l'effet de remplissage du bouton WhatsApp
    const btn = document.querySelector('#whatsappBtn');
    const fill = document.querySelector('.btn-fill');
    if (btn && fill) {
        btn.addEventListener('mouseenter', (e) => {
            const rect = btn.getBoundingClientRect();
            fill.style.left = (e.clientX - rect.left) + 'px';
            fill.style.top = (e.clientY - rect.top) + 'px';
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation Titre
                if(entry.target.classList.contains('platforms-header-pro')) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
                // Animation Cartes une par une
                if(entry.target.id === 'platformGrid') {
                    const cards = entry.target.querySelectorAll('.p-card-pro');
                    cards.forEach((card, i) => {
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, i * 200);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // Initialisation
    const header = document.querySelector('.platforms-header-pro');
    header.style.opacity = "0";
    header.style.transform = "translateY(30px)";
    header.style.transition = "all 1s ease";
    observer.observe(header);

    const grid = document.getElementById('platformGrid');
    grid.querySelectorAll('.p-card-pro').forEach(c => {
        c.style.opacity = "0";
        c.style.transform = "translateY(50px)";
    });
    observer.observe(grid);
});



document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Si c'est la grille, on anime les cartes avec un délai
                if (entry.target.classList.contains('platforms-grid-2x2')) {
                    const cards = entry.target.querySelectorAll('.reveal-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // On observe le titre et la grille
    observer.observe(document.querySelector('.reveal-title'));
    observer.observe(document.querySelector('.platforms-grid-2x2'));
});



document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openContactModal');
    const closeBtn = document.getElementById('closeModal');

    // Ouvrir
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloque le scroll arrière
    });

    // Fermer
    const closeModalFunc = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Libère le scroll
    };

    closeBtn.addEventListener('click', closeModalFunc);

    // Fermer si clic à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIQUE DU HEADER & TOPBAR ---
    let lastScrollY = window.scrollY;
    const body = document.body;

    if (window.scrollY <= 10) {
        body.classList.add('at-top');
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 10) {
            body.classList.add('at-top');
            body.classList.remove('nav-up', 'nav-down');
        } 
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            body.classList.add('nav-down');
            body.classList.remove('nav-up', 'at-top');
        } 
        else if (currentScrollY < lastScrollY) {
            body.classList.add('nav-up');
            body.classList.remove('nav-down', 'at-top');
        }
        lastScrollY = currentScrollY;
    });


    // --- 2. ANIMATION INTERACTIVE DU BOUTON WHATSAPP ---
    const btnWhatsApp = document.querySelector('#whatsappBtn');
    const fill = document.querySelector('.btn-fill');

    if (btnWhatsApp && fill) {
        const moveFill = (e) => {
            const rect = btnWhatsApp.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            fill.style.left = `${x}px`;
            fill.style.top = `${y}px`;
        };
        btnWhatsApp.addEventListener('mouseenter', moveFill);
        btnWhatsApp.addEventListener('mouseleave', moveFill);
    }


    // --- 3. ENVOI DU FORMULAIRE VIA AJAX (FORMSPREE) ---
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    const btnSubmit = document.querySelector('.btn-submit-static');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche de quitter la page

            // État visuel du bouton pendant l'envoi
            btnSubmit.innerText = "ENVOI EN COURS...";
            btnSubmit.style.opacity = "0.5";
            btnSubmit.disabled = true;

            const formData = new FormData(this);
            const formAction = this.getAttribute('action'); // Récupère mon ID Formspree du HTML

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                // 1. Cacher le formulaire
                contactForm.style.display = 'none';
    
                // 2. Cacher aussi le titre et le sous-titre de la modale pour ne laisser que le message de succès
                const modalHeader = document.querySelector('.modal-header');
                if(modalHeader) modalHeader.style.display = 'none';

                // 3. Montrer le nouveau message de succès
                successMsg.style.display = 'block';

                // 4. Actualisation automatique après 4 secondes
                setTimeout(() => {
                window.location.reload();
                }, 4000);
            } else {
                    // Erreur serveur (Vérifie si ton ID Formspree est activé par mail)
                    alert("Erreur serveur. Assurez-vous d'avoir validé votre compte Formspree par email.");
                    btnSubmit.innerText = "ENVOYER LE MESSAGE";
                    btnSubmit.disabled = false;
                    btnSubmit.style.opacity = "1";
                }
            })
            .catch(error => {
                // Erreur de connexion internet
                alert("Erreur de connexion. Veuillez vérifier votre connexion internet.");
                btnSubmit.innerText = "ENVOYER LE MESSAGE";
                btnSubmit.disabled = false;
                btnSubmit.style.opacity = "1";
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('partnersSlider');
    const btnNext = document.getElementById('nextPartner');
    const btnPrev = document.getElementById('prevPartner');

    // Distance de scroll par clic
    const scrollStep = 220; 

    btnNext.addEventListener('click', () => {
        track.scrollLeft += scrollStep;
        // Retour au début si on arrive à la fin
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            track.scrollLeft = 0;
        }
    });

    btnPrev.addEventListener('click', () => {
        track.scrollLeft -= scrollStep;
    });

    // Optionnel : Défilement automatique toutes les 2 secondes
    let auto = setInterval(() => btnNext.click(), 2000);

    // Pause si la souris est sur les logos
    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => auto = setInterval(() => btnNext.click(), 4000));
});


// --- GESTION DES MODALES LÉGALES ---
document.addEventListener('DOMContentLoaded', () => {
    const legalModal = document.getElementById('legalModal');
    const titleZone = document.getElementById('legalModalTitle');
    const contentZone = document.getElementById('legalModalBody');
    const closeLegal = document.getElementById('closeLegal');

    const legalData = {
        mentions: {
            title: "<h3>Mentions Légales</h3>",
            body: `
                <div class="legal-scroll-area">
                    <p><strong>1. Présentation du site :</strong> En vertu de la loi pour la confiance dans l'économie numérique, il est précisé l'identité des intervenants du site <b><em>i-solutions.ci-portail</em></b> </p>
                    <ul>
                        <li><strong>Propriétaire :</strong> SARL I-Solutions | Capital : 2 000 000 FCFA | NCC : 2245209V</li>
                        <li><strong>Siège social :</strong> Yopougon, Ananeraie, 21 BP 4069 Abidjan 21</li>
                        <li><strong>Responsable de publication & Webmaster :</strong> Diomandé Sékou (sekoudiom@i-solutions.ci)</li>
                        <li><strong>Hébergeur :</strong> MTN – Abidjan Cocody (+225 05 46 46 46 00)</li>
                    </ul><br>
                    <p><strong>2. Propriété intellectuelle :</strong> I-Solutions est propriétaire des droits de propriété intellectuelle sur tous les éléments du site (textes, images, graphismes, logos). Toute reproduction ou adaptation est interdite sans autorisation préalable.</p><br>
                    <p><strong>3. Responsabilité :</strong> I-Solutions s'efforce de fournir des informations précises mais ne saurait être tenu responsable des omissions. L'utilisateur est responsable de son équipement informatique lors de la navigation.</p><br>
                    <p><strong>4. Droit applicable :</strong> Tout litige est soumis au droit en vigueur avec attribution exclusive de juridiction aux tribunaux compétents d'Abidjan.</p>
                </div>
            `
        },
        politique: {
            title: "<h3>Politique de Confidentialité</h3>",
            body: `
                <div class="legal-scroll-area">
                    <p><strong>1. Collecte des données :</strong> Nous collectons vos informations (Nom, Email, Téléphone) uniquement via le formulaire de contact pour répondre à vos demandes.</p><br>
                    <p><strong>2. Finalité :</strong> Ces données servent à la gestion de la relation client, à l'amélioration de la navigation et à des fins de statistiques internes. <strong>I-Solutions ne commercialise aucune donnée personnelle.</strong></p><br>
                    <p><strong>3. Vos droits :</strong> Conformément au <b>RGPD</b> (Règlement Général sur la Protection des Données), vous disposez d'un droit d'accès, de rectification et d'opposition à vos données. Contactez le délégué à la protection des données : <em><b>sekoudiom@i-solutions.ci</b></em></p><br>
                    <p><strong>4. Sécurité :</strong> Vos données sont protégées par des dispositifs standards (chiffrement, pare-feu) pour éviter tout accès non autorisé.</p><br>
                    <p><strong>5. Cookies :</strong> Ce site utilise des cookies pour analyser le trafic. Vous pouvez désactiver leur usage via les paramètres de votre navigateur.</p>
                </div>
            `
        }
    };

    const openLegal = (type) => {
        titleZone.innerHTML = legalData[type].title;
        contentZone.innerHTML = legalData[type].body;
        legalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    document.getElementById('btnMentions').addEventListener('click', (e) => { e.preventDefault(); openLegal('mentions'); });
    document.getElementById('btnPolitique').addEventListener('click', (e) => { e.preventDefault(); openLegal('politique'); });

    closeLegal.addEventListener('click', () => {
        legalModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    const openModalBtn = document.getElementById('openCookieDetail');
    const cookieModal = document.getElementById('cookieModal');
    const closeBtn = document.getElementById('closeCookieModal');

    // 1. GESTION DE L'AFFICHAGE DU BANDEAU
    if (!localStorage.getItem('isolutions_cookies')) {
        setTimeout(() => {
            banner.classList.add('active');
        }, 3000); // Apparaît après le chargement du site
    }

    // 2. ACTIONS DES BOUTONS (STOCKAGE)
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('isolutions_cookies', 'accepted');
        banner.classList.remove('active');
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('isolutions_cookies', 'declined');
        banner.classList.remove('active');
    });

    // 3. GESTION DE LA BOÎTE DE DIALOGUE
    openModalBtn.addEventListener('click', () => {
        cookieModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche le scroll
    });

    closeBtn.addEventListener('click', () => {
        cookieModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fermer la modale si clic en dehors
    window.addEventListener('click', (e) => {
        if (e.target === cookieModal) {
            cookieModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});