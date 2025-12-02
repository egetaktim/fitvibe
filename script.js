/**
 * FitVibe - Spor Haritası & Rezervasyon Sistemi
 * Professional Mobile App
 */

(function() {
    'use strict';

    // App State
    const App = {
        currentPage: 'home',
        pages: {},
        elements: {},
        init: function() {
            this.cacheElements();
            this.initPages();
            this.bindEvents();
            this.initPWA();
            this.ensureBottomNavVisible();
            console.log('FitVibe App initialized');
        },

        ensureBottomNavVisible: function() {
            const bottomNav = document.querySelector('.bottom-nav');
            if (bottomNav) {
                // Force visibility - position above browser bar (60px from bottom)
                bottomNav.style.display = 'flex';
                bottomNav.style.visibility = 'visible';
                bottomNav.style.opacity = '1';
                bottomNav.style.zIndex = '2147483647';
                bottomNav.style.position = 'fixed';
                bottomNav.style.bottom = '60px';
                bottomNav.style.height = 'auto';
                
                // Double check it's visible after a short delay
                setTimeout(() => {
                    const rect = bottomNav.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    console.log('Bottom nav rect:', rect);
                    console.log('Viewport height:', viewportHeight);
                    
                    // If nav is not visible, adjust
                    if (rect.top > viewportHeight - 50) {
                        const newBottom = Math.max(60, viewportHeight - rect.height - 20);
                        bottomNav.style.bottom = `${newBottom}px`;
                        console.log('Adjusted bottom nav to:', newBottom);
                    }
                }, 300);
            }
        },

        cacheElements: function() {
            this.elements = {
                appContent: document.getElementById('appContent'),
                appHeader: document.querySelector('.app-header'),
                navItems: document.querySelectorAll('.nav-item'),
                homePage: document.getElementById('homePage'),
                profilePage: document.getElementById('profilePage'),
                mapPage: document.getElementById('mapPage'),
                messagesPage: document.getElementById('messagesPage'),
                teamPage: document.getElementById('teamPage'),
                profileIcon: document.querySelector('.profile-icon-wrapper[data-action="profile"]'),
                actionCards: document.querySelectorAll('.main-action-card'),
                activityCards: document.querySelectorAll('.activity-card')
            };
        },

        initPages: function() {
            this.pages = {
                home: this.elements.homePage,
                profile: this.elements.profilePage,
                map: this.elements.mapPage,
                messages: this.elements.messagesPage,
                team: this.elements.teamPage
            };
        },

        showPage: function(pageName) {
            if (!this.pages[pageName]) {
                console.error('Page not found:', pageName);
                return;
            }

            // Hide all pages with fade out
            Object.keys(this.pages).forEach(key => {
                const page = this.pages[key];
                if (page) {
                    page.style.opacity = '0';
                    page.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        page.style.display = 'none';
                    }, 150);
                }
            });

            // Show selected page with fade in
            setTimeout(() => {
                const targetPage = this.pages[pageName];
                if (targetPage) {
                    targetPage.style.display = 'block';
                    setTimeout(() => {
                        targetPage.style.opacity = '1';
                        targetPage.style.transform = 'translateY(0)';
                    }, 10);
                }

                // Show/hide header
                if (this.elements.appHeader) {
                    if (pageName === 'home') {
                        this.elements.appHeader.style.display = 'block';
                        this.elements.appHeader.style.opacity = '1';
                    } else {
                        this.elements.appHeader.style.opacity = '0';
                        setTimeout(() => {
                            this.elements.appHeader.style.display = 'none';
                        }, 200);
                    }
                }

                this.currentPage = pageName;
            }, 150);
        },

        updateNavigation: function(activePage) {
            this.elements.navItems.forEach(nav => {
                nav.classList.remove('active');
            });
            const activeNav = document.querySelector(`.nav-item[data-page="${activePage}"]`);
            if (activeNav) {
                activeNav.classList.add('active');
            }
        },

        bindEvents: function() {
            // Navigation items
            this.elements.navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = item.getAttribute('data-page');
                    if (page && page !== this.currentPage) {
                        this.showPage(page);
                        this.updateNavigation(page);
                    }
                });
            });

            // Profile icon
            if (this.elements.profileIcon) {
                this.elements.profileIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showPage('profile');
                    this.updateNavigation('profile');
                });
            }

            // Settings icon
            const settingsIcon = document.querySelector('.settings-icon');
            if (settingsIcon) {
                settingsIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleMenuAction('Ayarlar');
                });
            }

            // Action cards
            this.elements.actionCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = card.getAttribute('data-action');
                    this.handleAction(action);
                });
            });

            // Activity cards
            this.elements.activityCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const activityId = card.getAttribute('data-activity');
                    this.showActivityDetails(activityId);
                });
            });

            // Facility cards
            const facilityCards = document.querySelectorAll('.facility-card');
            facilityCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('reserve-btn')) {
                        const facilityId = card.getAttribute('data-facility');
                        this.showFacilityDetails(facilityId);
                    }
                });
            });

            // Reserve buttons
            const reserveButtons = document.querySelectorAll('.reserve-btn');
            reserveButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!btn.disabled) {
                        const facilityId = btn.getAttribute('data-facility');
                        this.showReservationModal(facilityId);
                    }
                });
            });

            // Filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.getAttribute('data-filter');
                    this.filterFacilities(filter);
                });
            });

            // Map view buttons
            const mapViewButtons = document.querySelectorAll('.map-view-btn');
            mapViewButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const facilityItem = btn.closest('.map-facility-item');
                    const facilityType = facilityItem.getAttribute('data-type');
                    this.showFacilityByType(facilityType);
                });
            });

            // Map facility items
            const mapFacilityItems = document.querySelectorAll('.map-facility-item');
            mapFacilityItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('map-view-btn')) {
                        const facilityType = item.getAttribute('data-type');
                        this.showFacilityByType(facilityType);
                    }
                });
            });

            // Team action buttons
            const teamButtons = document.querySelectorAll('.team-action-btn');
            teamButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = btn.getAttribute('data-action');
                    this.handleTeamAction(action);
                });
            });

            // Menu items
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const menuText = item.querySelector('.menu-text').textContent;
                    this.handleMenuAction(menuText);
                });
            });

            // Message items
            const messageItems = document.querySelectorAll('.message-item');
            messageItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const messageId = item.getAttribute('data-message');
                    this.showMessageDetails(messageId);
                });
            });

            // See all button
            const seeAllBtn = document.querySelector('.see-all[data-action="view-all-facilities"]');
            if (seeAllBtn) {
                seeAllBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showPage('map');
                    this.updateNavigation('map');
                });
            }

            // Quick action cards
            const quickActionCards = document.querySelectorAll('.quick-action-card');
            quickActionCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = card.getAttribute('data-action');
                    this.handleQuickAction(action);
                });
            });

            // Close modal on overlay click
            document.addEventListener('click', (e) => {
                const modalOverlay = document.querySelector('.modal-overlay');
                if (modalOverlay && e.target === modalOverlay) {
                    this.closeModal();
                }
            });

            // Close modal on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            });
        },

        handleAction: function(action) {
            switch(action) {
                case 'reservation':
                    this.showPage('map');
                    this.updateNavigation('map');
                    break;
                case 'find':
                    this.showPage('team');
                    this.updateNavigation('team');
                    break;
                case 'equipment':
                    this.showNotification('Ekipman kiralama özelliği yakında eklenecek!');
                    break;
                default:
                    console.log('Unknown action:', action);
            }
        },

        handleQuickAction: function(action) {
            switch(action) {
                case 'equipment':
                    this.showModal('Ekipman Kiralama', `
                        <div class="modal-content">
                            <p class="modal-description">Bisiklet, spor ekipmanları ve daha fazlasını kiralayabilirsiniz.</p>
                            <div class="modal-form">
                                <label>Ekipman Türü</label>
                                <select class="modal-input">
                                    <option>Bisiklet</option>
                                    <option>Tenis Raketi</option>
                                    <option>Futbol Topu</option>
                                    <option>Basketbol Topu</option>
                                    <option>Yüzme Malzemeleri</option>
                                </select>
                                <label>Süre</label>
                                <select class="modal-input">
                                    <option>1 saat</option>
                                    <option>2 saat</option>
                                    <option>Yarım gün</option>
                                    <option>Tam gün</option>
                                </select>
                                <button class="modal-submit-btn" data-action="start-search">Kirala</button>
                            </div>
                        </div>
                    `);
                    break;
                case 'lessons':
                    this.showModal('Online Dersler', `
                        <div class="modal-content">
                            <p class="modal-description">Uzman antrenörlerden online dersler alabilirsiniz.</p>
                            <div class="modal-form">
                                <label>Spor Dalı</label>
                                <select class="modal-input">
                                    <option>Fitness</option>
                                    <option>Yoga</option>
                                    <option>Pilates</option>
                                    <option>Kardiyovasküler</option>
                                    <option>Güç Antrenmanı</option>
                                </select>
                                <label>Ders Süresi</label>
                                <select class="modal-input">
                                    <option>30 dakika</option>
                                    <option>45 dakika</option>
                                    <option>60 dakika</option>
                                </select>
                                <button class="modal-submit-btn" data-action="start-search">Ders Ara</button>
                            </div>
                        </div>
                    `);
                    break;
                case 'events':
                    this.showPage('map');
                    this.updateNavigation('map');
                    this.showNotification('Yakınındaki etkinlikler haritada gösteriliyor');
                    break;
            }
        },

        showNotification: function(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            if (type === 'success') {
                notification.style.background = 'rgba(16, 185, 129, 0.95)';
            } else if (type === 'error') {
                notification.style.background = 'rgba(239, 68, 68, 0.95)';
            }
            document.body.appendChild(notification);

            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);

            // Hide notification
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        },

        showReservationModal: function(facilityId) {
            const facilities = {
                '1': { name: 'Merkez Futbol Sahası', price: '₺150', duration: 'saat' },
                '2': { name: 'Kordon Koşu Yolu', price: 'Ücretsiz', duration: '' },
                '4': { name: 'İndoor Tırmanış Duvarı', price: '₺200', duration: 'saat' },
                '5': { name: 'Basketbol Sahası', price: '₺120', duration: 'saat' },
                '6': { name: 'Olimpik Yüzme Havuzu', price: '₺180', duration: 'saat' },
                '7': { name: 'Tenis Kortları', price: '₺160', duration: 'saat' },
                '8': { name: 'Fitness & Pilates Salonu', price: '₺250', duration: 'ay' }
            };

            const facility = facilities[facilityId] || { name: 'Tesis', price: '₺100', duration: 'saat' };
            this.showModal('Rezervasyon', `
                <div class="modal-content">
                    <h3>${facility.name}</h3>
                    <p class="modal-price">Fiyat: ${facility.price}${facility.duration ? '/' + facility.duration : ''}</p>
                    <div class="modal-form">
                        <label>Tarih Seçin</label>
                        <input type="date" class="modal-input" id="reservationDate" min="${new Date().toISOString().split('T')[0]}">
                        <label>Saat Seçin</label>
                        <select class="modal-input" id="reservationTime">
                            <option>09:00</option>
                            <option>10:00</option>
                            <option>11:00</option>
                            <option>12:00</option>
                            <option>13:00</option>
                            <option>14:00</option>
                            <option>15:00</option>
                            <option>16:00</option>
                            <option>17:00</option>
                            <option>18:00</option>
                            <option>19:00</option>
                            <option>20:00</option>
                        </select>
                        <label>Süre (saat)</label>
                        <select class="modal-input" id="reservationDuration">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <button class="modal-submit-btn" data-action="confirm-reservation" data-facility="${facilityId}">Rezervasyon Yap</button>
                    </div>
                </div>
            `);
        },

        confirmReservation: function(facilityId) {
            const date = document.getElementById('reservationDate').value;
            const time = document.getElementById('reservationTime').value;
            const duration = document.getElementById('reservationDuration').value;

            if (!date || !time) {
                this.showNotification('Lütfen tarih ve saat seçin!', 'error');
                return;
            }

            this.closeModal();
            this.showNotification('Rezervasyon başarıyla oluşturuldu! ✅', 'success');
            
            // Update activity list
            setTimeout(() => {
                this.addActivityToList({
                    type: 'Rezervasyon',
                    facility: 'Tesis',
                    date: date,
                    time: time
                });
            }, 500);
        },

        addActivityToList: function(activity) {
            const activitiesScroll = document.querySelector('.activities-scroll');
            if (activitiesScroll) {
                const newCard = document.createElement('div');
                newCard.className = 'activity-card';
                newCard.innerHTML = `
                    <div class="activity-map">🗺️</div>
                    <div class="activity-info">
                        <div class="activity-item">
                            <span class="activity-label">${activity.type}:</span>
                            <span class="activity-value">${activity.facility}</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-label">Tarih:</span>
                            <span class="activity-value">${activity.date} ${activity.time}</span>
                        </div>
                    </div>
                `;
                activitiesScroll.insertBefore(newCard, activitiesScroll.firstChild);
            }
        },

        showFacilityDetails: function(facilityId) {
            const facilities = {
                '1': { 
                    name: 'Merkez Futbol Sahası', 
                    details: 'Profesyonel çim saha, aydınlatma, soyunma odaları, duşlar mevcut.',
                    features: ['Çim zemin', 'Aydınlatma', 'Soyunma odası', 'Duş', 'Park yeri'],
                    rating: 4.8,
                    reviews: 124
                },
                '2': { 
                    name: 'Kordon Koşu Yolu', 
                    details: '5 km uzunluğunda, deniz manzaralı, güvenli koşu parkuru.',
                    features: ['5 km uzunluk', 'Deniz manzarası', 'Güvenli', 'Aydınlatma'],
                    rating: 4.9,
                    reviews: 89
                },
                '4': { 
                    name: 'İndoor Tırmanış Duvarı', 
                    details: '12 metre yükseklik, profesyonel ekipman, eğitmen desteği.',
                    features: ['12m yükseklik', 'Ekipman', 'Eğitmen', 'Güvenlik'],
                    rating: 4.6,
                    reviews: 67
                },
                '5': { 
                    name: 'Basketbol Sahası', 
                    details: 'Açık hava, parke zemin, aydınlatma, fileler mevcut.',
                    features: ['Açık hava', 'Parke zemin', 'Aydınlatma', 'Fileler'],
                    rating: 4.9,
                    reviews: 156
                },
                '6': { 
                    name: 'Olimpik Yüzme Havuzu', 
                    details: '50 metre olimpik havuz, ısıtmalı su, profesyonel eğitmenler.',
                    features: ['50m Havuz', 'Isıtmalı', 'Eğitmen', 'Duş', 'Soyunma'],
                    rating: 4.9,
                    reviews: 203
                },
                '7': { 
                    name: 'Tenis Kortları', 
                    details: '4 adet profesyonel tenis kortu, aydınlatma, ekipman kiralama.',
                    features: ['4 Kort', 'Aydınlatma', 'Ekipman', 'Park yeri'],
                    rating: 4.7,
                    reviews: 98
                },
                '8': { 
                    name: 'Fitness & Pilates Salonu', 
                    details: 'Modern fitness ekipmanları, grup dersleri, kişisel antrenör hizmeti.',
                    features: ['Modern Ekipman', 'Grup Dersleri', 'Kişisel Antrenör', 'Duş'],
                    rating: 4.8,
                    reviews: 167
                }
            };

            const facility = facilities[facilityId] || facilities['1'];
            this.showModal('Tesis Detayları', `
                <div class="modal-content">
                    <h3>${facility.name}</h3>
                    <div class="modal-rating">
                        <span>⭐ ${facility.rating}</span>
                        <span>(${facility.reviews} değerlendirme)</span>
                    </div>
                    <p class="modal-description">${facility.details}</p>
                    <div class="modal-features">
                        <h4>Özellikler:</h4>
                        <ul>
                            ${facility.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="modal-submit-btn" data-action="show-reservation" data-facility="${facilityId}">Rezervasyon Yap</button>
                </div>
            `);
        },

        showActivityDetails: function(activityId) {
            const activities = {
                '1': { title: 'Koşu Parkuru & Basketbol Maçı', details: 'Sabah koşu yapıp akşam basketbol maçına katılacaksınız.' },
                '2': { title: 'Futbol Antrenmanı', details: 'Merkez Stad\'da futbol antrenmanı yapılacak.' },
                '3': { title: 'Yoga Dersi', details: 'Online yoga dersi, rahat kıyafetlerle katılın.' },
                '4': { title: 'Tenis Maçı', details: 'Kort 3\'te tenis maçı yapılacak.' }
            };

            const activity = activities[activityId] || activities['1'];
            this.showModal('Aktivite Detayları', `
                <div class="modal-content">
                    <h3>${activity.title}</h3>
                    <p class="modal-description">${activity.details}</p>
                    <div class="modal-actions">
                        <button class="modal-submit-btn" data-action="view-activity-details">Detayları Gör</button>
                        <button class="modal-cancel-btn" data-action="close-modal">Kapat</button>
                    </div>
                </div>
            `);
        },

        showMessageDetails: function(messageId) {
            const messages = {
                '1': { name: 'Mehmet Kaya', time: '14:30', content: 'Merhaba! Yarın maç için hazır mısın? Saat 19:00\'da buluşalım.' },
                '2': { name: 'Ayşe Demir', time: '12:15', content: 'Rezervasyonun onaylandı! Tarih: 15 Aralık, Saat: 18:00' },
                '3': { name: 'Takım Alpha', time: 'Dün', content: 'Yarın maç var, katılır mısın? Eksik oyuncumuz var.' },
                '4': { name: 'Can Özkan', time: 'Dün', content: 'Ekipman kiralama hakkında soru var. Bisiklet kiralayabilir miyim?' },
                '5': { name: 'Zeynep Yıldız', time: '2 gün önce', content: 'Antrenör buldum, tanışmak ister misin? Çok iyi referansları var.' }
            };

            const message = messages[messageId] || messages['1'];
            this.showModal('Mesaj', `
                <div class="modal-content">
                    <div class="message-header-modal">
                        <div class="message-avatar">👤</div>
                        <div>
                            <h3>${message.name}</h3>
                            <p class="message-time-modal">${message.time}</p>
                        </div>
                    </div>
                    <div class="message-content-modal">
                        <p>${message.content}</p>
                    </div>
                    <div class="modal-actions">
                        <button class="modal-submit-btn" data-action="reply-message">Yanıtla</button>
                        <button class="modal-cancel-btn" data-action="close-modal">Kapat</button>
                    </div>
                </div>
            `);
        },

        handleTeamAction: function(action) {
            const actions = {
                'find-teammate': {
                    title: 'Takım Arkadaşı Ara',
                    description: 'Seviyene uygun takım arkadaşı bulmak için filtreleri doldur.',
                    fields: ['Spor dalı', 'Seviye', 'Konum']
                },
                'find-opponent': {
                    title: 'Rakip Takım Bul',
                    description: 'Maç yapmak için rakip takım bul.',
                    fields: ['Spor dalı', 'Takım seviyesi', 'Tarih tercihi']
                },
                'find-trainer': {
                    title: 'Antrenör Bul',
                    description: 'Online veya yüz yüze ders almak için antrenör bul.',
                    fields: ['Spor dalı', 'Ders tipi', 'Bütçe']
                },
                'find-opponent-individual': {
                    title: 'Rakip Bul',
                    description: 'Bireysel spor için rakip bul (tenis, badminton vb.)',
                    fields: ['Spor dalı', 'Seviye', 'Tarih']
                }
            };

            const actionData = actions[action] || actions['find-teammate'];
            this.showModal(actionData.title, `
                <div class="modal-content">
                    <p class="modal-description">${actionData.description}</p>
                    <div class="modal-form">
                        ${actionData.fields.map((field, index) => `
                            <label>${field}</label>
                            <select class="modal-input" id="field${index}">
                                <option>Seçiniz...</option>
                            </select>
                        `).join('')}
                        <button class="modal-submit-btn" data-action="start-search">Ara</button>
                    </div>
                </div>
            `);
        },

        handleMenuAction: function(menuText) {
            const actions = {
                'Rezervasyonlarım': () => {
                    this.showModal('Rezervasyonlarım', `
                        <div class="modal-content">
                            <div class="reservation-list">
                                <div class="reservation-item">
                                    <h4>Merkez Futbol Sahası</h4>
                                    <p>15 Aralık 2024 - 18:00</p>
                                    <span class="status-badge available">Onaylandı</span>
                                </div>
                                <div class="reservation-item">
                                    <h4>Basketbol Sahası</h4>
                                    <p>16 Aralık 2024 - 19:00</p>
                                    <span class="status-badge available">Onaylandı</span>
                                </div>
                            </div>
                        </div>
                    `);
                },
                'Değerlendirmelerim': () => {
                    this.showModal('Değerlendirmelerim', `
                        <div class="modal-content">
                            <div class="review-list">
                                <div class="review-item">
                                    <h4>Merkez Futbol Sahası</h4>
                                    <div class="review-stars">⭐⭐⭐⭐⭐</div>
                                    <p>Harika bir saha, çok memnun kaldım!</p>
                                </div>
                                <div class="review-item">
                                    <h4>Basketbol Sahası</h4>
                                    <div class="review-stars">⭐⭐⭐⭐⭐</div>
                                    <p>Parke zemin çok kaliteli, tekrar geleceğim.</p>
                                </div>
                            </div>
                        </div>
                    `);
                },
                'Ayarlar': () => {
                    this.showModal('Ayarlar', `
                        <div class="modal-content">
                            <div class="settings-list">
                                <div class="setting-item">
                                    <span>Bildirimler</span>
                                    <input type="checkbox" checked>
                                </div>
                                <div class="setting-item">
                                    <span>Konum Paylaşımı</span>
                                    <input type="checkbox" checked>
                                </div>
                                <div class="setting-item">
                                    <span>Karanlık Mod</span>
                                    <input type="checkbox">
                                </div>
                            </div>
                        </div>
                    `);
                },
                'Hakkında': () => {
                    this.showModal('Hakkında', `
                        <div class="modal-content">
                            <h3>FitVibe v1.0.0</h3>
                            <p class="modal-description">
                                FitVibe, spor tesislerini keşfetmenizi, rezervasyon yapmanızı ve 
                                spor arkadaşları bulmanızı sağlayan kapsamlı bir platformdur.
                            </p>
                            <p class="modal-description">
                                © 2024 FitVibe. Tüm hakları saklıdır.
                            </p>
                        </div>
                    `);
                }
            };

            if (actions[menuText]) {
                actions[menuText]();
            }
        },

        filterFacilities: function(filter) {
            const facilityItems = document.querySelectorAll('.map-facility-item');
            facilityItems.forEach(item => {
                const type = item.getAttribute('data-type');
                if (filter === 'all' || type === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            this.showNotification(`${filter === 'all' ? 'Tüm' : filter} tesisleri gösteriliyor`);
        },

        showFacilityByType: function(type) {
            const facilityMap = {
                'football': '1',
                'basketball': '5',
                'running': '2',
                'cycling': '3',
                'climbing': '4'
            };
            const facilityId = facilityMap[type];
            if (facilityId) {
                this.showFacilityDetails(facilityId);
            }
        },

        showModal: function(title, content) {
            // Remove existing modal
            const existingModal = document.querySelector('.modal-overlay');
            if (existingModal) {
                existingModal.remove();
            }

            // Create modal
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                    <div class="modal">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close" data-action="close-modal">×</button>
                    </div>
                    ${content}
                </div>
            `;
            document.body.appendChild(modal);

            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';

            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);

            // Add click events to all modal buttons
            setTimeout(() => {
                const closeBtn = modal.querySelector('.modal-close, [data-action="close-modal"]');
                if (closeBtn) {
                    closeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.closeModal();
                    });
                }

                // Handle modal submit buttons
                const submitBtns = modal.querySelectorAll('[data-action]');
                submitBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const action = btn.getAttribute('data-action');
                        const facilityId = btn.getAttribute('data-facility');
                        
                        switch(action) {
                            case 'close-modal':
                                this.closeModal();
                                break;
                            case 'confirm-reservation':
                                this.confirmReservation(facilityId);
                                break;
                            case 'show-reservation':
                                this.closeModal();
                                setTimeout(() => {
                                    this.showReservationModal(facilityId);
                                }, 300);
                                break;
                            case 'view-activity-details':
                                this.showNotification('Aktivite detayları gösteriliyor...');
                                break;
                            case 'reply-message':
                                this.showNotification('Mesaj gönderiliyor...');
                                break;
                            case 'start-search':
                                this.showNotification('Arama başlatılıyor...', 'success');
                                break;
                        }
                    });
                });
            }, 50);
        },

        closeModal: function() {
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.classList.remove('show');
                // Restore body scroll
                document.body.style.overflow = '';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.remove();
                    }
                }, 300);
            }
        },

        initPWA: function() {
            // Service Worker Registration
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js')
                        .then(registration => {
                            console.log('Service Worker registered:', registration);
                        })
                        .catch(error => {
                            console.log('Service Worker registration failed:', error);
                        });
                });
            }

            // PWA Install Prompt
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                console.log('PWA install prompt available');
            });
        }
    };

    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }

    // Smooth scrolling
    if (document.getElementById('appContent')) {
        document.getElementById('appContent').style.scrollBehavior = 'smooth';
    }
})();
