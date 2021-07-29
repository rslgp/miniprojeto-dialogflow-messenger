var express = require('express');
const { response } = require('../app');
var router = express.Router();

var serverModule = require('../bin/www');

/* req.body
{
  responseId: 'c647653b-beab-4d8d-9688-8367c937082d-046d94d0',
  queryResult: {
    queryText: 'esporte',
    action: 'escolher_tema',
    parameters: { tema: 'esporte' },
    allRequiredParamsPresent: true,
    fulfillmentMessages: [ [Object] ],
    outputContexts: [ [Object] ],
    intent: {
      name: 'projects/newagent-tesn/agent/intents/fa81b10a-4efd-458c-8b06-9e4e5e897814',
      displayName: 'escolheu_tema'
    },
    intentDetectionConfidence: 1,
    languageCode: 'pt-br',
    sentimentAnalysisResult: { queryTextSentiment: [Object] }
  },
  originalDetectIntentRequest: { source: 'DIALOGFLOW_CONSOLE', payload: {} },
  session: 'projects/newagent-tesn/agent/sessions/f0fbbe93-b1e9-039e-64ae-171c856a8719'
}
*/

/* facebook payload
{
  data: {
    sender: { id: '6244316462260158' },
    recipient: { id: '734411214004575' },
    timestamp: '1627427528376',
    message: {
      text: 'esporte',
      mid: 'm_Ia3paLytP19yGSxSC45J3iWD3RRkoTGmv_o7qpNoW6JG8AUPWajlJT0785nzIHDtpxAC1mHiGPfkqHKXalEIag'
    }
  }
}
*/

/* fulfillment responses
{
  "responseId": "db349d6b-1aaa-488d-8296-eda3fc604518-046d94d0",
  "queryResult": {
    "queryText": "oi",
    "action": "input.welcome",
    "parameters": {},
    "allRequiredParamsPresent": true,
    "fulfillmentMessages": [
      {
        "quickReplies": {
          "title": "Sobre quais temas de notícias gostaria de saber?",
          "quickReplies": [
            "Esportes",
            "Política",
            "Entretenimento",
            "Famosos"
          ]
        },
        "platform": "FACEBOOK"
      },
      {
        "card": {
          "title": "esporte",
          "subtitle": "essa noticia eh mt boa",
          "imageUri": "https://cdn.leroymerlin.com.br/products/abajur_de_mesa_infantil_bola_de_futebol_preto_e_branco_1567079268_902d_600x600.png",
          "buttons": [
            {
              "text": "clique aqui para ver",
              "postback": "https://cdn.leroymerlin.com.br/products/abajur_de_mesa_infantil_bola_de_futebol_preto_e_branco_1567079268_902d_600x600.png"
            }
          ]
        },
        "platform": "FACEBOOK"
      },
      {
        "text": {
          "text": [
            ""
          ]
        }
      }
    ],
    "intent": {
      "name": "projects/newagent-tesn/agent/intents/a215a05a-796f-4fa9-98c9-4778b2df62ec",
      "displayName": "Default Welcome Intent"
    },
    "intentDetectionConfidence": 1,
    "languageCode": "pt-br",
    "sentimentAnalysisResult": {
      "queryTextSentiment": {
        "score": 0.1,
        "magnitude": 0.1
      }
    }
  }
}
*/

router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(serverModule.serverData());
  let responseResult = {};
  /*
  console.log("aqui");
  let responseResult = {"fulfillmentText":""};
  console.log("aqui2");
  responseResult.fulfillmentText="voce escolheu: "+req.body.queryResult.parameters.tema.toLowerCase();
  console.log("aqui3");
  //res.send(responseResult);
  console.log("aqui4");
  console.log(req.body.originalDetectIntentRequest.payload);
  */
  var temaEscolhido = req.body.queryResult.parameters.tema.toLowerCase();
  /*
  switch(reqJSON.queryResult.parameters.tema.toLowerCase()){
    case "esporte":
    case "esportes":
    break;

    case "política":
    case "politica":
    break;

    case "famosos":
    break;

    case "entretenimento":
    break;

  }
  */
  var dadosCards = [];
  var dados = serverModule.serverData();
  console.log("\ndados serverdata:\n");
  console.log(dados);

  var limitAtual=0; var limitCarousel=10;
  for(var d of dados){
    if(d.tema==temaEscolhido && limitAtual++<limitCarousel) dadosCards.push(customCard(d));
  }
  console.log(dadosCards);
  dadosCards = custom_payload(dadosCards);
  
  console.log("\ndados cards:\n");
  //console.log(dadosCards.payload.facebook.attachment.payload.elements);
  if(dadosCards.length==0 ) {
    responseResult.fulfillmentMessages = msgNoNews();
    res.send(responseResult);
    return;
  }
  responseResult.fulfillmentMessages = dadosCards;
  //card(req.body.queryResult.queryText);
  console.log(responseResult);
  res.send(responseResult);
  
});
    //var tabela = {};
    //tabela.link_imagem = dados[0];
    //tabela.titulo = dados[1];
    //tabela.descricao = dados[2];
    //tabela.tema = dados[3];
    //tabela.link_noticia = dados[4];

function msgNoNews(){
  return [
    {
      "quickReplies": {
        "title": "Desculpe sem notícias sobre esse tema.\nSobre quais temas de notícias gostaria de saber?",
        "quickReplies": [
          "Esportes",
          "Política",
          "Entretenimento",
          "Famosos"
        ]
      },
      "platform": "FACEBOOK"
    },
    {
      "text": {
        "text": [
          ""
        ]
      }
    }
  ];
}

function card(t){
  return {
    "card": {
      "title": t.titulo,
      "subtitle": t.descricao,
      "imageUri": t.link_imagem,
      "buttons": [
        {
          "text": "ver agora",
          "postback": t.link_noticia
        }
      ]
    },
    "platform": "FACEBOOK"
  };
}

//function card(){
//  var m = "teste";
//  return [{
//    "card": {
//      "title": m,
//      "subtitle": "essa noticia eh mt boa"+m,
//      "imageUri": "https://cdn.leroymerlin.com.br/products/abajur_de_mesa_infantil_bola_de_futebol_preto_e_branco_1567079268_902d_600x600.png",
//      "buttons": [
//        {
//          "text": "clique aqui para ver",
//          "postback": "https://cdn.leroymerlin.com.br/products/abajur_de_mesa_infantil_bola_de_futebol_preto_e_branco_1567079268_902d_600x600.png"
//        }
//      ]
//    },
//    "platform": "FACEBOOK"
//  }];
//}

function customCard(t){
  return {
        "title": t.titulo,
        "subtitle": t.descricao,
       "image_url":t.link_imagem,
       "buttons":[
          {
             "type":"web_url",
             "url":t.link_noticia,
             "title":"Ver agora"
          }
       ]
    }
    ;
 
}

function custom_payload(arrayParecidoCard){
  return [ 
    { 
      "payload":{
        "facebook":{
          "attachment":{
              "type":"template",
              "payload":{
                "template_type":"generic",
                "elements":arrayParecidoCard
              }
          }
        }
      }
    } 
  ];
}

module.exports = router;
