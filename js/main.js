// =============================================
// OMER & NADA - LOVEVERSE
// INTRO + MEMORY UNIVERSE + MEMORY GAME + TIMER
// =============================================

// =============================================
// 1. INTRO ELEMENTS
// =============================================

const shootButton = document.getElementById("shootButton");
const loveArrow = document.getElementById("loveArrow");
const targetHeart = document.getElementById("targetHeart");

const introScreen = document.getElementById("introScreen");
const revealScreen = document.getElementById("revealScreen");
const enterWorldButton = document.getElementById("enterWorldButton");
const universe = document.getElementById("universe");

let isShooting = false;

// =============================================
// 2. MAGIC CURSOR
// =============================================

document.addEventListener("pointermove", function (event) {
    if (isShooting) return;

    const particle = document.createElement("span");
    particle.className = "magic-cursor";
    particle.textContent = Math.random() > 0.5 ? "♡" : "✦";

    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
});

// =============================================
// 3. ARROW TRACKING
// =============================================

document.addEventListener("pointermove", function (event) {
    if (isShooting || !loveArrow) return;

    const rect = loveArrow.getBoundingClientRect();
    const arrowX = rect.left + rect.width / 2;
    const arrowY = rect.top + rect.height / 2;

    const angle = Math.atan2(
        event.clientY - arrowY,
        event.clientX - arrowX
    ) * (180 / Math.PI);

    loveArrow.style.transform = `rotate(${angle}deg)`;
});

// =============================================
// 4. INTRO PARALLAX
// =============================================

if (introScreen && targetHeart) {
    introScreen.addEventListener("pointermove", function (event) {
        if (isShooting) return;

        const x = (event.clientX / window.innerWidth - 0.5) * 15;
        const y = (event.clientY / window.innerHeight - 0.5) * 15;

        targetHeart.style.translate = `${x}px ${y}px`;
    });
}

// =============================================
// 5. HEART EXPLOSION
// =============================================

function createHeartExplosion() {
    if (!introScreen) return;

    const symbols = ["♡", "♥", "✦", "✨", "🌸"];

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");
        particle.classList.add("burst-heart");

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = "50%";
        particle.style.top = "50%";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 250;

        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        introScreen.appendChild(particle);
        setTimeout(() => particle.remove(), 1800);
    }
}

// =============================================
// 6. IMPACT FLASH
// =============================================

function createImpactFlash() {
    if (!introScreen) return;

    const flash = document.createElement("div");
    flash.className = "impact-flash";

    introScreen.appendChild(flash);
    setTimeout(() => flash.remove(), 1000);
}

// =============================================
// 7. SHOOT THE ARROW
// =============================================

if (shootButton) {
    shootButton.addEventListener("click", function () {
        if (isShooting) return;

        isShooting = true;
        shootButton.disabled = true;
        shootButton.textContent = "اتبع قلبك... ❤️";

        if (loveArrow) {
            loveArrow.classList.add("shooting");
        }

        setTimeout(() => {
            if (targetHeart) {
                targetHeart.classList.add("heart-hit");
            }

            createHeartExplosion();
            createImpactFlash();
        }, 850);

        setTimeout(() => {
            if (introScreen) {
                introScreen.classList.add("hidden");
            }

            if (revealScreen) {
                revealScreen.classList.remove("hidden");
                revealScreen.classList.add("reveal-active");
            }
        }, 1800);
    });
}

// =============================================
// 8. ENTER MAIN WEBSITE
// =============================================

if (enterWorldButton) {
    enterWorldButton.addEventListener("click", function () {
        if (revealScreen) {
            revealScreen.classList.add("hidden");
        }

        if (universe) {
            universe.classList.remove("hidden");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// =============================================
// 9. CLEANUP OLD GALLERY OVERLAY
// =============================================

const oldWorldOverlay = document.getElementById("worldOverlay");

if (oldWorldOverlay) {
    oldWorldOverlay.remove();
}

document.body.classList.remove("world-is-open");

// =============================================
// 10. MEMORY UNIVERSE - ALL 36 PHOTOS
// =============================================

// الصور الـ 31 من مجلد outings
const outingPhotos = Array.from({ length: 31 }, (_, index) => {
    const photoNumber = index + 1;

    return {
        src: `images/outings/outing-${photoNumber}.jpg`,
        title: `ذكرى رقم ${photoNumber}`,
        description: "تفصيلة حلوة من حكايتنا اللي لسه مكملة ❤️"
    };
});

// الصور الخمسة الأصلية
const couplePhotos = [
    {
        src: "images/couple.jpg",
        title: "إحنا",
        description: "أجمل صورة في الحكاية"
    },
    {
        src: "images/couple1.jpg",
        title: "حكايتنا",
        description: "تفاصيل صغيرة بتفرق"
    },
    {
        src: "images/couple2.jpg",
        title: "سوا",
        description: "أحلى مكان هو جنب بعض"
    },
    {
        src: "images/couple3.jpg",
        title: "ذكرياتنا",
        description: "والحكاية لسه مكملة"
    },
    {
        src: "images/couple4.jpg",
        title: "للأبد",
        description: "لسه في صور وحكايات كتير"
    }
];

const memoryPhotos = [...outingPhotos, ...couplePhotos];

let currentMemoryIndex = 0;

// =============================================
// 11. OPEN MEMORY UNIVERSE
// =============================================

function openMemoryUniverse() {
    if (document.getElementById("memoryUniverse")) return;

    const page = document.createElement("section");

    page.id = "memoryUniverse";
    page.className = "memory-universe";

    page.innerHTML = `
        <div class="memory-universe-stars"></div>

        <button class="memory-universe-back" id="closeMemoryUniverse">
            <span>←</span> رجوع
        </button>

        <div class="memory-universe-header">
            <span class="memory-eyebrow">OMER & NADA · OUR STORY</span>
            <h1>عالم ذكرياتنا</h1>
            <p>كل صورة هنا بتحكي حكاية.. والحكاية لسه مكملة ❤️</p>
            <div class="memory-header-line"></div>
        </div>

        <div class="memory-universe-gallery">
            ${memoryPhotos.map((photo, index) => `
                <article
                    class="universe-photo-card"
                    data-photo-index="${index}"
                    style="--photo-delay:${index * 0.09}s"
                >
                    <div class="universe-photo-frame">
                        <img
                            src="${photo.src}"
                            alt="${photo.title}"
                            loading="lazy"
                        >

                        <div class="universe-photo-overlay">
                            <span>✧ افتح الذكرى ✧</span>
                        </div>
                    </div>

                    <div class="universe-photo-info">
                        <span class="photo-number">
                            MEMORY ${String(index + 1).padStart(2, "0")}
                        </span>
                        <h3>${photo.title}</h3>
                        <p>${photo.description}</p>
                    </div>
                </article>
            `).join("")}
        </div>

        <div class="memory-universe-footer">
            <span>♡</span>
            <p>Some moments deserve to last forever</p>
            <span>♡</span>
        </div>

        <div class="memory-lightbox" id="memoryLightbox">
            <button class="lightbox-close" id="closeMemoryLightbox">×</button>
            <button class="lightbox-arrow lightbox-prev" id="memoryPrev">❮</button>

            <div class="lightbox-content">
                <div class="lightbox-image-wrap">
                    <img id="lightboxImage" src="" alt="">
                </div>
                <h2 id="lightboxTitle"></h2>
                <p id="lightboxDescription"></p>
                <span id="lightboxCounter"></span>
            </div>

            <button class="lightbox-arrow lightbox-next" id="memoryNext">❯</button>
        </div>
    `;

    document.body.appendChild(page);
    document.body.classList.add("memory-universe-open");

    requestAnimationFrame(() => {
        page.classList.add("memory-universe-active");
    });

    page.querySelectorAll(".universe-photo-card").forEach(card => {
        card.addEventListener("click", () => {
            showMemoryPhoto(Number(card.dataset.photoIndex));
        });
    });

    page.querySelector("#closeMemoryUniverse")
        .addEventListener("click", closeMemoryUniverse);

    page.querySelector("#closeMemoryLightbox")
        .addEventListener("click", closeMemoryLightbox);

    page.querySelector("#memoryPrev").addEventListener("click", () => {
        showMemoryPhoto(
            (currentMemoryIndex - 1 + memoryPhotos.length) % memoryPhotos.length
        );
    });

    page.querySelector("#memoryNext").addEventListener("click", () => {
        showMemoryPhoto(
            (currentMemoryIndex + 1) % memoryPhotos.length
        );
    });

    page.querySelector("#memoryLightbox").addEventListener("click", event => {
        if (event.target.id === "memoryLightbox") {
            closeMemoryLightbox();
        }
    });
}

// =============================================
// 12. SHOW MEMORY PHOTO
// =============================================

function showMemoryPhoto(index) {
    currentMemoryIndex = index;

    const photo = memoryPhotos[index];
    const lightbox = document.getElementById("memoryLightbox");

    document.getElementById("lightboxImage").src = photo.src;
    document.getElementById("lightboxImage").alt = photo.title;
    document.getElementById("lightboxTitle").textContent = photo.title;
    document.getElementById("lightboxDescription").textContent =
        photo.description;

    document.getElementById("lightboxCounter").textContent =
        `${index + 1} / ${memoryPhotos.length}`;

    lightbox.classList.add("lightbox-active");
}

// =============================================
// 13. CLOSE MEMORY LIGHTBOX
// =============================================

function closeMemoryLightbox() {
    document.getElementById("memoryLightbox")
        ?.classList.remove("lightbox-active");
}

// =============================================
// 14. CLOSE MEMORY UNIVERSE
// =============================================

function closeMemoryUniverse() {
    const page = document.getElementById("memoryUniverse");

    if (!page) return;

    page.classList.remove("memory-universe-active");
    document.body.classList.remove("memory-universe-open");

    setTimeout(() => page.remove(), 650);
}

// =============================================
// 15. MEMORY MATCH GAME SETTINGS
// =============================================

const memorySymbols = [
    "❤️", "🌹", "💍", "🧸", "💌", "⭐",
    "🌙", "🦋", "🍓", "🎀", "🌸", "💎",
    "🐻", "🍒", "🪽", "💫", "☀️", "🪄",
    "🩷", "💜", "🌷", "🕊️", "🎁", "🍀",
    "🥹", "😘", "💐", "🪻", "🦢", "✨"
];

const gameDifficulties = {
    easy: {
        name: "سهل",
        icon: "🌷",
        description: "بداية لطيفة.. خلّوا بالكم من الكروت",
        basePairs: 4
    },
    medium: {
        name: "متوسط",
        icon: "💗",
        description: "التركيز مطلوب.. التحدي بدأ",
        basePairs: 6
    },
    hard: {
        name: "صعب",
        icon: "🔥",
        description: "محتاجين ذاكرة قوية وتركيز عالي",
        basePairs: 8
    },
    impossible: {
        name: "مستحيل",
        icon: "👑",
        description: "التحدي الحقيقي للأبطال",
        basePairs: 10
    }
};

const TOTAL_GAME_LEVELS = 10;

let activeDifficulty = "easy";
let activeLevel = 1;
let flippedCards = [];
let matchedPairs = 0;
let memoryAttempts = 0;
let memoryLocked = false;
let memoryGameCards = [];
let completedLevels = {
    easy: 0,
    medium: 0,
    hard: 0,
    impossible: 0
};
let wrongMessageTimer = null;

// =============================================
// 16. SHUFFLE ARRAY
// Fisher-Yates: new arrangement every time
// =============================================

function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }

    return shuffled;
}

// =============================================
// 17. OPEN GAME CITY
// =============================================

function openGameCity() {
    if (document.getElementById("gameCity")) return;

    const page = document.createElement("section");

    page.id = "gameCity";
    page.className = "game-city";

    page.innerHTML = `
        <div class="game-city-stars"></div>

        <button class="game-back-button" id="closeGameCity">
            ← رجوع
        </button>

        <header class="game-city-header">
            <span class="game-eyebrow">OMER & NADA · PLAY TOGETHER</span>
            <div class="game-main-icon">🎮</div>
            <h1>مدينة الألعاب</h1>
            <p>اختبروا ذاكرتكم.. وشوفوا مين فيكم الأكثر تركيزًا ❤️</p>
        </header>

        <main class="game-main-content" id="gameMainContent"></main>

        <footer class="game-city-footer">
            Made with love for Omer & Nada ♡
        </footer>

        <div class="game-toast" id="gameToast"></div>
    `;

    document.body.appendChild(page);
    document.body.classList.add("game-city-open");

    requestAnimationFrame(() => {
        page.classList.add("game-city-active");
    });

    page.querySelector("#closeGameCity")
        .addEventListener("click", closeGameCity);

    renderDifficultyMenu();
}

// =============================================
// 18. CLOSE GAME CITY
// =============================================

function closeGameCity() {
    const page = document.getElementById("gameCity");

    if (!page) return;

    page.classList.remove("game-city-active");
    document.body.classList.remove("game-city-open");

    clearTimeout(wrongMessageTimer);

    setTimeout(() => page.remove(), 500);
}

// =============================================
// 19. GAME CONTENT
// =============================================

function getGameContent() {
    return document.getElementById("gameMainContent");
}

// =============================================
// 20. DIFFICULTY MENU
// =============================================

function renderDifficultyMenu() {
    const content = getGameContent();

    if (!content) return;

    content.innerHTML = `
        <section class="game-screen">
            <div class="game-section-heading">
                <span class="game-small-label">CHOOSE YOUR CHALLENGE</span>
                <h2>اختاروا مستوى الصعوبة</h2>
                <p>كل ما الصعوبة تزيد.. عدد الكروت هيزيد معاها</p>
            </div>

            <div class="difficulty-grid">
                ${Object.entries(gameDifficulties).map(([key, difficulty]) => `
                    <button
                        class="difficulty-card difficulty-${key}"
                        data-difficulty="${key}"
                    >
                        <span class="difficulty-icon">${difficulty.icon}</span>
                        <strong>${difficulty.name}</strong>
                        <small>${difficulty.description}</small>
                        <span class="difficulty-progress">
                            ${completedLevels[key]} / ${TOTAL_GAME_LEVELS} مراحل
                        </span>
                    </button>
                `).join("")}
            </div>
        </section>
    `;

    content.querySelectorAll("[data-difficulty]").forEach(button => {
        button.addEventListener("click", () => {
            activeDifficulty = button.dataset.difficulty;
            renderLevelMenu();
        });
    });
}

// =============================================
// 21. LEVEL MENU
// =============================================

function renderLevelMenu() {
    const content = getGameContent();

    if (!content) return;

    const difficulty = gameDifficulties[activeDifficulty];
    const unlockedThrough = completedLevels[activeDifficulty] + 1;

    content.innerHTML = `
        <section class="game-screen">
            <button class="game-small-back" id="backToDifficulties">
                ← مستويات الصعوبة
            </button>

            <div class="game-section-heading">
                <span class="game-small-label"> ${difficulty.icon} ${difficulty.name}</span>
                <h2>اختاروا المرحلة</h2>
                <p>كل مرحلة جديدة هتكون أصعب من اللي قبلها</p>
            </div>

            <div class="levels-grid">
                ${Array.from({ length: TOTAL_GAME_LEVELS }, (_, index) => {
                    const level = index + 1;
                    const locked = level > unlockedThrough;
                    const pairs = getPairCount(activeDifficulty, level);

                    return `
                        <button
                            class="level-card ${locked ? "level-locked" : ""} ${level <= completedLevels[activeDifficulty] ? "level-completed" : ""}"
                            data-level="${level}"
                            ${locked ? "disabled" : ""}
                        >
                            <span class="level-number">${locked ? "🔒" : level}</span>
                            <strong>المرحلة ${level}</strong>
                            <small>${pairs} أزواج</small>
                            ${level <= completedLevels[activeDifficulty]
                                ? '<span class="level-check">✓</span>'
                                : ""}
                        </button>
                    `;
                }).join("")}
            </div>
        </section>
    `;

    content.querySelector("#backToDifficulties")
        .addEventListener("click", renderDifficultyMenu);

    content.querySelectorAll("[data-level]").forEach(button => {
        button.addEventListener("click", () => {
            activeLevel = Number(button.dataset.level);
            startMemoryStage();
        });
    });
}

// =============================================
// 22. PAIR COUNT PER LEVEL
// =============================================

function getPairCount(difficultyKey, level) {
    const basePairs = gameDifficulties[difficultyKey].basePairs;

    // كل مرحلة تزود زوجًا واحدًا
    return Math.min(basePairs + level - 1, 18);
}

// =============================================
// 23. START MEMORY STAGE
// =============================================

function startMemoryStage() {
    const pairCount = getPairCount(activeDifficulty, activeLevel);

    const selectedSymbols = shuffleArray(memorySymbols)
        .slice(0, pairCount);

    memoryGameCards = shuffleArray([
        ...selectedSymbols.map((symbol, index) => ({
            id: `${index}-a-${Math.random()}`,
            symbol,
            matched: false
        })),
        ...selectedSymbols.map((symbol, index) => ({
            id: `${index}-b-${Math.random()}`,
            symbol,
            matched: false
        }))
    ]);

    flippedCards = [];
    matchedPairs = 0;
    memoryAttempts = 0;
    memoryLocked = false;

    renderMemoryStage();
}

// =============================================
// 24. RENDER MEMORY STAGE
// =============================================

function renderMemoryStage() {
    const content = getGameContent();

    if (!content) return;

    const difficulty = gameDifficulties[activeDifficulty];
    const pairCount = getPairCount(activeDifficulty, activeLevel);

    content.innerHTML = `
        <section class="game-screen memory-stage-screen">
            <div class="memory-stage-top">
                <button class="game-small-back" id="backToLevels">
                    ← المراحل
                </button>

                <span class="stage-difficulty">
                    ${difficulty.icon} ${difficulty.name}
                </span>
            </div>

            <div class="game-section-heading">
                <span class="game-small-label">MEMORY CHALLENGE</span>
                <h2>المرحلة ${activeLevel}</h2>
                <p>افتحوا الكروت واعثروا على كل زوج متشابه</p>
            </div>

            <div class="memory-game-stats">
                <div class="memory-stat">
                    <span>الأزواج</span>
                    <strong id="matchedCount">0 / ${pairCount}</strong>
                </div>

                <div class="memory-stat">
                    <span>المحاولات</span>
                    <strong id="memoryAttempts">0</strong>
                </div>

                <div class="memory-stat">
                    <span>الكروت</span>
                    <strong>${pairCount * 2}</strong>
                </div>
            </div>

            <div
                class="memory-match-grid"
                id="memoryMatchGrid"
                style="--card-columns:${getGridColumns(pairCount * 2)}"
            >
                ${memoryGameCards.map(card => `
                    <button
                        class="memory-match-card"
                        data-card-id="${card.id}"
                        aria-label="كارت مخفي"
                    >
                        <span class="memory-card-back">♡</span>
                        <span class="memory-card-front">${card.symbol}</span>
                    </button>
                `).join("")}
            </div>

            <p class="memory-stage-hint" id="memoryStageHint">
                ركزوا كويس.. كل كارت ليه توأم ❤️
            </p>

            <button class="game-small-back" id="restartMemoryStage">
                ↻ إعادة المرحلة
            </button>
        </section>
    `;

    content.querySelector("#backToLevels")
        .addEventListener("click", renderLevelMenu);

    content.querySelector("#restartMemoryStage")
        .addEventListener("click", startMemoryStage);

    content.querySelectorAll(".memory-match-card").forEach(button => {
        button.addEventListener("click", () => handleMemoryCardClick(button));
    });
}

// =============================================
// 25. GRID COLUMNS
// =============================================

function getGridColumns(cardCount) {
    if (cardCount <= 8) return 4;
    if (cardCount <= 12) return 4;
    if (cardCount <= 20) return 5;
    if (cardCount <= 28) return 6;
    return 6;
}

// =============================================
// 26. HANDLE CARD CLICK
// =============================================



function handleMemoryCardClick(button) {
    if (memoryLocked) return;

    if (
        button.classList.contains("flipped") ||
        button.classList.contains("matched")
    ) return;

    const cardId = button.dataset.cardId;
    const card = memoryGameCards.find(item => item.id === cardId);

    if (!card) return;

    button.classList.add("flipped");

    console.log("بعد الفتح:", button.className);

    setTimeout(() => {
        console.log("بعد ثانية:", button.className);
    }, 1000);

    flippedCards.push({ card, button });

    if (flippedCards.length < 2) return;

    memoryAttempts++;

    const attemptsElement = document.getElementById("memoryAttempts");
    if (attemptsElement) {
        attemptsElement.textContent = memoryAttempts;
    }

    const first = flippedCards[0];
    const second = flippedCards[1];

    if (first.card.symbol === second.card.symbol) {
        handleCorrectMatch(first, second);
    } else {
        handleWrongMatch(first, second);
    }
}

// =============================================
// 27. CORRECT MATCH
// =============================================

function handleCorrectMatch(first, second) {
    first.card.matched = true;
    second.card.matched = true;

    first.button.classList.add("matched");
    second.button.classList.add("matched");

    matchedPairs++;
    flippedCards = [];

    const count = document.getElementById("matchedCount");

    if (count) {
        count.textContent =
            `${matchedPairs} / ${getPairCount(activeDifficulty, activeLevel)}`;
    }

    const hint = document.getElementById("memoryStageHint");

    if (hint) {
        hint.textContent = "برافو عليكم! لقيتوا زوج متشابه 💖";
    }

    if (matchedPairs === getPairCount(activeDifficulty, activeLevel)) {
        setTimeout(showStageVictory, 650);
    }
}

// =============================================
// 28. WRONG MATCH
// =============================================

function handleWrongMatch(first, second) {
    memoryLocked = true;

    showGameToast("ركزوا! 💗");

    wrongMessageTimer = setTimeout(() => {
        first.button.classList.remove("flipped");
        second.button.classList.remove("flipped");

        flippedCards = [];
        memoryLocked = false;
    }, 900);
}

// =============================================
// 29. CENTER TOAST MESSAGE
// =============================================

function showGameToast(message) {
    const toast = document.getElementById("gameToast");

    if (!toast) return;

    clearTimeout(wrongMessageTimer);

    toast.textContent = message;
    toast.classList.add("game-toast-visible");

    setTimeout(() => {
        toast.classList.remove("game-toast-visible");
    }, 850);
}

// =============================================
// 30. STAGE VICTORY
// =============================================

function showStageVictory() {
    const content = getGameContent();

    if (!content) return;

    const isLastStage = activeLevel === TOTAL_GAME_LEVELS;

    completedLevels[activeDifficulty] = Math.max(
        completedLevels[activeDifficulty],
        activeLevel
    );

    content.innerHTML = `
        <section class="game-screen victory-screen">
            <div class="victory-glow">🏆</div>

            <span class="game-small-label">LEVEL COMPLETED</span>
            <h2>برافوو عليكم! ❤️</h2>

            <p>
                قدرتوا تلاقوا كل الأزواج المتشابهة!
                <br>
                ذاكرتكم قوية وحكايتكم أحلى.
            </p>

            <div class="victory-stats">
                <span>المرحلة ${activeLevel}</span>
                <span>${memoryAttempts} محاولة</span>
            </div>

            <div class="victory-actions">
                ${!isLastStage ? `
                    <button class="game-primary-button" id="nextLevel">
                        المرحلة التالية ←
                    </button>
                ` : `
                    <button class="game-primary-button" id="finishDifficulty">
                        خلصتوا كل المراحل 👑
                    </button>
                `}

                <button class="game-secondary-button" id="replayLevel">
                    ↻ العبوا المرحلة تاني
                </button>

                <button class="game-secondary-button" id="backToLevelsVictory">
                    قائمة المراحل
                </button>
            </div>
        </section>
    `;

    const nextButton = content.querySelector("#nextLevel");

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            activeLevel++;
            startMemoryStage();
        });
    }

    const finishButton = content.querySelector("#finishDifficulty");

    if (finishButton) {
        finishButton.addEventListener("click", renderDifficultyMenu);
    }

    content.querySelector("#replayLevel")
        .addEventListener("click", startMemoryStage);

    content.querySelector("#backToLevelsVictory")
        .addEventListener("click", renderLevelMenu);
}

// =============================================
// 31. STORY TIMER
// =============================================

// 11 November 2026 - 8:00 PM Egypt time
const engagementDate = new Date("2026-11-11T20:00:00+02:00");

let storyTimerInterval = null;

// =============================================
// 32. OPEN STORY TIMER
// =============================================

function openStoryTimer() {
    if (document.getElementById("storyTimer")) return;

    const page = document.createElement("section");

    page.id = "storyTimer";
    page.className = "story-timer-page";

    page.innerHTML = `
        <div class="story-timer-stars"></div>

        <button class="story-timer-back" id="closeStoryTimer">
            ← رجوع
        </button>

        <div class="story-timer-content">
            <span class="timer-eyebrow">OMER & NADA · FOREVER</span>

            <div class="timer-heart">♡</div>

            <h1>عداد حكايتنا</h1>

            <p class="timer-subtitle">
                من يوم ما بدأت أجمل حكاية.. وكل ثانية فيها بتساوي الدنيا ❤️
            </p>

            <div class="engagement-date">
                11 · 11 · 2026 <span>—</span> 08:00 PM
            </div>

            <div class="timer-grid">
                <div class="timer-unit">
                    <strong id="timerDays">0</strong>
                    <span>يوم</span>
                </div>

                <div class="timer-unit">
                    <strong id="timerHours">00</strong>
                    <span>ساعة</span>
                </div>

                <div class="timer-unit">
                    <strong id="timerMinutes">00</strong>
                    <span>دقيقة</span>
                </div>

                <div class="timer-unit">
                    <strong id="timerSeconds">00</strong>
                    <span>ثانية</span>
                </div>
            </div>

            <p class="timer-love-note">
                ولسه أجمل فصول الحكاية جاية.. ♡
            </p>

            <div class="timer-infinity">∞</div>
        </div>
    `;

    document.body.appendChild(page);
    document.body.classList.add("story-timer-open");

    requestAnimationFrame(() => {
        page.classList.add("story-timer-active");
    });

    page.querySelector("#closeStoryTimer")
        .addEventListener("click", closeStoryTimer);

    updateStoryTimer();

    clearInterval(storyTimerInterval);
    storyTimerInterval = setInterval(updateStoryTimer, 1000);
}

// =============================================
// 33. UPDATE STORY TIMER
// =============================================

function updateStoryTimer() {
    const now = new Date();
    const difference = Math.max(0, now - engagementDate);

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const daysElement = document.getElementById("timerDays");
    const hoursElement = document.getElementById("timerHours");
    const minutesElement = document.getElementById("timerMinutes");
    const secondsElement = document.getElementById("timerSeconds");

    if (!daysElement) return;

    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

// =============================================
// 34. CLOSE STORY TIMER
// =============================================

function closeStoryTimer() {
    const page = document.getElementById("storyTimer");

    if (!page) return;

    clearInterval(storyTimerInterval);
    storyTimerInterval = null;

    page.classList.remove("story-timer-active");
    document.body.classList.remove("story-timer-open");

    setTimeout(() => page.remove(), 500);
}

// =============================================
// 35. CONNECT THE THREE WORLDS
// =============================================

document.addEventListener("click", function (event) {
    const clickedButton = event.target.closest(
        ".world-card button, .world-card .explore-button"
    );

    if (!clickedButton) return;

    const card = clickedButton.closest(".world-card");

    if (!card) return;

    const title = card.querySelector("h2, h3");

    if (!title) return;

    const titleText = title.textContent.trim();

    if (titleText.includes("عالم الذكريات")) {
        event.preventDefault();
        openMemoryUniverse();
        return;
    }

    if (
        titleText.includes("مدينة اللعب") ||
        titleText.includes("مدينة الألعاب")
    ) {
        event.preventDefault();
        openGameCity();
        return;
    }

    if (titleText.includes("عداد حكايتنا")) {
        event.preventDefault();
        openStoryTimer();
    }
});