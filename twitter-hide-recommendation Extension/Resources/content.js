const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        // mutation : 変更されたDOM要素
        if (mutation.target.getAttribute('role') == "tablist") {
            const children = mutation.target.children;
            [...children].forEach(el => {
                if (el.textContent.includes('おすすめ')) {
                    // elがおすすめタブ
                    el.style.display = 'none';
//                  observer.disconnect();
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

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
});
