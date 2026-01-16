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

// ...pageNames と書くことで、引数がいくつあっても pageNames という配列に格納されます
function loadHeader(...pageNames) {
    fetch('/portfolio/common/header.html')
        .then(response => response.text())
        .then(data => {
            const headerArea = document.getElementById('header');
            if (headerArea) {
                headerArea.innerHTML = data;
            }

            pageNames.forEach(name => {
                if (name) {
                    // 1. querySelectorAll で、当てはまる要素をすべて取得する
                    const currentLinks = document.querySelectorAll(`.nav-item-${name}`);

                    // 2. 見つかったすべての要素に対して current-page を付与する
                    currentLinks.forEach(link => {
                        link.classList.add('current-page');
                    });
                }
            });

            initNav();
            initGlitter();
        })
        .catch(error => console.error('Error:', error));
}



