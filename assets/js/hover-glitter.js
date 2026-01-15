// assets/js/hover-glitter.js


function initGlitter() {
    // js-glitterクラスがついた要素を全て取得
    const glitterEls = document.querySelectorAll(".js-glitter");
    const glitterElsArr = Array.prototype.slice.call(glitterEls);

    glitterElsArr.forEach((glitterEl) => {
        let interval;
        glitterEl.addEventListener("mouseenter", () => {
            interval = setInterval(createStar.bind(undefined, glitterEl), 200);
        });
        glitterEl.addEventListener("mouseleave", () => {
            clearInterval(interval);
        });
    });
}

// キラキラを生成する関数（これは外に出しておいてOK）
const createStar = (el) => {
    const starEl = document.createElement("span");
    starEl.className = "star";
    starEl.style.left = Math.random() * el.clientWidth + "px";
    starEl.style.top = Math.random() * el.clientHeight + "px";
    el.appendChild(starEl);

    setTimeout(() => {
        starEl.remove();
    }, 1000);
};