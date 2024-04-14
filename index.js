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
    c.inc({ code: 200 });
    c.inc({ client: 'ios' });
    res.send('Hello World!')
})


app.get('/bad', (req, res) => {
    c.inc({ code: 404 });
    c.inc({ client: 'mozilla' });
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