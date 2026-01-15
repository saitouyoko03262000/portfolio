// // common.js

// $(function () {
//     // ヘッダー読み込み
//     fetch("/portfolio/common/header.html")
//         .then((response) => response.text())
//         .then((data) => {
//             document.querySelector("#header").innerHTML = data;

//             // 1. nav.js のメニュー機能を実行
//             initNav();

//             // 2. hover-glitter.js のキラキラ機能を実行
//             initGlitter();

//             // 3. このファイル(common.js)にあるinview機能を実行
//         //     initInview();
//         });

//     // フッター読み込み
//     fetch("/portfolio/common/footer.html")
//         .then((response) => response.text())
//         .then((data) => {
//             document.querySelector("#footer").innerHTML = data;
//         });
// });

$(function () {
    // 1. 各HTML側で定義された変数「thisPageName」を取得する
    // もし定義されていなければ null になる
    const pageName = typeof thisPageName !== 'undefined' ? thisPageName : null;

    // ヘッダー読み込み
    fetch("/portfolio/common/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#header").innerHTML = data;

            initNav();      // メニューの動き
            initGlitter();  // キラキラ

            // ここで現在地ハイライトを実行！
            if (pageName && typeof highlightCurrentPage === "function") {
                highlightCurrentPage(pageName);
            }
        });
// });


// $(function () {
//     // ヘッダー読み込み
//     fetch("/portfolio/common/header.html")
//         .then((response) => {
//             if (!response.ok) throw new Error('Network response was not ok');
//             return response.text();
//         })
//         .then((data) => {
//             document.querySelector("#header").innerHTML = data;

//             // HTMLが挿入された後に実行する
//             if (typeof initNav === "function") initNav();
//             if (typeof initGlitter === "function") initGlitter();

//             console.log("Header loaded and scripts initialized");
//         })
//         .catch(error => console.error('Header Load Error:', error));

    // フッター読み込み
    fetch("/portfolio/common/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#footer").innerHTML = data;
        });
});

// inview専用の関数として名前を変えます
// function initInview() {
$(function () {
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
});
