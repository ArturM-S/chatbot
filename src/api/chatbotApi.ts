// {
//     "messages":[
//       {
//         "body": "Sou Hélio, atendente virtual da AMS solar. Como posso te ajudar?",
//         "title": "Bem vindo",
//         "footer": "escolha uma opção",
//         "buttons": [
//           {
//             "id": "idbb1",
//             "body": "Fazer um orçamento"
//           },
//           {
//             "id": "idbb2",
//             "body": "Já sou cliente"
//           }
//         ]
//       },
//       {
//         "body": "Nome: telefone: email: endereço: consumo médio mensal:",
//         "title": "Para adianta seu orçamento, preciso das informações abaixo:",
//         "footer": "Por favor, digite as informações na ordem dada acima",
//         "buttons": [
//           {
//             "id": "idbb3",
//             "body": "Ok"
//           },
//           {
//             "id": "idbb4",
//             "body": "Voltar ao menu inicial"
//           }
//         ]
//       },
//       {
//         "body": "E em que podemos ajuda-lo hoje?",
//         "title": "Que legal!!",
//         "footer": "obs: não esqueça de realizar nossa pesquisa de satisfação que foi enviada no seu aplicativo de cliente =)",
//         "buttons": [
//           {
//             "id": "idbb5",
//             "body": "Mostrar dados da minha usina"
//           },
//           { 
//             "id": "idbb6",
//             "body": "Falar com atendente"
//           }
//         ]
//       }
//     ]
//   }

const express = require("express");

const app = express();

app.post("/messages", (req: { body: { body: any; title: any; footer: any; buttons: any; }; }, res: { send: (arg0: string) => void; }) => {
    const { body, title, footer, buttons } = req.body;
    const message = {
        body,
        title,
        footer,
        buttons,
    };
    app.push(message);
    res.send("ok");
});

app.get("/messages", (req, res) => {
    res.send(messages);
});


app.listen(33333);
