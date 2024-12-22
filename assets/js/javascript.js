document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar-container");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

// Countdown
// Data untuk countdowns
const countdowns = [
    {
        id: 1,
        startDate: new Date("2025-02-01T15:00:00").getTime(), // Snapdragon Pro Series Challenge Final
        endDate: new Date("2025-02-28T21:00:00").getTime(),
    },
    {
        id: 2,
        startDate: new Date("2025-03-03T15:00:00").getTime(), // MPL 1st Half Start
        endDate: new Date("2025-06-29T21:00:00").getTime(),
    },
    {
        id: 3,
        startDate: new Date("2025-04-01T15:00:00").getTime(), // Snapdragon Pro Series Mobile Masters
        endDate: new Date("2025-04-30T21:00:00").getTime(),
    },
    {
        id: 4,
        startDate: new Date("2025-05-01T15:00:00").getTime(), // Snapdragon Pro Series New Season (1)
        endDate: new Date("2025-07-31T21:00:00").getTime(),
    },
    {
        id: 5,
        startDate: new Date("2025-07-07T15:00:00").getTime(), // MWI
        endDate: new Date("2025-07-09T21:00:00").getTime(),
    },
    {
        id: 6,
        startDate: new Date("2025-07-14T15:00:00").getTime(), // MSC
        endDate: new Date("2025-08-03T21:00:00").getTime(),
    },
    {
        id: 7,
        startDate: new Date("2025-08-04T15:00:00").getTime(), // Snapdragon Pro Series New Season (2)
        endDate: new Date("2025-11-30T21:00:00").getTime(),
    },
    {
        id: 8,
        startDate: new Date("2025-08-25T15:00:00").getTime(), // MPL 2nd Half Start
        endDate: new Date("2025-11-02T21:00:00").getTime(),
    },
    {
        id: 9,
        startDate: new Date("2025-12-19T15:00:00").getTime(), // SEA Games
        endDate: new Date("2025-12-21T21:00:00").getTime(),
    },
    {
        id: 10,
        startDate: new Date("2026-01-05T15:00:00").getTime(), // M7 Start
        endDate: new Date("2026-01-31T21:00:00").getTime(),
    },
];

// Fungsi untuk memperbarui semua countdown
function updateAllCountdowns() {
    countdowns.forEach(({ id, startDate, endDate }) => {
        const now = new Date().getTime();

        // Elemen HTML
        const daysEl = document.getElementById(`days-${id}`);
        const hoursEl = document.getElementById(`hours-${id}`);
        const minutesEl = document.getElementById(`minutes-${id}`);
        const secondsEl = document.getElementById(`seconds-${id}`);

        // Div Utama
        const daysTimeEl = document.getElementById(`days-time-${id}`);
        const hoursTimeEl = document.getElementById(`hours-time-${id}`);
        const minutesTimeEl = document.getElementById(`minutes-time-${id}`);
        const secondsTimeEl = document.getElementById(`seconds-time-${id}`);

        const countdownOverEl = document.getElementById(`countdown-over-${id}`);
        const showCountdownEl = document.getElementById(`show-countdown-${id}`);
        const statusCountdownEl = document.getElementById(`status-countdown-${id}`);

        const oneMinute = 1000 * 60 * 60;
        const oneDay = 1000 * 60 * 60 * 24;
        const oneWeek = oneDay * 7;

        if (now < startDate) {
            // Hitung mundur menuju acara
            const timeLeft = startDate - now;

            if (timeLeft <= oneWeek && timeLeft > oneDay) {
                // H-1 Minggu
                countdownOverEl.innerHTML = `Segera`;
                statusCountdownEl.classList.add(`bronze-gradient-bg`);
                secondsTimeEl.classList.add(`display-none`);
            } else if (timeLeft <= oneDay) {
                // H-1 Hari
                countdownOverEl.innerHTML = `Akan Dimulai`;
                statusCountdownEl.classList.add(`gold-gradient-2-bg`);
                daysTimeEl.classList.add(`display-none`);
            } else if (timeLeft <= oneMinute) {
                // H-1 Hari
                countdownOverEl.innerHTML = `Sebentar Lagi`;
                statusCountdownEl.classList.add(`gold-gradient-2-bg`);
                daysTimeEl.classList.add(`display-none`);
            } else {
                countdownOverEl.innerHTML = `Menunggu`;
                statusCountdownEl.classList.add(`silver-gradient-bg`);
                secondsTimeEl.classList.add(`display-none`);
            }

            const days = Math.floor(timeLeft / oneDay);
            const hours = Math.floor((timeLeft % oneDay) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const second = Math.floor((timeLeft % (1000 * 60)) / 1000);

            daysEl.textContent = days;
            hoursEl.textContent = hours;
            minutesEl.textContent = minutes;
            secondsEl.textContent = second;
        } else if (now >= startDate && now < endDate) {
            // Hitung mundur selama acara berlangsung
            const timeLeft = endDate - now;

            if (timeLeft <= oneWeek && timeLeft > oneDay) {
                // H-1 Minggu Sebelum Berakhir
                countdownOverEl.innerHTML = `Akan Berakhir`;
                statusCountdownEl.classList.add(`bronze-gradient-bg`);
                secondsTimeEl.classList.add(`display-none`);
            } else if (timeLeft <= oneDay) {
                // H-1 Hari Sebelum Berakhir
                countdownOverEl.innerHTML = `Hampir Berakhir`;
                statusCountdownEl.classList.add(`gold-gradient-2-bg`);
                daysTimeEl.classList.add(`display-none`);
            } else {
                countdownOverEl.innerHTML = `Sedang Berlangsung`;
                statusCountdownEl.classList.add(`silver-gradient-bg`);
                secondsTimeEl.classList.add(`display-none`);
            }

            const days = Math.floor(timeLeft / oneDay);
            const hours = Math.floor((timeLeft % oneDay) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const second = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            daysEl.textContent = days;
            hoursEl.textContent = hours;
            minutesEl.textContent = minutes;
            secondsEl.textContent = second;
            
            statusCountdownEl.classList.add(`gold-bg`);
        } else {
            // Acara telah selesai
            countdownOverEl.innerHTML = `Acara Selesai`;
            statusCountdownEl.classList.add(`black-gradient-bg`);
        }
    });
}

// Jalankan update setiap 1 detik
setInterval(updateAllCountdowns, 1000);


// Nav Ham Menu
const hamMenu = document.querySelector('.ham-menu');
const offMenuList = document.querySelector('.off-menu-list');
const menuItems = offMenuList.querySelectorAll('a');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offMenuList.classList.toggle('active');
});

// Close off-menu-list when a menu item is clicked
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        hamMenu.classList.remove('active');
        offMenuList.classList.remove('active');
    });
});
