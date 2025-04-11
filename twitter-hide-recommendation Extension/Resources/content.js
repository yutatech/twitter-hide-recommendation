const recomendation_tab_observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
//        console.log(mutation.target);
        // mutation : 変更されたDOM要素
        if (mutation.target.getAttribute('role') == "tablist") {
            const children = mutation.target.children;
            [...children].forEach(el => {
                if (el.textContent.includes('おすすめ')) {
                    // elがおすすめタブ
                    el.style.display = 'none';
                } else if (el.textContent.includes('フォロー中')) {
                    // elがフォロー中タブ
                    const anchor = el.querySelector("a");
                    if (anchor) {
                      const selected = anchor.getAttribute("aria-selected");
                      if (selected === "false") {
                          // フォロー中タブが選択状態でなければタブを切り替え
                          anchor.click();
                      }
                    }
                }
            });
        }
    }
});

recomendation_tab_observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
});

const timeline_observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.target.childNodes.forEach(el => {
                if (el.textContent.includes('プロモーション')) {
                    // elの子要素に"プロモーション"の文字列を含むとき、elを非表示
                    el.style.display = 'none';
                    console.log(el);
                }
            });
        }
    }
});

const body_observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
            const timeline = mutation.target.querySelector('[aria-label="タイムライン: ホームタイムライン"]');
            if (timeline === null) {
                continue;
            } else if (timeline.querySelector('[data-testId="cellInnerDiv"]') === null) {
                continue;
            }
            // ホームタイムライン要素が構築されたら
            body_observer.disconnect();
            
            // タイムラインの子要素が追加/削除されたら通知
            timeline_observer.observe(timeline.childNodes[0], {
                childList: true,
            });
        break;
    }
});

body_observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
});
