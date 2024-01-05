const express = require('express');
const {auth, resolver, protocol} = require('@iden3/js-iden3-auth');
const getRawBody = require('raw-body');

const app = express();
const port = 8080;
    
app.get("/api/sign-in", async (req, res) => {
        console.log('get Auth Request');
        GetAuthRequest(req,res)
    }
);
    
app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req,res)});app.listen(port, () => {
        console.log('server running on port 8080')
    }
);
        
const requestMap = new Map();

async function GetAuthRequest(req,res) {

    const hostUrl = "http://localhost"; // <NGROK_URL>
    const sessionId = 1;
    const callbackURL = "/api/callback"
    const audience = "did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs"

    const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    const request = auth.createAuthorizationRequest(
        'test flow',
        audience,
        uri,
    );
                    
    request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
    request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';


    const proofRequest = {
        id: 1,
        circuitId: 'credentialAtomicQuerySigV2',
        query: {
            allowedIssuers: ['*'],
            type: 'KYCAgeCredential',
            context: 'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
            credentialSubject: {
            birthday: {
                $lt: 20000101,
            },
            },
        },
    };

    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];
                    
    requestMap.set(`${sessionId}`, request);

    return res.status(200).set('Content-Type', 'application/json').send(request);  
            
}
