document.addEventListener("DOMContentLoaded", function () {
	// サンプルデモページのサイドメニューで選択されたエレメントを太字で強調する
	const ulElm = document.getElementById("menu-list");
	for (let i = 0; i < ulElm.childElementCount; i++) {
		if (window.location.href === ulElm.children[i].firstElementChild.href) {
			const b = document.createElement("b");
			const text = document.createTextNode(ulElm.children[i].firstElementChild.text);
			b.appendChild(text);
			ulElm.children[i].children[0].replaceWith(b);
			return;
		}
	}
});
