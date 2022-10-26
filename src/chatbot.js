"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
const client = new whatsapp_web_js_1.Client({
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"],
    },
    authStrategy: new whatsapp_web_js_1.LocalAuth()
});
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('Client is ready!');
});
// create a function that go to url and get screenshot of the page 
client.on('message_create', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.body.startsWith('!noticia')) {
        function getScreenshot() {
            return __awaiter(this, void 0, void 0, function* () {
                const browser = yield client.pupBrowser;
                if (!browser)
                    return;
                const page = yield browser.newPage();
                yield page.goto(`https://www.google.com/search?q=${message.body.replace('!noticia', '')}&tbm=nws`);
                yield page.click('div.mCBkyc.y355M.ynAwRc.MBeuO.nDgy9d');
                yield page.waitForTimeout(7000);
                const image = yield page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
                yield page.close();
                return image;
            });
        }
        // create a function that send screenshot to whatsapp
        function sendScreenshot() {
            return __awaiter(this, void 0, void 0, function* () {
                const image = yield getScreenshot();
                const media = new whatsapp_web_js_1.MessageMedia('image/jpeg', image);
                yield message.reply(media);
            });
        }
        sendScreenshot();
        console.log('screenshot sent');
    }
    if (message.body.startsWith('!pesquisa')) {
        function getScreenshot() {
            return __awaiter(this, void 0, void 0, function* () {
                const browser = yield client.pupBrowser;
                if (!browser)
                    return;
                const page = yield browser.newPage();
                yield page.goto(`https://www.google.com/search?q=${message.body.replace('!pesquisa', '')}`);
                yield page.click('h3');
                yield page.waitForTimeout(7000);
                const image = yield page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1000, height: 1250 } });
                yield page.close();
                return image;
            });
        }
        // create a function that send screenshot to whatsapp
        function sendScreenshot() {
            return __awaiter(this, void 0, void 0, function* () {
                const image = yield getScreenshot();
                const media = new whatsapp_web_js_1.MessageMedia('image/jpeg', image);
                yield message.reply(media);
            });
        }
        sendScreenshot();
        console.log('screenshot sent');
    }
    if (message.body.startsWith('!imagem')) {
        function getScreenshot() {
            return __awaiter(this, void 0, void 0, function* () {
                const browser = yield client.pupBrowser;
                if (!browser)
                    return;
                const page = yield browser.newPage();
                yield page.goto(`https://www.google.com/search?q=${message.body.replace('!imagem', '')}&tbm=isch`);
                yield page.click('img.rg_i.Q4LuWd');
                yield page.waitForTimeout(7000);
                const image = yield page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1250, height: 1250 } });
                yield page.close();
                return image;
            });
        }
        // create a function that send screenshot to whatsapp
        function sendScreenshot() {
            return __awaiter(this, void 0, void 0, function* () {
                const image = yield getScreenshot();
                const media = new whatsapp_web_js_1.MessageMedia('image/jpeg', image);
                yield message.reply(media);
            });
        }
        sendScreenshot();
        console.log('screenshot sent');
    }
    if (message.body === '!sticker') {
        if (message.hasMedia) {
            const media = yield message.downloadMedia();
            message.reply(media, undefined, { sendMediaAsSticker: true });
        }
        else {
            const quotedMessage = yield message.getQuotedMessage();
            if (quotedMessage.hasMedia) {
                const media = yield quotedMessage.downloadMedia();
                message.reply(media, undefined, { sendMediaAsSticker: true });
            }
        }
    }
}));
client.initialize();
