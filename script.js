document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('heart');
    const card = document.getElementById('card');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isMusicPlaying = false; // 用來追蹤音樂是否正在播放

    // 嘗試自動播放音樂
    function playMusic() {
        if (!isMusicPlaying) {
            backgroundMusic.volume = 0.6; // 設定音量
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                console.log('音樂已自動播放');
            }).catch(error => {
                console.warn('自動播放音樂失敗，可能需要用戶互動:', error);
                // 在需要用戶互動時，可以顯示一個播放按鈕
            });
        }
    }

    // 當用戶與頁面互動時，再次嘗試播放音樂 (例如點擊愛心時)
    heart.addEventListener('click', () => {
        // 心形消失動畫
        heart.classList.remove('heart-pulse'); // 移除跳動動畫
        heart.classList.add('fade-out');

        // 在心形動畫結束後顯示卡片
        heart.addEventListener('animationend', () => {
            heart.style.display = 'none'; // 徹底隱藏心形
            card.classList.remove('hidden');
            card.classList.add('visible');
            playMusic(); // 用戶互動後播放音樂
        }, { once: true }); // 確保事件只觸發一次
    });

    // 點擊卡片翻轉
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    // 初始載入時嘗試播放音樂 (部分瀏覽器會限制)
    playMusic();
});

// 你可以在這裡加入一些雪花飄落的效果 (如果需要的話)
/*
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.width = Math.random() * 5 + 5 + 'px';
    snowflake.style.height = snowflake.style.width;
    snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(snowflake);

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

setInterval(createSnowflake, 300); // 每300毫秒創建一個雪花
*/
