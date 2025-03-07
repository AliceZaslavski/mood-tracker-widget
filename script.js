document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid");
    const moodSelector = document.getElementById("moodSelector");
    const saveMood = document.getElementById("saveMood");

    // Lae eelnevalt salvestatud tujud
    let moods = JSON.parse(localStorage.getItem("moods")) || [];

    function renderGrid() {
        grid.innerHTML = "";
        for (let i = 0; i < 30; i++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            if (moods[i]) pixel.style.backgroundColor = moods[i];
            grid.appendChild(pixel);
        }
    }

    saveMood.addEventListener("click", () => {
        const selectedMood = moodSelector.value;
        if (!selectedMood) return;

        if (moods.length >= 30) moods.shift(); // Eemalda vanim, kui on 30 päeva täis
        moods.push(selectedMood);
        localStorage.setItem("moods", JSON.stringify(moods));
        renderGrid();
    });

    renderGrid();
});
