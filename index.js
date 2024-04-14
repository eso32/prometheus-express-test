const { Counter, register } = require('prom-client');
const express = require('express');


const app = express()
const port = 3000
const c = new Counter({
    name: 'requests_no',
    help: 'Ilosc requestow strony glownej',
    labelNames: ['code', 'client'],
});


app.get('/', (req, res) => {
    const client = Math.random() > 0.5 ? 'mozilla' : 'chrome';
    const code = Math.random() > 0.5 ? 200 : 400;
    c.inc({ code, client });
    res.send('Hello World!')
})


app.get('/bad', (req, res) => {
    c.inc({ code: 404, client: 'mozilla' });
    res.send('Hello World!')
})

app.get('/metrics-tom', async (req, res) => {
    const response = await register.metrics()
    console.log(response);
    res.send(response);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})