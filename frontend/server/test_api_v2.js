const http = require('http');

console.log('Testing connection to server...');

const data = JSON.stringify({
    user_email: 'debug@test.com',
    total: 120.00,
    payment_method: 'Card',
    items: [
        { product_id: 1, quantity: 1, size: 9, price: 120.00 }
    ]
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`PROBLEM: ${e.message}`);
});

req.write(data);
req.end();
