require('dotenv').config()
const express = require("express")
const app = express()
const PORT = 3002
const { Client } = require('pg')
const Discord = require("discord.js")

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "sklepik"
})

const webhook = new Discord.WebhookClient("")
// https://discord.com/api/webhooks/1040035942553092207/RbQUP-Cddx6Z0xMDglKOmB4B8u6E0yrDY2vX8VkbamOQeQVV3Uce9fkB1E5G-TzT8oTr

client.connect((err: any, client: any, done: any) => {
    if (err) {
        console.error("error");
    } else {
        console.log("connected to db");
        client.on("notification", (msg: any) => {
            console.log(msg.payload);
        })
        const query = client.query("LISTEN update_notification")
    }
})

app.use("/", async (req: any, res: any) => {
    res.send("dawda")
})