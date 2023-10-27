const fetch = require('node-fetch');

const OPENAI_API_KEY = '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'; // 여기에 실제 API 키를 입력하세요.

fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: 'Say this is a test!'}],
        temperature: 0.7
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
