// common.js

$(function () {
    // ヘッダー読み込み
    fetch("./common/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#header").innerHTML = data;

            // 1. nav.js のメニュー機能を実行
            initNav();
            
            // 2. hover-glitter.js のキラキラ機能を実行
            initGlitter();
            
            // 3. このファイル(common.js)にあるinview機能を実行
            initInview();
        });

    // フッター読み込み
    fetch("./common/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#footer").innerHTML = data;
        });
});

// inview専用の関数として名前を変えます
function initInview() {
    $(".inview").off("inview").on("inview", function (event, isInView) {
        if (isInView) {
            $(this).stop().addClass("is-show");
        }
    });

    $(".inview_re").off("inview").on("inview", function (event, isInView) {
        if (isInView) {
            $(this).stop().addClass("is-show");
        } else {
            $(this).stop().removeClass("is-show");
        }
    });
}