require('dotenv').config()
const express = require("express")
const nodemailer = require("nodemailer")
const { google } = require("googleapis")


const OAuth2 = google.auth.OAuth2
const PORT = process.env.port || 6000;
const app = express()

app.use(express.json());

const myOAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env, CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);


const myAccessToken = myOAuth2Client.getAccessToken();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: myAccessToken
    }
})

myOAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

app.get("/", (req, res) => {
    res.status(200).json({ message: "Root route , refer to docs for more info" });
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})