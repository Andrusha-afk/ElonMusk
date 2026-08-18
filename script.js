// script.js - Основная логика Mini App "Визитка Илона Маска"

const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// === КОНФИГУРАЦИЯ ===
const CONFIG = {
    phone: "+15551234567",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL5TV-DS0v9f-nKaKtYxDnbXpWB9WtUZ3DAnNgQe4OUuVRJQdhG8g0_BM&s=10",
    appUrl: "https://t.me/ElonMuskCard_bot/ElonMuskCard"
};

// === ПЕРЕВОДЫ ===
const translations = {
    ru: {
        name: "Илон Маск",
        subtitle: "Южноафриканский предприниматель, инженер и долларовый триллионер, государственный, политический и общественный деятель.",
        usefulLinks: "Полезные ссылки", 
        educationPortal: "Просветительный портал", 
        supportFunding: "Поддержка и финансирование", 
        americaEvents: "Афиша Америки",
        socialMedia: "Социальные сети", 
        telegramChannel: "Telegram канал", 
        website: "Сайт",
        availability: "Когда можно писать", 
        workingHours: "Рабочие часы:",
        availabilityText: "Понедельник - Пятница: 9:00 - 18:00<br>Суббота: 10:00 - 15:00<br>Воскресенье: выходной<br><br>⚠️ Не беспокоить после 20:00 и в праздничные дни",
        faq: "Частые вопросы", 
        faq1: "Как связаться для сотрудничества?", 
        faq1Answer: "Вы можете написать мне в Telegram или на email. Лучше всего делать это в рабочие часы.",
        faq2: "Какие проекты вас интересуют?", 
        faq2Answer: "Меня интересуют технологические стартапы, образовательные проекты и социальные инициативы.",
        faq3: "Можно ли заказать консультацию?", 
        faq3Answer: "Да, консультации доступны по предварительной записи. Свяжитесь со мной для обсуждения деталей.",
        shareCard: "Поделиться визиткой", 
        portfolio: "Портфолио", 
        achievements: "Достижения",
        achievement1: "Создал первые в мире ракеты с возвращаемой первой ступенью.", 
        achievement2: "Снизил стоимость доставки грузов на орбиту.", 
        achievement3: "Ускорил переход автопрома на зеленую энергию.",
        contacts: "Контакты для связи", 
        saveContact: "Сохранить контакт", 
        contactHint: "Нажмите, чтобы скопировать номер и открыть создание контакта",
        storiesTitle: "Поделиться в историю", 
        storyCard: "Опубликовать визитку",
        toastCopied: "Номер скопирован! Откройте телефонную книгу для вставки.", 
        toastStory: "Открываем камеру для истории...", 
        toastLink: "Команда скопирована! Вставьте её в чат, чтобы отправить визитку."
    },
    en: {
        name: "Elon Musk",
        subtitle: "South African entrepreneur, engineer, and dollar trillionaire; statesman, politician, and public figure.",
        usefulLinks: "Useful Links", 
        educationPortal: "Educational Portal", 
        supportFunding: "Support & Funding", 
        americaEvents: "America Events",
        socialMedia: "Social Media", 
        telegramChannel: "Telegram Channel", 
        website: "Website",
        availability: "When to Contact", 
        workingHours: "Working Hours:",
        availabilityText: "Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 3:00 PM<br>Sunday: Day off<br><br>⚠️ Do not disturb after 8:00 PM and on holidays",
        faq: "FAQ", 
        faq1: "How to contact for collaboration?", 
        faq1Answer: "You can write to me on Telegram or email. Best to do this during working hours.",
        faq2: "What projects interest you?", 
        faq2Answer: "I'm interested in tech startups, educational projects, and social initiatives.",
        faq3: "Can I order a consultation?", 
        faq3Answer: "Yes, consultations are available by appointment. Contact me to discuss details.",
        shareCard: "Share Business Card", 
        portfolio: "Portfolio", 
        achievements: "Achievements",
        achievement1: "Created the world's first rockets with a reusable first stage.", 
        achievement2: "Reduced the cost of delivering cargo to orbit.", 
        achievement3: "It accelerated the automotive industry's transition to green energy.",
        contacts: "Contact Information", 
        saveContact: "Save Contact", 
        contactHint: "Tap to copy number and open contacts app",
        storiesTitle: "Share to Story", 
        storyCard: "Post Business Card",
        toastCopied: "Number copied! Open phone book to paste.", 
        toastStory: "Opening camera for story...", 
        toastLink: "Command copied! Paste it into a chat to send the card."
    }
};

let currentLang = 'ru';

// === ФУНКЦИИ УПРАВЛЕНИЯ ЯЗЫКОМ ===
function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    document.getElementById('lang-text').textContent = currentLang === 'ru' ? '🇬🇧 EN' : '🇷 RU';
    updateLanguage();
    tg.HapticFeedback?.impactOccurred('light');
}

function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

// === НАВИГАЦИЯ И ССЫЛКИ ===
function openLink(type) {
    const links = { 
        education: 'https://education-portal.com', 
        support: 'https://support-funding.com', 
        events: 'https://america-events.com' 
    };
    if (links[type]) tg.openLink(links[type]);
}

// === АККОРДЕОН FAQ ===
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('span:last-child');
    const isActive = answer.classList.contains('active');
    
    // Закрываем все остальные ответы
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.faq-question span:last-child').forEach(a => a.textContent = '▼');
    
    // Открываем текущий, если он был закрыт
    if (!isActive) { 
        answer.classList.add('active'); 
        arrow.textContent = '▲'; 
    }
    tg.HapticFeedback?.impactOccurred('light');
}

// === СОХРАНЕНИЕ КОНТАКТА (БЕЗОПАСНЫЙ МЕТОД) ===
function safeSaveContact() {
    const phone = CONFIG.phone;
    navigator.clipboard.writeText(phone).then(() => {
        showToast(translations[currentLang].toastCopied);
        setTimeout(() => {
            try { 
                window.location.href = `tel:${phone}`; 
            } catch (e) { 
                console.log("Dialer not supported"); 
            }
        }, 800);
    }).catch(() => {
        window.location.href = `tel:${phone}`;
    });
    tg.HapticFeedback?.notificationOccurred('success');
}

// === ШЕРИНГ В ИСТОРИИ TELEGRAM ===
function shareToStory(type) {
    if (type === 'card') {
        if (tg.shareToStory) {
            tg.shareToStory({
                url: CONFIG.appUrl,
                text: currentLang === 'ru' ? "Визитка Илона Маска" : "Elon Musk Business Card",
                widget_link: { 
                    url: CONFIG.appUrl, 
                    name: currentLang === 'ru' ? "Открыть визитку" : "Open Card" 
                },
                media_url: CONFIG.photoUrl
            });
        } else {
            // Fallback для старых версий Telegram
            shareBusinessCard();
        }
    }
    tg.HapticFeedback?.impactOccurred('medium');
}

// === ШЕРИНГ ВИЗИТКИ ЧЕРЕЗ КОМАНДУ БОТА ===
// Этот метод позволяет отправить красивую карточку с фото и кнопкой
function shareBusinessCard() {
    const userId = tg.initDataUnsafe?.user?.id || 'unknown';
    const shareCommand = `/send_card ${userId}`;
    
    navigator.clipboard.writeText(shareCommand).then(() => {
        showToast(translations[currentLang].toastLink);
        tg.HapticFeedback.notificationOccurred('success');
    }).catch(() => {
        tg.showAlert(currentLang === 'ru' 
            ? 'Скопируйте вручную: /send_card' 
            : 'Copy manually: /send_card');
    });
}

// === ПРОСМОТР ПОРТФОЛИО ===
function viewPortfolio(imageUrl) {
    const modal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageUrl;
    modal.classList.add('active');
    tg.HapticFeedback?.impactOccurred('medium');
}

function closeModal() {
    document.getElementById('portfolioModal').classList.remove('active');
}

// === УВЕДОМЛЕНИЯ (TOAST) ===
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// === ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ===
(function init() {
    // Применяем язык по умолчанию
    updateLanguage();
    
    // Адаптируем тему под настройки Telegram пользователя
    if (tg.themeParams) {
        document.documentElement.style.setProperty('--bg-color', tg.themeParams.bg_color || '#0a0a0a');
        document.documentElement.style.setProperty('--card-bg', tg.themeParams.secondary_bg_color || '#1a1a1a');
    }
    
    // Добавляем тактильный отклик на каждое нажатие
    document.addEventListener('click', () => {
        tg.HapticFeedback?.impactOccurred('light');
    });
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') closeModal(); 
    });
})();