var express = require('express');
const { response } = require('../app');
var router = express.Router();


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

  responseResult.fulfillmentMessages = card(req.body.queryResult.queryText);

  res.send(responseResult);
  
});

function card(m){
  return [{
    "card": {
      "title": m,
      "subtitle": "essa noticia eh mt boa"+m,
      "imageUri": "https://cdn.leroymerlin.com.br/products/abajur_de_mesa_infantil_bola_de_futebol_preto_e_branco_1567079268_902d_600x600.png",
      "buttons": [
        {
          "text": "clique aqui para ver",
          "postback": "https://cdn.leroymerlin.com.br/products/abajur_de_mesa_infantil_bola_de_futebol_preto_e_branco_1567079268_902d_600x600.png"
        }
      ]
    },
    "platform": "FACEBOOK"
  }];
}

module.exports = router;