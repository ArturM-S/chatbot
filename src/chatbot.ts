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


client.on('message_create', (message: Message) => {
	console.log(message.body);
    if(message.body === '!screenshot') {
		async function getScreenshot() {
            const browser = await client.pupBrowser
            if(!browser) return
            const page = await browser.newPage();
            await page.goto('https://www.w3schools.com/jsref/met_win_print.asp');
            // get screenshot ins base64 as string
        
            const image = await page.screenshot({ encoding: 'base64' });
            await page.close();
            return image;
            console.log(image);
        }
        
        // create a function that send screenshot to whatsapp
        async function sendScreenshot() {
            const image = await getScreenshot() as string;

            const media = new MessageMedia('image/png', image, 'screenshot.png');

            await message.reply( media);
        }
        sendScreenshot()
        console.log('screenshot sent')
	}
});


client.initialize();