function initNav() {
    // 1. ヘッダー：スクロールしたら消える
    const header = $('.hide-header');
    const headerHeight = header.outerHeight();
    let beforeScrollTop = 0;

    $(window).off('scroll.header');
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
            if ($(window).scrollTop() > 100) {
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

// ヘッダー読み込み関数
function loadHeader(pageName) {
    fetch('./common/header.html')
        .then(response => response.text())
        .then(data => {
            // HTMLを挿入
            const headerArea = document.getElementById('header');
            if (headerArea) {
                headerArea.innerHTML = data;
            }

            // 現在地表示のクラス付与（.nav-item-works など）
            if (pageName) {
                const currentLink = document.querySelector(`.nav-item-${pageName}`);
                if (currentLink) {
                    currentLink.classList.add('current-page');
                }
            }

            // 【ここが重要！】
            // ヘッダーがHTMLに挿入された「直後」に、
            // ボタンやスクロールのイベントを登録する
            initNav();
        })
        .catch(error => console.error('Error loading header:', error));
}