const axios = require('axios'); // need to install axios or use http. 
// Actually standard node http is better to avoid dependency check.

const http = require('http');

const data = JSON.stringify({
    user_email: 'test@debug.com',
    total: 150.00,
    payment_method: 'Card',
    items: [
        { product_id: 1, quantity: 1, size: 9, price: 150.00 }
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
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
