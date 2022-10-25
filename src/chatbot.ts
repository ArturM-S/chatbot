import { LocalAuth, Message,Client, MessageMedia } from "whatsapp-web.js";

const qrcode = require('qrcode-terminal');

const client = new Client(
   { 
    puppeteer: {
        headless: false,
    },
    authStrategy: new LocalAuth()
}

);

client.on('qr', (qr: any) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// create a function that go to url and get screenshot of the page 


client.on('message_create', async (message: Message) => {
    if(message.body.startsWith('!noticia')) {
		async function getScreenshot() {
            const browser = await client.pupBrowser
            if(!browser) return
            const page = await browser.newPage();
            await page.goto(`https://www.google.com/search?q=${message.body.replace('!noticia', '')}&tbm=nws`);
            await page.click('div.mCBkyc.y355M.ynAwRc.MBeuO.nDgy9d');
            await page.waitForTimeout(7000);
            const image = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
            await page.close();
            return image;
        }
        
        // create a function that send screenshot to whatsapp
        async function sendScreenshot() {
            const image = await getScreenshot() as string;

            const media = new MessageMedia('image/jpeg', image);

            await message.reply( media);
        }
        sendScreenshot()
        console.log('screenshot sent')
	}
    if(message.body.startsWith('!pesquisa')) {
		async function getScreenshot() {
            const browser = await client.pupBrowser
            if(!browser) return
            const page = await browser.newPage();
            await page.goto(`https://www.google.com/search?q=${message.body.replace('!pesquisa', '')}`);
            await page.click('h3');
            await page.waitForTimeout(7000);
            const image = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
            await page.close();
            return image;
        }
        
        // create a function that send screenshot to whatsapp
        async function sendScreenshot() {
            const image = await getScreenshot() as string;

            const media = new MessageMedia('image/jpeg', image);

            await message.reply( media);
        }
        sendScreenshot()
        console.log('screenshot sent')
	}
    if(message.body.startsWith('!imagem')) {
		async function getScreenshot() {
            const browser = await client.pupBrowser
            if(!browser) return
            const page = await browser.newPage();
            await page.goto(`https://www.google.com/search?q=${message.body.replace('!imagem', '')}&tbm=isch`);
            await page.click('img.rg_i.Q4LuWd',{ button: "middle"});
            let pages = await browser.pages();

            await page.waitForTimeout(7000);
            const image = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
            await page.close();
            return image;
        }
        
        // create a function that send screenshot to whatsapp
        async function sendScreenshot() {
            const image = await getScreenshot() as string;

            const media = new MessageMedia('image/jpeg', image);

            await message.reply( media);
        }
        sendScreenshot()
        console.log('screenshot sent')
	}
    if(message.body === '!sticker') {
        if(message.hasMedia){
            const media = await message.downloadMedia();
            message.reply(media, undefined, {sendMediaAsSticker: true});
        }
        else{
            const quotedMessage = await message.getQuotedMessage();
            if(quotedMessage.hasMedia){
                const media = await quotedMessage.downloadMedia();
                message.reply(media, undefined, {sendMediaAsSticker: true});
            }
        }

    }
});


client.initialize();