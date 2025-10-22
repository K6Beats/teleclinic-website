// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .step, .feature-item, .condition-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add click handlers for condition cards
    const conditionCards = document.querySelectorAll('.condition-card');
    conditionCards.forEach(card => {
        card.addEventListener('click', () => {
            const conditionName = card.querySelector('.condition-name').textContent;
            showConditionModal(conditionName);
        });
    });
});

// Modal functionality for login and consultation
class Modal {
    constructor() {
        this.modals = {};
        this.init();
    }

    init() {
        // Create login modal
        this.createModal('login', {
            title: 'Einloggen',
            content: `
                <form class="modal-form">
                    <div class="form-group">
                        <label for="email">E-Mail</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Passwort</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn-primary">Einloggen</button>
                    <p class="modal-footer-text">Noch kein Konto? <a href="#" class="modal-link">Registrieren</a></p>
                </form>
            `
        });

        // Create consultation modal
        this.createModal('consultation', {
            title: 'Behandlung starten',
            content: `
                <form class="modal-form">
                    <div class="form-group">
                        <label for="consultation-type">Behandlungsart</label>
                        <select id="consultation-type" name="consultation-type" required>
                            <option value="">Behandlungsart auswählen</option>
                            <option value="general">Allgemeinmedizin</option>
                            <option value="cardiology">Kardiologie</option>
                            <option value="mental-health">Psychiatrie</option>
                            <option value="pediatrics">Pädiatrie</option>
                            <option value="dermatology">Dermatologie</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="symptoms">Beschreiben Sie Ihre Symptome</label>
                        <textarea id="symptoms" name="symptoms" rows="4" placeholder="Bitte beschreiben Sie Ihre Symptome..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="preferred-time">Bevorzugte Zeit</label>
                        <select id="preferred-time" name="preferred-time" required>
                            <option value="">Bevorzugte Zeit auswählen</option>
                            <option value="morning">Vormittag (8-12 Uhr)</option>
                            <option value="afternoon">Nachmittag (12-17 Uhr)</option>
                            <option value="evening">Abend (17-21 Uhr)</option>
                            <option value="urgent">Dringend (sofort)</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">Termin buchen</button>
                </form>
            `
        });

        // Add event listeners
        this.addEventListeners();
    }

    createModal(id, options) {
        const modalHTML = `
            <div id="modal-${id}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${options.title}</h2>
                        <span class="modal-close">&times;</span>
                    </div>
                    <div class="modal-body">
                        ${options.content}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modals[id] = document.getElementById(`modal-${id}`);
    }

    addEventListeners() {
        // Login button
        document.querySelector('.btn-login').addEventListener('click', () => {
            this.open('login');
        });

        // Consultation buttons
        document.querySelectorAll('.btn-primary').forEach(btn => {
            if (btn.textContent.includes('Start consultation') || btn.textContent.includes('Book Consultation')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open('consultation');
                });
            }
        });

        // Close modal events
        Object.keys(this.modals).forEach(id => {
            const modal = this.modals[id];
            const closeBtn = modal.querySelector('.modal-close');
            
            closeBtn.addEventListener('click', () => {
                this.close(id);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.close(id);
                }
            });
        });

        // Form submissions
        document.querySelectorAll('.modal-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        });
    }

    open(id) {
        if (this.modals[id]) {
            this.modals[id].style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    close(id) {
        if (this.modals[id]) {
            this.modals[id].style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Wird verarbeitet...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Vielen Dank! Wir werden Sie in Kürze kontaktieren.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Close modal
            const modal = form.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Reset form
            form.reset();
        }, 2000);
    }
}

// Initialize modal system
const modalSystem = new Modal();

// Add modal styles
const modalStyles = `
    .modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #eee;
    }

    .modal-header h2 {
        margin: 0;
        color: #1a1a1a;
        font-size: 1.5rem;
    }

    .modal-close {
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        line-height: 1;
    }

    .modal-close:hover {
        color: #333;
    }

    .modal-body {
        padding: 2rem;
    }

    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.75rem;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #0066FF;
    }

    .modal-footer-text {
        text-align: center;
        color: #666;
        margin-top: 1rem;
    }

    .modal-link {
        color: #0066FF;
        text-decoration: none;
        font-weight: 600;
    }

    .modal-link:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 1rem;
        }
        
        .modal-header,
        .modal-body {
            padding: 1.5rem;
        }
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            margin: 1rem 0;
        }

        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }

        .nav-buttons {
            display: none;
        }
    }
`;

const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyleSheet);

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('+')) {
                counter.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (counter.textContent.includes('/')) {
                counter.textContent = Math.floor(current) + '/7';
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add loading states and error handling
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationStyles;
document.head.appendChild(notificationStyleSheet);

// Condition-specific modal function
function showConditionModal(conditionName) {
    const conditionInfo = {
        'Heuschnupfen': {
            description: 'Allergische Rhinitis verursacht durch Pollen von Bäumen, Gräsern und Unkräutern.',
            symptoms: ['Niesen', 'Laufende Nase', 'Juckende Augen', 'Nasenverstopfung'],
            treatment: 'Antihistaminika, Nasensprays und Allergiemanagement'
        },
        'Durchfall': {
            description: 'Häufige, lockere oder wässrige Stuhlgänge.',
            symptoms: ['Lockere Stühle', 'Bauchkrämpfe', 'Dehydratation', 'Übelkeit'],
            treatment: 'Flüssigkeitsersatz, Ernährungsumstellung und Medikamente bei Bedarf'
        },
        'Übelkeit': {
            description: 'Gefühl von Übelkeit mit Neigung zum Erbrechen.',
            symptoms: ['Übelkeitsgefühl', 'Schwindel', 'Appetitlosigkeit', 'Schwäche'],
            treatment: 'Anti-Übelkeitsmedikamente, Ernährungsumstellung und Ruhe'
        },
        'Coronavirus': {
            description: 'COVID-19-Infektion verursacht durch das SARS-CoV-2-Virus.',
            symptoms: ['Fieber', 'Husten', 'Kurzatmigkeit', 'Verlust von Geschmack/Geruch'],
            treatment: 'Ruhe, Flüssigkeitszufuhr, fiebersenkende Mittel und medizinische Überwachung'
        },
        'Erektionsstörungen': {
            description: 'Schwierigkeiten beim Erreichen oder Aufrechterhalten einer Erektion.',
            symptoms: ['Probleme beim Erreichen einer Erektion', 'Schwierigkeiten beim Aufrechterhalten', 'Reduziertes sexuelles Verlangen'],
            treatment: 'Medikamente, Lebensstiländerungen und psychologische Unterstützung'
        },
        'Burnout': {
            description: 'Körperliche und emotionale Erschöpfung durch chronischen Stress.',
            symptoms: ['Erschöpfung', 'Zynismus', 'Reduzierte Leistung', 'Depression'],
            treatment: 'Stressmanagement, Therapie, Lebensstiländerungen und Ruhe'
        },
        'Blasenentzündung': {
            description: 'Bakterielle Infektion der Harnblase.',
            symptoms: ['Schmerzhaftes Wasserlassen', 'Häufiges Wasserlassen', 'Unterbauchschmerzen', 'Trüber Urin'],
            treatment: 'Antibiotika, erhöhte Flüssigkeitszufuhr und Schmerzlinderung'
        },
        'Verhütung': {
            description: 'Methoden zur Verhinderung einer Schwangerschaft.',
            options: ['Antibabypille', 'Spirale', 'Kondome', 'Hormonpflaster'],
            treatment: 'Beratung für geeignete Verhütungsmethode'
        },
        'Erkältung': {
            description: 'Virusinfektion der oberen Atemwege.',
            symptoms: ['Laufende Nase', 'Halsschmerzen', 'Husten', 'Niesen'],
            treatment: 'Ruhe, Flüssigkeiten, rezeptfreie Medikamente und Symptomlinderung'
        },
        'Gürtelrose': {
            description: 'Schmerzhafter Hautausschlag verursacht durch das Varicella-Zoster-Virus.',
            symptoms: ['Schmerzhafter Hautausschlag', 'Bläschen', 'Brennendes Gefühl', 'Fieber'],
            treatment: 'Antivirale Medikamente, Schmerzlinderung und Hautpflege'
        },
        'Halsschmerzen': {
            description: 'Schmerzen, Kratzen oder Reizung im Hals.',
            symptoms: ['Halsschmerzen', 'Schluckbeschwerden', 'Heiserkeit', 'Geschwollene Drüsen'],
            treatment: 'Ruhe, warme Flüssigkeiten, Halsbonbons und Schmerzlinderung'
        },
        'Nackenschmerzen': {
            description: 'Beschwerden im Bereich der Halswirbelsäule.',
            symptoms: ['Steifer Nacken', 'Muskelverspannungen', 'Kopfschmerzen', 'Eingeschränkte Bewegung'],
            treatment: 'Schmerzlinderung, Physiotherapie, Wärme-/Kältetherapie und Übungen'
        }
    };

    const info = conditionInfo[conditionName];
    if (!info) return;

    const modalContent = `
        <div class="condition-modal-content">
            <h3>${conditionName}</h3>
            <p class="condition-description">${info.description}</p>
            
            ${info.symptoms ? `
                <div class="condition-section">
                    <h4>Symptome:</h4>
                    <ul class="condition-list">
                        ${info.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${info.options ? `
                <div class="condition-section">
                    <h4>Optionen:</h4>
                    <ul class="condition-list">
                        ${info.options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="condition-section">
                <h4>Behandlung:</h4>
                <p>${info.treatment}</p>
            </div>
            
            <div class="condition-actions">
                <button class="btn-primary" onclick="modalSystem.open('consultation')">Behandlung starten</button>
                <button class="btn-secondary" onclick="modalSystem.close('condition')">Schließen</button>
            </div>
        </div>
    `;

    // Create condition modal if it doesn't exist
    if (!document.getElementById('modal-condition')) {
        const modalHTML = `
            <div id="modal-condition" class="modal">
                <div class="modal-content condition-modal">
                    <div class="modal-header">
                        <h2>Krankheitsinformationen</h2>
                        <span class="modal-close">&times;</span>
                    </div>
                    <div class="modal-body">
                        ${modalContent}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        const modal = document.getElementById('modal-condition');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => {
            modalSystem.close('condition');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modalSystem.close('condition');
            }
        });
    } else {
        // Update existing modal content
        const modalBody = document.querySelector('#modal-condition .modal-body');
        modalBody.innerHTML = modalContent;
    }

    modalSystem.open('condition');
}

// Export functions for potential use
window.TeleClinic = {
    showNotification,
    modalSystem,
    showConditionModal
};
