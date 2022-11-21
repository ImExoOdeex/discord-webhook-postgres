import bodyParser from "body-parser"
import { Embed, EmbedBuilder, InteractionResponseType, InteractionWebhook, WebhookClient } from "discord.js"
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

if (!process.env.TOKEN) throw new Error("TOKEN is not definied")

const webhook = new WebhookClient({ id: "1040035942553092207", token: process.env.TOKEN })

app.post("/", jsonParser, async (req: Request, res: Response) => {
    const bodyString = JSON.stringify(await req.body)
    const body: BodyOrder = JSON.parse(bodyString)

    const embed: Embed | any = {
        color: 0xF2A1E7,
        author: {
            name: body.user.nick,
            iconURL: body.user.photo
        },
        title: "New order",
        description: `**Quantity** \u200B \u200B \u200B ${String(body.quantity)}\n**Price** \u200B \u200B \u200B ${String(body.price)}\n**Address** \u200B \u200B \u200B ${body.address}`
    }

    await webhook.send({ embeds: [embed] })

    res.status(200).send(JSON.stringify(null))
})