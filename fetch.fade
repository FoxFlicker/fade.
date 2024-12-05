const fetch = require('node-fetch');

const notionToken = 'YOUR_INTEGRATION_TOKEN';
const pageId = 'YOUR_PAGE_ID'; // Or database ID if you're querying a database.

async function fetchNotionPage() {
    const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${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}`,
            'Notion-Version': '2022-06-28',
        },
    });
    const data = await response.json();
    console.log(data);
}

fetchNotionPage();
