// ヘッダー　スクロールしたら消える
$(function () {

    const header = $('.hide-header');
    const headerHeight = header.outerHeight();
    let beforeScrollTop = 0;
    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop();
        if ((scrollTop > beforeScrollTop) && (scrollTop > headerHeight)) {
            header.addClass('js_hide');
        }
        else {
            header.removeClass('js_hide');
        }
        beforeScrollTop = scrollTop;
    });
});

// ハンバーガーメニュー
$(function () {
    $('#js-hamburger-menu, .navigation__link').on('click', function () {
        $('.navigation').toggleClass('is-open')
        $('.hamburger-menu').toggleClass('hamburger-menu--open')
    });

    $(document).on('click', function (e) {
        // クリックされた場所が「メニュー本体」でも「ボタン」でもなければ閉じる
        if (!$(e.target).closest('.navigation').length && !$(e.target).closest('#js-hamburger-menu').length) {
            if ($('.navigation').hasClass('is-open')) {
                $('.navigation').removeClass('is-open');
                $('.hamburger-menu').removeClass('hamburger-menu--open');
            }
        }
    });
});

// 画面上部へ行く、スクロール中は非表示
$(function () {
    var btn = $('.button-top');
    var timer;

    $(window).scroll(function () {
        //スクロール開始するとボタンを非表示
        btn.removeClass('is-active');

        //スクロール中はイベントの発火をキャンセルする
        clearTimeout(timer);

        //スクロールが停止して0.2秒後にイベントを発火する
        timer = setTimeout(function () {
            //スクロール位置を判定してページ上部のときはボタンを非表示にする
            if ($(this).scrollTop()) {
                btn.addClass('is-active');
            } else {
                btn.removeClass('is-active');
            }
        }, 200);
    });

    //ボタンクリックでトップへ戻る
    btn.on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });
});