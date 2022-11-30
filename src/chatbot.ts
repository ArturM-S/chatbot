import { LocalAuth, Message, Client, Buttons } from "whatsapp-web.js";
const express = require("express");
const app = express();

const qrcode = require("qrcode-terminal");

const axios = require("axios");

const client = new Client({
  puppeteer: {
    headless: false,
    args: ["--no-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

interface ResponseProps {
  body: string;
  title: string;
  footer: string;
  buttons: [
    {
      id: string;
      body: string;
    }
  ];
}

app.get("/bot", async (req: any, res: any) => {
  client.on("message", async (message: Message) => {
    const { data } = await axios.get("http://localhost:8080/messages");
    if (message.body === "Oi") {
      let chat = undefined;
      try {
        chat = await message.getChat();
        console.log("🚀 ~ file: chatbot.ts ~ line 46 ~ client.on ~ chat", chat);
      } catch (error) {
        console.log(
          "🚀 ~ file: chatbot.ts ~ line 49 ~ client.on ~ error",
          error
        );
      }
      try {
        const response: ResponseProps = data[0];
        if (response) {
          await message.react("🔄");
          await client.sendMessage(
            chat ? chat.id._serialized : message.from,
            //   message.from, // em grupo, isso nao funciona, pq ta enviando pra quem mandou a msg, nao pro chat
            new Buttons(
              response.body,
              response.buttons,
              response.title,
              response.footer
            )
          );
          await message.react("👍");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (message.body === data[0].buttons[0].body) {
      let chat = undefined;
      try {
        chat = await message.getChat();
        console.log("🚀 ~ file: chatbot.ts ~ line 46 ~ client.on ~ chat", chat);
      } catch (error) {
        console.log(
          "🚀 ~ file: chatbot.ts ~ line 49 ~ client.on ~ error",
          error
        );
      }
      try {
        const response: ResponseProps = data[1];
        if (response) {
          await message.react("🔄");
          await client.sendMessage(
            chat ? chat.id._serialized : message.from,
            //   message.from, // em grupo, isso nao funciona, pq ta enviando pra quem mandou a msg, nao pro chat
            new Buttons(
              response.body,
              response.buttons,
              response.title,
              response.footer
            )
          );
          await message.react("👍");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (message.body === data[0].buttons[1].body) {
      let chat = undefined;
      try {
        chat = await message.getChat();
        console.log("🚀 ~ file: chatbot.ts ~ line 46 ~ client.on ~ chat", chat);
      } catch (error) {
        console.log(
          "🚀 ~ file: chatbot.ts ~ line 49 ~ client.on ~ error",
          error
        );
      }
      try {
        const response: ResponseProps = data[2];
        if (response) {
          await message.react("🔄");
          await client.sendMessage(
            chat ? chat.id._serialized : message.from,
            //   message.from, // em grupo, isso nao funciona, pq ta enviando pra quem mandou a msg, nao pro chat
            new Buttons(
              response.body,
              response.buttons,
              response.title,
              response.footer
            )
          );
          await message.react("👍");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  client.initialize();
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});


//     if(message.body.startsWith('!noticia')) {
//         try {
//             message.react('🔄');
//             async function getScreenshot() {
//                 const browser = await client.pupBrowser
//                 if(!browser) return
//                 const page = await browser.newPage();
//                 await page.goto(`https://www.google.com/search?q=${message.body.replace('!noticia', '')}&tbm=nws`);
//                 await page.click('div.mCBkyc.y355M.ynAwRc.MBeuO.nDgy9d');
//                 await page.waitForTimeout(7000);
//                 const image = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
//                 await page.close();
//                 return image;
//         }

//         async function sendScreenshot() {
//             const image = await getScreenshot() as string;

//             const media = new MessageMedia('image/jpeg', image);

//             await message.reply( media);
//         }
//         sendScreenshot()
//         message.react('👍');
//         console.log('screenshot sent')
//         } catch (error) {
//             message.react('❌');
//         }
//     }
//     if(message.body.startsWith('!pesquisa')) {
//         try {
//         message.react('🔄');

// 		async function getScreenshot() {
//             const browser = await client.pupBrowser
//             if(!browser) return
//             const page = await browser.newPage();
//             await page.goto(`https://www.google.com/search?q=${message.body.replace('!pesquisa', '')}`);
//             await page.click('h3');
//             await page.waitForTimeout(7000);
//             const image = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1000, height: 1250 } });
//             await page.close();
//             return image;
//         }

//         // create a function that send screenshot to whatsapp
//         async function sendScreenshot() {
//             const image = await getScreenshot() as string;

//             const media = new MessageMedia('image/jpeg', image);

//             await message.reply( media);
//         }
//         sendScreenshot()
//         message.react('👍');

//         console.log('screenshot sent')
// 	}
//     catch (error) {
//         message.react('❌');
//     }
//     }
//     if(message.body.startsWith('!imagem')) {
//         try {
//         message.react('🔄');

// 		async function getScreenshot() {
//             const browser = await client.pupBrowser
//             if(!browser) return
//             const page = await browser.newPage();
//             await page.goto(`https://www.google.com/search?q=${message.body.replace('!imagem', '')}&tbm=isch`);
//             await page.click('img.rg_i.Q4LuWd');
//             await page.waitForTimeout(7000);
//             const image = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
//             await page.close();
//             return image;
//         }

//         // create a function that send screenshot to whatsapp
//         async function sendScreenshot() {
//             const image = await getScreenshot() as string;

//             const media = new MessageMedia('image/jpeg', image);

//             await message.reply( media);
//         }
//         sendScreenshot()
//         message.react('👍');

//         console.log('screenshot sent')
// 	}
//     catch (error) {
//         message.react('❌');
//     }
//     }
//     if(message.body === '!sticker') {
//         try {
//         message.react('🔄');

//         if(message.hasMedia){
//             const media = await message.downloadMedia();
//             message.reply(media, undefined, {sendMediaAsSticker: true});
//             message.react('👍');

//         }
//         else{
//             const quotedMessage = await message.getQuotedMessage();
//             if(quotedMessage.hasMedia){
//                 const media = await quotedMessage.downloadMedia();
//                 message.reply(media, undefined, {sendMediaAsSticker: true});
//                 message.react('👍');

//             }
//         }

//     }
//     catch (error) {
//         message.react('❌');
//     }
//     }
//     //create a function that send a message if the message.body contains a word

// });

//create a endpoint to call the function bellow
