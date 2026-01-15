// 全体を initNav という関数にまとめます
function initNav() {

    // 1. ヘッダー：スクロールしたら消える
    const header = $('.hide-header');
    const headerHeight = header.outerHeight();
    let beforeScrollTop = 0;

    $(window).off('scroll.header'); // 二重登録防止
    $(window).on('scroll.header', function () {
        const scrollTop = $(this).scrollTop();
        if ((scrollTop > beforeScrollTop) && (scrollTop > headerHeight)) {
            header.addClass('js_hide');
        } else {
            header.removeClass('js_hide');
        }
        beforeScrollTop = scrollTop;
    });

    // 2. ハンバーガーメニュー
    // off('click')を入れておくと、二重に動くのを防げます
    $('#js-hamburger-menu, .navigation__link').off('click').on('click', function () {
        $('.navigation').toggleClass('is-open');
        $('.hamburger-menu').toggleClass('hamburger-menu--open');
    });

    $(document).off('click.navClose').on('click.navClose', function (e) {
        if (!$(e.target).closest('.navigation').length && !$(e.target).closest('#js-hamburger-menu').length) {
            if ($('.navigation').hasClass('is-open')) {
                $('.navigation').removeClass('is-open');
                $('.hamburger-menu').removeClass('hamburger-menu--open');
            }
        }
    });

    // 3. 画面上部へ行く（TOPボタン）
    var btn = $('.button-top');
    var timer;

    $(window).off('scroll.topBtn');
    $(window).on('scroll.topBtn', function () {
        btn.removeClass('is-active');
        clearTimeout(timer);
        timer = setTimeout(function () {
            if ($(window).scrollTop() > 100) { // 少しスクロールしたら表示
                btn.addClass('is-active');
            } else {
                btn.removeClass('is-active');
            }
        }, 200);
    });

    btn.off('click').on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
}


// 他の initNav などの処理はそのまま残しておく

function loadHeader(pageName) {
    // パスはご自身の環境（/portfolio/common/header.htmlなど）に合わせてください
    fetch('/portfolio/common/header.html')
        .then(response => response.text())
        .then(data => {
            // 1. HTMLを挿入
            const headerArea = document.getElementById('header');
            if (headerArea) {
                headerArea.innerHTML = data;
            }

            // 2. current機能（現在地の判定）
            if (pageName) {
                const currentLink = document.querySelector(`.nav-item-${pageName}`);
                if (currentLink) {
                    currentLink.classList.add('current-page');
                }
            }

            // 3. 外部機能の起動（fetchが終わった後に行う）
            initNav();      // ハンバーガーメニューなど
            initGlitter();  // ★キラキラ機能をここで呼ぶ！
        })
        .catch(error => console.error('Error loading header:', error));
}


// // pageName引数を受け取るようにする
// function loadHeader(pageName) {
//     fetch('/portfolio/common/header.html')
//         .then(response => response.text())
//         .then(data => {
//             document.querySelector('header').innerHTML = data;

//             // 引数で渡されたクラス名に .current-page を付与する
//             if (pageName) {
//                 const currentLink = document.querySelector(`.nav-item-${pageName}`);
//                 if (currentLink) {
//                     currentLink.classList.add('current-page');
//                 }
//             }
//         });
// }

// // 制作実績ページ（index.html）なら
// loadHeader('works');

// // 私についてページ（about.html）なら
// loadHeader('about');