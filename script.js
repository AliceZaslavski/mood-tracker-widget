document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid");
    const moodSelector = document.getElementById("moodSelector");
    const dateInput = document.getElementById("date");
    const saveMood = document.getElementById("saveMood");

    // Lae eelnevalt salvestatud tujud
    let moods = JSON.parse(localStorage.getItem("moods")) || {};

    function renderGrid() {
        grid.innerHTML = "";
        for (let i = 1; i <= 30; i++) {
            const date = new Date();
            date.setDate(i);
            const formattedDate = date.toISOString().split("T")[0];

            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.dataset.date = formattedDate;

            if (moods[formattedDate]) {
                pixel.style.background = createGradient(moods[formattedDate]);
            }

            grid.appendChild(pixel);
        }
    }

    function createGradient(colors) {
        if (colors.length === 1) return colors[0];
        return `linear-gradient(45deg, ${colors.join(", ")})`;
    }

    saveMood.addEventListener("click", () => {
        const selectedMood = moodSelector.value;
        const selectedDate = dateInput.value;
        if (!selectedMood || !selectedDate) return;

        if (!moods[selectedDate]) moods[selectedDate] = [];
        moods[selectedDate].push(selectedMood);
        if (moods[selectedDate].length > 3) moods[selectedDate].shift(); // Piira max 3 värvi

        localStorage.setItem("moods", JSON.stringify(moods));
        renderGrid();
    });

    renderGrid();
});
