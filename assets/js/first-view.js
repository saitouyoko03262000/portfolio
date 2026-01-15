$(function () {
    // const container = $('#bubble-container');
    // const imageUrls = [
    //     'assets/img/first-view-chair-shop.png',
    //     'assets/img/first-view-chaina.png',
    //     'assets/img/first-view-korea.png',
    //     'assets/img/first-view-camera-kodak.png',
    //     'assets/img/first-view-stitch.png',
    //     'assets/img/first-view-camera-nikon.png',
    //     'assets/img/first-view-self.png'
    // ];

    const container = $('#bubble-container');
    if (!container.length) return;
    // 要素がないページでは実行しない

    // 画像の置き換え
    // --- HTMLから画像パスを読み込む ---
    // カンマ区切りで書かれたパスを配列に変換する
    const rawImages = container.attr('data-images');

    if (!rawImages) return;
    const imageUrls = rawImages.split(',');

    // --- 設定値 ---
    const minSpeed = 0.3;  // 最低速度
    const maxSpeed = 1.0;  // 最大速度


// 固定値（1920*1080）ではなく、現在のブラウザの表示領域を基準にする
    const baseWidth = $(window).width();  // 100vw相当のピクセル数
    const baseHeight = $(window).height(); // 100vh相当のピクセル数
    const baseArea = baseWidth * baseHeight;

    let bubbles = [];

    // ドラッグ管理用
    let draggingBubble = null;
    let offsetX = 0;
    let offsetY = 0;

    // 速度生成ヘルパー関数
    function getRandomSpeed() {
        const direction = Math.random() < 0.5 ? 1 : -1;
        const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        return direction * speed;
    }

    function createBubble(imgUrl) {
        const img = new Image();
        img.src = imgUrl;

        img.onload = function () {
            // コンテナ基準のサイズ計算
            const containerW = container.width();
            const containerH = container.height();
            const currentArea = containerW * containerH;

            let ratio = Math.min(1, Math.sqrt(currentArea / baseArea));
            if (ratio < 0.3) ratio = 0.3;

            const width = img.naturalWidth * ratio;
            const height = img.naturalHeight * ratio;

            const x = Math.random() * (containerW - width);
            const y = Math.random() * (containerH - height);

            const speedX = getRandomSpeed();
            const speedY = getRandomSpeed();

            const bubbleElement = $('<div></div>')
                .addClass('bubble')
                .css({
                    width: width + 'px',
                    height: height + 'px',
                    left: x + 'px',
                    top: y + 'px',
                    backgroundImage: 'url(' + imgUrl + ')',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    cursor: 'grab',
                    touchAction: 'auto' // 通常時はスクロール許可
                });

            container.append(bubbleElement);

            const bubbleObj = {
                element: bubbleElement,
                x: x,
                y: y,
                width: width,
                height: height,
                speedX: speedX,
                speedY: speedY,
                isDragging: false
            };

            // ドラッグ開始
            bubbleElement.on('mousedown touchstart', function (e) {
                draggingBubble = bubbleObj;
                bubbleObj.isDragging = true;
                bubbleObj.element.css({
                    'cursor': 'grabbing',
                    'touch-action': 'none' // ドラッグ中のみスクロール防止
                });

                const pageX = e.pageX || e.originalEvent.touches[0].pageX;
                const pageY = e.pageY || e.originalEvent.touches[0].pageY;

                // コンテナに対する相対位置を計算
                const containerOffset = container.offset();
                offsetX = pageX - (bubbleObj.x + containerOffset.left);
                offsetY = pageY - (bubbleObj.y + containerOffset.top);
            });

            bubbles.push(bubbleObj);
        };
    }

    // ドラッグ中
    $(window).on('mousemove touchmove', function (e) {
        if (draggingBubble) {
            const pageX = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : 0);
            const pageY = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : 0);

            const containerOffset = container.offset();
            draggingBubble.x = pageX - containerOffset.left - offsetX;
            draggingBubble.y = pageY - containerOffset.top - offsetY;
        }
    });

    // ドラッグ終了
    $(window).on('mouseup touchend', function () {
        if (draggingBubble) {
            draggingBubble.isDragging = false;
            draggingBubble.element.css({
                'cursor': 'grab',
                'touch-action': 'auto'
            });
            draggingBubble.speedX = getRandomSpeed();
            draggingBubble.speedY = getRandomSpeed();
            draggingBubble = null;
        }
    });

    imageUrls.forEach(url => createBubble(url));

    function animateBubbles() {
        requestAnimationFrame(animateBubbles);

        const containerW = container.width();
        const containerH = container.height();

        // 1. 位置更新
        bubbles.forEach(bubble => {
            if (!bubble.isDragging) {
                bubble.x += bubble.speedX;
                bubble.y += bubble.speedY;

                // 壁との跳ね返り
                if (bubble.x + bubble.width > containerW || bubble.x < 0) {
                    bubble.speedX *= -1;
                    bubble.x = Math.max(0, Math.min(bubble.x, containerW - bubble.width));
                }
                if (bubble.y + bubble.height > containerH || bubble.y < 0) {
                    bubble.speedY *= -1;
                    bubble.y = Math.max(0, Math.min(bubble.y, containerH - bubble.height));
                }
            }
        });

        // 2. 衝突判定
        for (let i = 0; i < bubbles.length; i++) {
            for (let j = i + 1; j < bubbles.length; j++) {
                const b1 = bubbles[i];
                const b2 = bubbles[j];
                const dx = (b2.x + b2.width / 2) - (b1.x + b1.width / 2);
                const dy = (b2.y + b2.height / 2) - (b1.y + b1.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (b1.width / 2) + (b2.width / 2);

                if (distance < minDistance) {
                    // 速度交換
                    const tx = b1.speedX; const ty = b1.speedY;
                    b1.speedX = b2.speedX; b1.speedY = b2.speedY;
                    b2.speedX = tx; b2.speedY = ty;

                    // めり込み防止
                    const overlap = minDistance - distance;
                    const nx = dx / distance; const ny = dy / distance;
                    if (b1.isDragging) {
                        b2.x += nx * overlap; b2.y += ny * overlap;
                    } else if (b2.isDragging) {
                        b1.x -= nx * overlap; b1.y -= ny * overlap;
                    } else {
                        b1.x -= nx * overlap / 2; b1.y -= ny * overlap / 2;
                        b2.x += nx * overlap / 2; b2.y += ny * overlap / 2;
                    }
                }
            }
        }

        // 3. 描画反映
        bubbles.forEach(bubble => {
            bubble.element.css({
                left: bubble.x + 'px',
                top: bubble.y + 'px'
            });
        });
    }
    animateBubbles();
});