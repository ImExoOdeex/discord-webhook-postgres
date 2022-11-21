"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
require('dotenv').config();
var express = require("express");
var app = express();
var PORT = 3002;
var webhook = new discord_js_1.WebhookClient({ id: "1040035942553092207", token: "RbQUP-Cddx6Z0xMDglKOmB4B8u6E0yrDY2vX8VkbamOQeQVV3Uce9fkB1E5G-TzT8oTr" });
app.listen(PORT, function () {
    console.log("ready on " + PORT + " port");
});
app.get("/", function (req, res) {
    webhook.send("new order");
});
