const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const { path: requestPath } = event;
    let contentType = 'text/html';
    let content;

    if (requestPath === '/' || requestPath === '/index.html') {
        content = fs.readFileSync('index.html', 'utf8');
    } else if (requestPath === '/main.css') {
        content = fs.readFileSync('main.css', 'utf8');
        contentType = 'text/css';
    } else {
        return {
            statusCode: 404,
            body: 'Not Found'
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': contentType,
        },
        body: content,
    };
};