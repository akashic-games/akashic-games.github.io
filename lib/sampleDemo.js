document.addEventListener("DOMContentLoaded", function () {
	// サンプルデモページのサイドメニューで選択されたエレメントを太字で強調し親のアコーディオンメニューを開く
	const liElm = document.getElementsByClassName("twocol-side")[0].getElementsByTagName("li");
	for (let i = 0; i < liElm.length; i++) {
		if (window.location.href === liElm[i].firstElementChild.href) {
			const b = document.createElement("b");
			const text = document.createTextNode(liElm[i].firstElementChild.text);
			b.appendChild(text);
			liElm[i].children[0].replaceWith(b);
			liElm[i].parentElement.previousElementSibling.checked = false
			return;
		}
	}
});
