document.addEventListener('DOMContentLoaded', () => {
    const initialInteraction = document.getElementById('initial-interaction');
    const heart = document.getElementById('heart');
    const card = document.getElementById('card');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeControl = document.getElementById('volume-control');
    const bgImageContainer = document.getElementById('image-background-container');

    let isMusicPlaying = false;
    let isMuted = false;

    // --- 背景圖片飄落設定（城市圖片已刪除） ---
    const bgImageUrls = [
        'images/balloon1.png',
        'images/balloon2.png',
        'images/flower1.png',
        'images/gift_box.png',
        'images/heart1.png',
        'images/heart2.png'
    ];

    function createFallingImage() {
        if (bgImageUrls.length === 0) return;

        const img = document.createElement('img');
        img.classList.add('falling-image');
        img.src = bgImageUrls[Math.floor(Math.random() * bgImageUrls.length)];
        img.style.left = Math.random() * 100 + 'vw';
        img.style.animationDuration = Math.random() * 10 + 10 + 's';
        img.style.animationDelay = Math.random() * 5 + 's';
        img.style.width = Math.random() * 40 + 30 + 'px';
        bgImageContainer.appendChild(img);

        img.addEventListener('animationend', () => {
            img.remove();
            createFallingImage();
        });
    }

    // 初始就生成背景飄動（包含氣球與愛心）
    for (let i = 0; i < 15; i++) {
        createFallingImage();
    }
    setInterval(createFallingImage, 2000);

    // --- 音樂播放控制 ---
    function tryPlayMusic() {
        if (!isMusicPlaying && !isMuted) {
            backgroundMusic.volume = 0.6;
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                volumeControl.textContent = '🔊';
            }).catch(() => {});
        }
    }

    volumeControl.addEventListener('click', () => {
        if (isMuted) {
            backgroundMusic.muted = false;
            isMuted = false;
            volumeControl.textContent = '🔊';
            if (!isMusicPlaying) tryPlayMusic();
        } else {
            backgroundMusic.muted = true;
            isMuted = true;
            volumeControl.textContent = '🔇';
        }
    });

    heart.addEventListener('click', () => {
        tryPlayMusic();
        initialInteraction.classList.add('fade-out-interaction');
        initialInteraction.addEventListener('animationend', () => {
            initialInteraction.style.display = 'none';
            card.classList.remove('hidden');
            card.classList.add('visible');
        }, { once: true });
    });

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    tryPlayMusic();
});
