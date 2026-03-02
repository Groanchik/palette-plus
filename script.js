function copyCSS(element) {
    const text = element.innerText || element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Скопировано в буфер обмена!");
    });
}

const generateRandomColor = () => {
    const chars = '0123456789ABCDEF';
    return '#' + Array.from({
        length: 6
    }, () => chars[Math.floor(Math.random() * 16)]).join('');
};

const popularColors = [{
    name: "White Smoke",
    hex: "#F5F5F5"
}, {
    name: "Navy Blue",
    hex: "#000080"
}, {
    name: "Crimson",
    hex: "#DC143C"
}, {
    name: "Teal",
    hex: "#008080"
}, {
    name: "Gold",
    hex: "#FFD700"
}, {
    name: "Sea Green",
    hex: "#3CB371"
}, {
    name: "Slate Gray",
    hex: "#708090"
}, {
    name: "Tomato",
    hex: "#FF6347"
}, {
    name: "Azure",
    hex: "#F0FFFF"
}, {
    name: "Indigo",
    hex: "#4B0082"
}, {
    name: "Orchid",
    hex: "#DA70D6"
}, {
    name: "Sienna",
    hex: "#A0522D"
}, {
    name: "Deep Sky",
    hex: "#00BFFF"
}, {
    name: "Hot Pink",
    hex: "#FF69B4"
}, {
    name: "Lime Green",
    hex: "#32CD32"
}, {
    name: "Dark Orange",
    hex: "#FF8C00"
}];

const popularPalettesData = [{
    name: "Летний закат",
    colors: ["#FF7E5F", "#FEB47B", "#FFD700", "#3CB371", "#008080"]
}, {
    name: "Зимнее утро",
    colors: ["#B0E0E6", "#ADD8E6", "#E0FFFF", "#F0FFFF", "#FFFFFF"]
}, {
    name: "Лесной мох",
    colors: ["#2F4F4F", "#006400", "#556B2F", "#6B8E23", "#9ACD32"]
}, {
    name: "Морской бриз",
    colors: ["#00BFFF", "#1E90FF", "#4169E1", "#6495ED", "#B0C4DE"]
}, {
    name: "Пыльная роза",
    colors: ["#D8BFD8", "#FFB6C1", "#DB7093", "#C71585", "#800080"]
}, {
    name: "Золотая осень",
    colors: ["#FFD700", "#FF8C00", "#CD853F", "#A0522D", "#8B4513"]
}, {
    name: "Техно ночь",
    colors: ["#0F172A", "#1e293b", "#38bdf8", "#00FFFF", "#4B0082"]
}, {
    name: "Мятный шоколад",
    colors: ["#98FF98", "#7FFFD4", "#00FA9A", "#D2B48C", "#8B4513"]
}, {
    name: "Лавандовые поля",
    colors: ["#E6E6FA", "#D8BFD8", "#B0E0E6", "#9370DB", "#6A5ACD"]
}, {
    name: "Красный бархат",
    colors: ["#FFC0CB", "#FF1493", "#DC143C", "#B22222", "#800000"]
}];

window.onload = () => {
    addColorInput('#6a11cb', 0);
    addColorInput('#2575fc', 100);
    addTextColorInput('#ff7e5f', 0);
    addTextColorInput('#feb47b', 100);
    renderPopularColors(popularColors);
    renderPopularPalettes(popularPalettesData);
    generateNewPalette(5, 'random', '#38bdf8');
    updateGradient();
    updateTextGradient();

    document.getElementById('angle').addEventListener('input', updateGradient);
};

function addColorInput(initialColor = generateRandomColor(), initialPos = 50) {
    const group = document.createElement('div');
    group.className = 'color-input-group';
    group.innerHTML = `
    <input type="color" value="${initialColor}" oninput="updateGradient()">
    <input type="range" min="0" max="100" value="${initialPos}" oninput="updateGradient()">
    <button class="remove-color-btn" onclick="this.parentElement.remove(); updateGradient();">−</button>
    `;
    document.getElementById('colors-container').appendChild(group);
    updateGradient();
}

function updateGradient() {
    const groups = document.querySelectorAll('.color-input-group');
    const colorStops = Array.from(groups).map(g => {
        return `${g.querySelector('input[type="color"]').value} ${g.querySelector('input[type="range"]').value}%`;
    });
    const deg = document.getElementById('angle').value;
    const style = `linear-gradient(${deg}deg, ${colorStops.join(', ')})`;
    document.getElementById('gradient-preview').style.background = style;
    document.getElementById('css-code').innerText = `background: ${style};`;
    document.querySelector('.control-group span').innerText = deg + '°';
}

function randomize() {
    document.querySelectorAll('#colors-container input[type="color"]').forEach(i => i.value = generateRandomColor());
    document.getElementById('angle').value = Math.floor(Math.random() * 360);
    updateGradient();
}

function addTextColorInput(initialColor = generateRandomColor(), initialPos = 50) {
    const group = document.createElement('div');
    group.className = 'text-input-group';
    group.innerHTML = `
    <input type="color" value="${initialColor}" oninput="updateTextGradient()">
    <input type="range" min="0" max="100" value="${initialPos}" oninput="updateTextGradient()">
    <button class="remove-color-btn" onclick="this.parentElement.remove(); updateTextGradient();">−</button>
    `;
    document.getElementById('text-colors-container').appendChild(group);
    updateTextGradient();
}

function updateTextGradient() {
    const groups = document.querySelectorAll('.text-input-group');
    const colorStops = Array.from(groups).map(g => {
        return `${g.querySelector('input[type="color"]').value} ${g.querySelector('input[type="range"]').value}%`;
    });
    const style = `linear-gradient(90deg, ${colorStops.join(', ')})`;
    document.getElementById('text-input').style.backgroundImage = style;
    document.getElementById('text-css-code').innerText = `background-image: ${style}; -webkit-background-clip: text; background-clip: text; color: transparent;`;
}

function renderPopularColors(colorsToDisplay) {
    const grid = document.getElementById('main-colors-grid');
    if (!grid) return;
    grid.innerHTML = '';
    colorsToDisplay.forEach(color => {
        const item = document.createElement('div');
        item.className = 'color-item-mini';
        item.onclick = () => {
            navigator.clipboard.writeText(color.hex);
            const title = item.querySelector('strong');
            const oldText = title.innerText;
            title.innerText = "Copied!";
            setTimeout(() => title.innerText = oldText, 800);
        };
        item.innerHTML = `
        <div class="mini-box" style="background: ${color.hex}"></div>
        <div class="mini-info">
        <strong>${color.name}</strong>
        <span>${color.hex}</span>
        </div>
        `;
        grid.appendChild(item);
    });
}

function filterColors() {
    const searchTerm = document.getElementById('color-search').value.toLowerCase();
    const filtered = popularColors.filter(color =>
    color.name.toLowerCase().includes(searchTerm) ||
    color.hex.toLowerCase().includes(searchTerm)
    );
    renderPopularColors(filtered);
}

function generateNewPalette(numColorsStr, preset = 'random', baseColorInput = '#38bdf8') {
    const numColors = parseInt(numColorsStr, 10);
    const paletteGrid = document.getElementById('palette-grid');
    if (!paletteGrid) return;
    paletteGrid.innerHTML = '';

    let colors = [];

    if (Array.isArray(baseColorInput)) {
        colors = baseColorInput;
    } else if (preset === 'random') {
        for (let i = 0; i < numColors; i++) {
            colors.push(generateRandomColor());
        }
    } else {
        let base = hexToHsl(baseColorInput);

        colors.push(baseColorInput);

        for (let i = 1; i < numColors; i++) {
            let newHue, newSat, newLight;
            if (preset === 'analogous') {
                newHue = (base.h + (i % 2 === 0 ? i * 30 : -i * 30) + 360) % 360;
                newSat = base.s;
                newLight = base.l;
            } else if (preset === 'complementary') {
                newHue = (base.h + 180 + (i % 2 === 0 ? 0 : 20) + 360) % 360;
                newSat = base.s * (1 - i * 0.1);
                newLight = base.l + (i % 2 === 0 ? 15 : -15);
            } else if (preset === 'monochromatic') {
                newHue = base.h;
                newSat = base.s * (1 - i * 0.15);
                newLight = base.l + (i % 2 === 0 ? i * 12 : -i * 12);
            } else if (preset === 'triadic') {
                newHue = (base.h + (i % 2 === 0 ? 120 : 240)) % 360;
                newSat = base.s;
                newLight = base.l;
            }
            newSat = Math.min(Math.max(newSat, 15), 100);
            newLight = Math.min(Math.max(newLight, 10), 90);
            colors.push(hslToHex(newHue, newSat, newLight));
        }
    }

    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'palette-card';
        div.style.backgroundColor = color;
        div.innerText = color.toUpperCase();
        div.onclick = () => {
            navigator.clipboard.writeText(color);
            alert('Цвет ' + color + ' скопирован!');
        };
        paletteGrid.appendChild(div);
    });
}

function renderPopularPalettes(palettes) {
    const container = document.getElementById('popular-palettes-grid');
    if (!container) return;
    container.innerHTML = '';

    palettes.forEach(palette => {
        const paletteItem = document.createElement('div');
        paletteItem.className = 'popular-palette-item';
        paletteItem.title = palette.name;
        paletteItem.onclick = () => {
            const baseColorFromPalette = palette.colors;

            document.getElementById('base-color-picker').value = baseColorFromPalette[0];
            document.querySelector('.num-colors-label span').innerText = palette.colors.length;
            document.querySelector('.num-colors-label input').value = palette.colors.length;

            generateNewPalette(palette.colors.length, 'custom', palette.colors);

            alert(`Палитра "${palette.name}" загружена!`);
        };

        palette.colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'popular-palette-color';
            colorDiv.style.backgroundColor = color;
            paletteItem.appendChild(colorDiv);
        });
        container.appendChild(paletteItem);
    });
}

function hexToHsl(hex) {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; } else if (60 <= h && h < 120) { r = x; g = c; }
    else if (120 <= h && h < 180) { g = c; b = x; } else if (180 <= h && h < 240) { g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; b = c; } else if (300 <= h && h < 360) { r = c; b = x; }
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
    return "#" + r + g + b;
}
