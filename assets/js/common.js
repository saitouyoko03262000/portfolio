function initNav() {
    // ...これまでのメニューの動き...

    // ここに inview の設定を入れる！
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

$(function () {
    // ヘッダー読み込み
    fetch("./common/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#header").innerHTML = data;

            // ここで nav.js の中身を起動する！
            initNav();
        });

    // フッター読み込み
    fetch("./common/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#footer").innerHTML = data;
        });
});