import bodyParser from "body-parser"
import { EmbedBuilder, InteractionResponseType, InteractionWebhook, WebhookClient } from "discord.js"
import { Application, Request, Response } from "express"
import { ClientRequest, ServerResponse } from "http"
require('dotenv').config()
const express = require('express')
const app: Application = express()
const PORT = 3002
const jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(PORT, () => {
    console.log("ready on " + PORT + " port");
})

type BodyOrder = {
    user: {
        nick: string,
        photo: string
    },
    quantity: number,
    price: number,
    address: string,
}

const webhook = new WebhookClient({ id: "1040035942553092207", token: "RbQUP-Cddx6Z0xMDglKOmB4B8u6E0yrDY2vX8VkbamOQeQVV3Uce9fkB1E5G-TzT8oTr" })

app.post("/", jsonParser, async (req: Request, res: Response) => {
    const bodyString = JSON.stringify(await req.body)
    const body: BodyOrder = JSON.parse(bodyString)

    const embed = new EmbedBuilder().setColor('DarkVividPink').setAuthor({ name: body.user.nick, iconURL: body.user.photo }).setTitle("New order").
        setFields(
            { name: "Quantity", value: String(body.quantity), inline: true },
            { name: "Price", value: String(body.price), inline: true },
            { name: "Address", value: body.address, inline: true }
        )

    await webhook.send({ embeds: [embed] })

    res.status(200).send(JSON.stringify(null))
})