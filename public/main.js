const ajax = (method, url, callback) => {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback && callback(xhr.response);
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
getJSON.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('get', '/5.json');
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			console.log(typeof request.response);
			console.log(request.response);
			alert(JSON.parse(request.response).hi);
		}
	};
	request.send();
};
getXML.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', '/4.xml');
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			const dom = request.responseXML;
			const text = dom.getElementsByTagName('warning')[0].textContent;
			console.log(text.trim());
		}
	};
	request.send();
};
getHTML.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', '/3.html');
	request.onload = () => {
		// 创建 div 标签
		const div = document.createElement('div');
		// 填写 div 内容
		div.innerHTML = request.response;
		// 插入到身体里
		document.body.appendChild(div);
	};
	request.onerror = () => {};
	request.send();
};
getJS.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', '/2.js');
	request.onload = () => {
		// 创建 script 标签
		const script = document.createElement('script');
		// 填写 script 内容
		script.innerHTML = request.response;
		// 插到身体里
		document.body.appendChild(script);
	};
	request.onerror = () => {};
	request.send();
};

