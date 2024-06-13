const http = require('http');
const fs = require('fs');
const url = require('url');
const routes = require('./routes');
const port = process.argv[2];
if (!port) {
	console.log('请指定端口号, ↓ 如下示例  \nnode server 8888');
	process.exit(1);
}

const render = (res, { code, type, file }) => {
	res.statusCode = code;
	res.setHeader('Content-Type', `text/${type};charset=utf-8`);
	res.write(fs.readFileSync(file));
	res.end();
};

const server = http.createServer(function (request, response) {
	const parsedUrl = url.parse(request.url, true);
	const pathWithQuery = request.url;
	let queryString = '';
	if (pathWithQuery.indexOf('?') >= 0) {
		queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
	}
	const path = parsedUrl.pathname;
	const method = request.method;

	console.log(`收到请求！路径（带查询参数）为：${method} ${path} ${queryString}`);

	if (routes[path]) {
		const { type, file } = routes[path];
		render(response, { code: 200, type, file });
		return;
	}

	if (!path) {
		render(response, { code: 200, type: 'html', file: 'public/index.html' });
		return;
	}

	render(response, { code: 404, type: 'html', file: 'public/404.html' });
});

server.listen(port);
console.log('服务开启成功, 请点击 http://localhost:' + port + '/index.html');
