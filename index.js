const express = require('express');
const {auth, resolver, protocol} = require('@iden3/js-iden3-auth')
const getRawBody = require('raw-body')

const app = express();
const port = 8080;

app.get("/api/signin", (req, res) => {
    console.log('get Auth Request')
    GetAruthRequest(req, res);
});

app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req, res)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
