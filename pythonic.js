const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("");
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

//UPTİME

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://berhayat-uptimeeeeee.glitch.me/`);
}, 280000);

//OYNUYOR KISMI

client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Berhayat Uptime",
      type: "WATCHING",
      url: "https://berhayat-uptimeeeeee.glitch.me/"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları

const help = new discord.MessageEmbed()
.setFooter("berhayat uptime ")
.setImage('https://topg.org/image/501220/414175.gif?0.6886732896740169?0.5085420072426856?0.9513922640712948?0.3424285827366036?0.5338549821426395?0.5449499285357937?0.3933314567442603?0.3430668976575686?0.254572444729696?0.9776766210299792?0.45125517663748216?0.7600083701615441?0.2015197885267006?0.6233264722596898?0.4625203434324183')

.setColor("RED")
.setThumbnail('https://topg.org/image/501220/414175.gif?0.6886732896740169?0.5085420072426856?0.9513922640712948?0.3424285827366036?0.5338549821426395?0.5449499285357937?0.3933314567442603?0.3430668976575686?0.254572444729696?0.9776766210299792?0.45125517663748216?0.7600083701615441?0.2015197885267006?0.6233264722596898?0.4625203434324183')
.setDescription(`Selamlar, botunu uptime etmeye hazırmısın? \n artık kolay bir şekilde botunu 7/24 aktif edebilirsin! \n\n🤹 uptime olmak için \`bh!ekle [glitch linki]\` yazabilirsin \n🎭 Uptime ettiğin botlarımı görmek istiyorsun \`bh!göster\` `)








client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "bh!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("Berhayat-uptime").setColor("RED").setDescription("Projeniz Sistemimizde Zaten Var"));
        message.channel.send(new discord.MessageEmbed().setFooter("Berhayat-uptime").setColor("RED").setDescription("Projeniz Sistemimize Başarıyla Eklendi."));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Berhayat-uptime").setColor("RED").setDescription("Lütfen Bir Link Giriniz"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "bh!göster") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Berhayat-uptime").setColor("RED").setDescription(`${db.get("linkler").length} Proje Aktif Tutuluyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "bh!yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});
