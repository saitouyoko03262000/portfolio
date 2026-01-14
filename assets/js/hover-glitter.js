    // js-glitterクラスがついた要素を全て取得
    const glitterEls = document.querySelectorAll(".js-glitter");

    // 取得した要素をArrayに変換
    const glitterElsArr = Array.prototype.slice.call(glitterEls);

    // 取得した要素ひとつひとつに処理を行う
    glitterElsArr.forEach((glitterEl) => {
        let interval;

        // マウスホバー時にキラキラを生成
        glitterEl.addEventListener("mouseenter", () => {
            interval = setInterval(createStar.bind(undefined, glitterEl), 200);
        });

        // マウスを離すと停止
        glitterEl.addEventListener("mouseleave", () => {
            clearInterval(interval);
        });
    });

    // キラキラを生成する関数
    const createStar = (el) => {
        const starEl = document.createElement("span");
        starEl.className = "star";
        starEl.style.left = Math.random() * el.clientWidth + "px";
        starEl.style.top = Math.random() * el.clientHeight + "px";
        el.appendChild(starEl);

        // 一定時間経つとキラキラを消す
        setTimeout(() => {
            starEl.remove();
        }, 1000);
    };
