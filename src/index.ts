import { WebhookClient } from "discord.js"
import createPostgresSubscriber from "pg-listen"

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

const webhook = new WebhookClient({ id: "1040035942553092207", token: "RbQUP-Cddx6Z0xMDglKOmB4B8u6E0yrDY2vX8VkbamOQeQVV3Uce9fkB1E5G-TzT8oTr" })

const subscriber = createPostgresSubscriber({ connectionString: process.env.DB_URL })

connect()

subscriber.notifications.on("Order", (payload) => {
    // Payload as passed to subscriber.notify() (see below)
    console.log("Received notification in 'Order':", payload)
})

export async function connect() {
    await subscriber.connect()
    await subscriber.listenTo("Order")
}

export async function sendSampleMessage() {
    await subscriber.notify("Order", {
        greeting: "Hey, buddy.",
        timestamp: Date.now()
    })
}