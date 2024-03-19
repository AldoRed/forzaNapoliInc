const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //You can get this from a database
    const scheme = [
        { name: "SWOT", done: 1, check: 0 },
        { name: "Mind Map", done: 1, check: 1 },
        { name: "Use Case", done: 1, check: 0 }
    ];
    res.render('main', { scheme: scheme });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});