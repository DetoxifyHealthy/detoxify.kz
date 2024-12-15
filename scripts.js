// Смена темы
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// Прокрутка для добавления стилей к шапке
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Смена языка
const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        langButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        alert(`Язык переключен на: ${button.textContent}`);
    });
});
// Таймер обратного отсчёта
const countdown = () => {
    // Дата окончания акции
    const endDate = new Date("2024-12-30T23:59:59").getTime();
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    // Если время истекло
    if (timeLeft <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    // Расчёт дней, часов, минут и секунд
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Обновление DOM-элементов
    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
};

// Запуск таймера каждую секунду
setInterval(countdown, 1000);
countdown();

// Анимация появления Hero-блока при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("fade-in");
});
const track = document.querySelector(".gallery-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;
const items = document.querySelectorAll(".gallery-item");
const totalItems = items.length;

// Функция обновления позиции слайда
function updateSlidePosition() {
    const slideWidth = items[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Переключение назад
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    updateSlidePosition();
});

// Переключение вперед
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateSlidePosition();
});

// Обновление при изменении размера окна
window.addEventListener("resize", updateSlidePosition);
// Показать форму при выборе тарифа
const kaspiButtons = document.querySelectorAll(".kaspi-btn");

kaspiButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const parentCard = button.parentElement;
        const form = parentCard.querySelector(".order-form");
        form.classList.toggle("hidden");
    });
});
// FAQ аккордеон
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");

        // Закрываем другие вопросы
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });
    });
});
// Отправка формы и переход на Kaspi.kz
const orderForms = document.querySelectorAll(".order-form");

orderForms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const tariff = form.querySelector(".selected-tariff").value;
        const name = form.querySelector(".name-input").value;
        const phone = form.querySelector(".phone-input").value;
        const address = form.querySelector(".address-input").value;
        const allergy = form.querySelector(".allergy-input").value || "Нет";

        // Токен вашего бота и Chat ID группы
        const botToken = "7648729867:AAExDCIUyK48xxHFdETHGVPFs9LVyLCO5Zo";
        const chatId = "-1002356450219";

        // Сообщение, которое отправится в Telegram
        const message = `🎉 Новый заказ:\n\n💼 Тариф: ${tariff}\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🏠 Адрес: ${address}\n⚠️ Аллергия: ${allergy}`;

        try {
            // Отправка данных в Telegram
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML",
                }),
            });

            // Перенаправление на Kaspi.kz
            alert("Спасибо! Вы будете перенаправлены на Kaspi.kz для оплаты.");
            window.location.href = "https://pay.kaspi.kz/pay/9gqyhrcr";
        } catch (error) {
            alert("Произошла ошибка. Попробуйте снова.");
        }
    });
});
// Отправка формы в Telegram
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Токен бота и Chat ID
    const botToken = "7648729867:AAExDCIUyK48xxHFdETHGVPFs9LVyLCO5Zo";
    const chatId = "-1002356450219"; // Chat ID вашей группы

    const telegramMessage = `✉️ Новая заявка на консультацию:\n\n👤 Имя: ${name}\n📞 Номер WhatsApp: ${phone}\n📝 Сообщение: ${message}`;

    try {
        // Отправка данных в Telegram
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: "HTML",
            }),
        });

        alert("Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.");
        contactForm.reset(); // Сбрасываем форму после отправки
    } catch (error) {
        alert("Произошла ошибка. Попробуйте снова.");
    }
});
