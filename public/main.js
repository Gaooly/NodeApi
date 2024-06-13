const ajax = (method, url, callback) => {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback && callback(xhr.response, xhr);
		}
	};
	xhr.send();
};

const newPage = () => {
	let n = 1;
	const max = 3;
	const page = {};
	page.next = () => (n < max ? ++n : n);
	page.prev = () => (n > 1 ? --n : n);
	page.getn = () => n;
	return page;
};
const page = newPage();
const switchBtn = () => {
	const n = page.getn();
	getPrev.style.display = n <= 1 ? 'none' : 'inline-block';
	getNext.style.display = n >= 3 ? 'none' : 'inline-block';
};

const renderPage = res => {
	const array = JSON.parse(res);
	pageList.innerHTML = array.map(item => `<li>${item.id}</li>`).join('');
	switchBtn();
};

(() => {
	ajax('GET', `/page1`, res => renderPage(res));
	switchBtn();
})();

getCSS.onclick = () => {
	ajax('GET', '/1.css', res => {
		const style = document.createElement('style');
		style.innerHTML = res;
		document.head.appendChild(style);
	});
};

getJS.onclick = () => {
	ajax('GET', '/2.js', res => {
		const script = document.createElement('script');
		script.innerHTML = res;
		document.body.appendChild(script);
	});
};

getHTML.onclick = () => {
	ajax('GET', '/3.html', res => {
		const div = document.createElement('div');
		div.innerHTML = res;
		document.body.appendChild(div);
	});
};

getXML.onclick = () => {
	ajax('GET', '/4.xml', (_, xhr) => {
		const dom = xhr.responseXML;
		const text = dom.getElementsByTagName('warning')[0].textContent;
		alert(text.trim());
	});
};

getJSON.onclick = () => {
	ajax('GET', '/5.json', res => alert(JSON.parse(res).hi));
};

getNext.onclick = () => {
	ajax('GET', `/page${page.next()}`, res => renderPage(res));
};

getPrev.onclick = () => {
	ajax('GET', `/page${page.prev()}`, res => renderPage(res));
};
