const { BaseScene: Scene } = require('telegraf');
const express = require("express");
const app = express();
const PORT = 3000;
const TOKEN = "717820910:AAGIJhGcACoi2KhCPTMfZHCgeWAqMLuqeNs";
const Telegraf = require('telegraf');
const id =974382806;
const Markup = require('telegraf/markup');
const reportFlow = require('./reports');
const { session } = Telegraf;
const keyboards = require("./reports/keyboards");

const bot = new Telegraf(TOKEN);
app.use(bot.webhookCallback("/telegram"));
bot.telegram.setWebhook("https://e4e2b9f7.ngrok.io/telegram");
bot.use(session());
reportFlow && bot.use(reportFlow().middleware());
app.get("/telegraf/reports",(req,res)=>{


bot.telegram.sendMessage(id,'Вітаємо вас в формі вводу даних пацієнта, давайте почнемо',{
    reply_markup:{
        keyboard:[
            ["Розочати заповнення форми"]
        ]
    }
});
res.sendStatus(200);

});

bot.on("message",async ctx=>{
    if(ctx.message.text=="Розочати заповнення форми"){
        await ctx.reply("Вкажіть ім'я і фамілію пацієнта",Markup.removeKeyboard().extra());
        await ctx.scene.enter('getPatientName')}


})

bot.command("start", (ctx,next)=>{



});



app.listen(3000,()=>{
    console.log("Example app listening on port 3000!")
});
/*
app.get("/",(req,res)=>{
    res.send("Hellp World");
    bot.telegram.sendMessage(id,"Hello")
});

bot.on("message", msg=>{
    const{chat:{id}}=msg;
    console.log(id);
    bot.telegram.sendMessage(id,"Pong")
});

app.listen(3000,()=>{
    console.log("Example app listening on port 3000!")
});*/
