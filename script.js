document.addEventListener('DOMContentLoaded', () => {
    const initialInteraction = document.getElementById('initial-interaction');
    const heart = document.getElementById('heart');
    const card = document.getElementById('card');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeControl = document.getElementById('volume-control');
    const bgImageContainer = document.getElementById('image-background-container');

    let isMusicPlaying = false;
    let isMuted = false;

    // --- 背景圖片飄落設定 ---
    // 請將您的背景圖片 (例如: 氣球, 花朵, 壽桃, 生日蛋糕等) 放在這裡。
    // 圖片檔案建議放在一個資料夾，例如 "images/"，然後像這樣設定路徑:
    const bgImageUrls = [
        'images/balloon1.png',
        'images/flower1.png',
        'images/cake_slice.png',
        'images/balloon2.png',
        'images/gift_box.png'
        // 您可以添加更多圖片路徑
    ];

    function createFallingImage() {
        if (bgImageUrls.length === 0) return; // 如果沒有設定圖片，則不執行

        const img = document.createElement('img');
        img.classList.add('falling-image');
        img.src = bgImageUrls[Math.floor(Math.random() * bgImageUrls.length)];
        img.style.left = Math.random() * 100 + 'vw'; // 隨機位置
        img.style.animationDuration = Math.random() * 10 + 10 + 's'; // 隨機動畫時間 10-20秒
        img.style.animationDelay = Math.random() * 5 + 's'; // 隨機延遲
        img.style.width = Math.random() * 40 + 30 + 'px'; // 圖片大小 30-70px
        bgImageContainer.appendChild(img);

        img.addEventListener('animationend', () => {
            img.remove(); // 動畫結束後移除元素
            createFallingImage(); // 創建新的圖片以持續效果
        });
    }

    // 初始生成一些背景圖片
    for (let i = 0; i < 10; i++) { // 可以調整初始圖片數量
        createFallingImage();
    }
    // 每隔一段時間生成新的圖片，保持背景流動
    setInterval(createFallingImage, 2000); // 每2秒生成一張新圖片


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
