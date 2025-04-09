// browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//     console.log("Received response: ", response);
// });

// browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log("Received request: ", request);
// });

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        // DOMツリーが更新されたときに実行
        const divsWithRole = document.querySelectorAll('div[role="presentation"]');
        divsWithRole.forEach(el => {
            // 「おすすめ」のみj列が含まれるelを非表示にする
            if (el.textContent.includes('おすすめ')) {
                el.style.display = 'none';
//                observer.disconnect();
            }
        });
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
});
