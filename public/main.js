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


let n = 1;
// console.log(getPrevious.style.display)
getPrevious.style.display = 'none';
function isBtnShow(page) {
	page === 1 ? (getPrevious.style.display = 'none') : (getPrevious.style.display = 'inline-block');
	page === 3 ? (getPage.style.display = 'none') : (getPage.style.display = 'inline-block');
}
getPage.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', `/page${++n}`);
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			const array = JSON.parse(request.response);
			let arrayLi = [];
			array.forEach(item => {
				arrayLi.push(`<li>${item.id}</li>`);
			});
			xxx.innerHTML = arrayLi.join('');
			isBtnShow(n);
		}
	};
	request.send();
};
getPrevious.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', `/page${--n}`);
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			const array = JSON.parse(request.response);
			let arrayLi = [];
			array.forEach(item => {
				arrayLi.push(`<li>${item.id}</li>`);
			});
			xxx.innerHTML = arrayLi.join('');
			isBtnShow(n);
		}
	};
	request.send();
};
