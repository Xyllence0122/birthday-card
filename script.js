document.addEventListener('DOMContentLoaded', () => {
    const initialInteraction = document.getElementById('initial-interaction');
    const heart = document.getElementById('heart');
    const card = document.getElementById('card');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeControl = document.getElementById('volume-control');
    const backgroundDecorations = document.querySelector('.background-decorations'); // 修改為新的背景裝飾容器

    let isMusicPlaying = false;
    let isMuted = false;

    // --- 背景飄動的氣球和愛心設定 ---
    const floatingItems = ['🎈', '❤️', '💖', '💛', '🎉']; // 氣球、愛心和彩帶表情符號

    function createFloatingItem() {
        const item = document.createElement('span');
        item.classList.add('floating-item');
        item.textContent = floatingItems[Math.floor(Math.random() * floatingItems.length)];
        
        // 隨機初始位置 (從底部開始)
        item.style.left = Math.random() * 100 + 'vw';
        item.style.bottom = -10 + 'vh'; // 從螢幕下方開始

        // 設定 CSS 變量給動畫使用，增加隨風飄的感覺
        item.style.setProperty('--drift-amount', (Math.random() * 80 - 40) + 'vw'); // -40vw 到 40vw 的橫向飄移
        item.style.setProperty('--rotation-amount', (Math.random() * 720 - 360) + 'deg'); // -360度到360度的旋轉
        item.style.fontSize = (Math.random() * 1.5 + 1) + 'em'; // 隨機大小 1em-2.5em

        backgroundDecorations.appendChild(item);

        item.addEventListener('animationend', () => {
            item.remove();
            createFloatingItem(); // 持續生成新的飄動項目
        });
    }

    // 初始生成一些飄動項目
    for (let i = 0; i < 15; i++) { // 可以調整初始飄動項目數量
        createFloatingItem();
    }
    // 每隔一段時間生成新的項目，保持背景流動
    setInterval(createFloatingItem, 1500); // 每1.5秒生成一個新項目


    // --- 音樂播放控制 ---
    function tryPlayMusic() {
        if (!isMusicPlaying && !isMuted) {
            backgroundMusic.volume = 0.6; // 設定音量
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                console.log('音樂已播放');
                volumeControl.textContent = '🔊'; // 顯示播放圖標
            }).catch(error => {
                console.warn('自動播放音樂失敗，可能需要用戶互動:', error);
                // 這裡我們依賴用戶點擊愛心後播放
            });
        }
    }

    // 音量控制圖標點擊事件
    volumeControl.addEventListener('click', () => {
        if (isMuted) {
            backgroundMusic.muted = false;
            isMuted = false;
            volumeControl.textContent = '🔊';
            if (!isMusicPlaying) { // 如果之前因為靜音而停止播放，現在嘗試播放
                tryPlayMusic();
            }
        } else {
            backgroundMusic.muted = true;
            isMuted = true;
            volumeControl.textContent = '🔇';
        }
    });

    // --- 愛心點擊互動 ---
    heart.addEventListener('click', () => {
        // 嘗試播放音樂 (如果還沒播放)
        tryPlayMusic();

        // 隱藏初始互動區塊的動畫
        initialInteraction.classList.add('fade-out-interaction');

        // 在動畫結束後顯示卡片
        initialInteraction.addEventListener('animationend', () => {
            initialInteraction.style.display = 'none'; // 徹底隱藏初始區塊
            card.classList.remove('hidden');
            card.classList.add('visible');
        }, { once: true }); // 確保事件只觸發一次
    });

    // 點擊卡片翻轉
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    // 初始載入時嘗試播放音樂 (部分瀏覽器會限制，但這裡會先設定音量圖標)
    // 實際播放會在用戶點擊愛心時再次嘗試
    tryPlayMusic();
});
