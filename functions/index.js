'use strict';
const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
  Table,
 } = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = dialogflow({debug: true});
//=== Firebase Database Link ===================================================
var serviceAccount = require("./my-firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatbotsi-intets-especificos.firebaseio.com"
});
var db = admin.database().ref('tema/');
//===============================================================================


app.intent('actions.intent.MAIN', (conv) => {
  conv.ask('Hi!');
});


app.intent('Default Welcome Intent', (conv) => {
      conv.ask(new SimpleResponse({
		  speech:"¡Hola!, Soy el asistente virtual de la clase de Sistemas inteligentes y puedo ayudarte con dudas sobre conceptos, ejemplos y mucho más.",
		  text:"¡Hola! 😀, Soy el asistente virtual de la clase de Sistemas inteligentes y puedo ayudarte con dudas sobre conceptos, ejemplos y mucho más. \nSelecciona una opción.",
		}));

		if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
		  conv.ask('Selecciona una opción. 1.Definiciones , 2.Ejemplos Guiados o 3.Video Explicativo');
        }
        
		// Create a carousel
		conv.ask(new Carousel({
		  items: {
		    // Add the second item to the carousel
		    ["1.Definiciones"]: {
		      synonyms: [
                  'uno',
                  'opción uno',
                  'Opcion 1',
                  'primera',
                  'la primera',
		        'definiciones',
                'definicion'
		    ],
		      title: 'Definiciones',
		      description: 'Conoce información sobre los principales conceptoss del curso de Sistemas Digitales.',
		      image: new Image({
		        url: "https://firebasestorage.googleapis.com/v0/b/sistemas-inteligentes-bot.appspot.com/o/img_def.png?alt=media&token=6be20ebe-858b-4863-b03b-0f0bf26d8278",
		        alt: 'Definiciones',
		      }),
		    },
            // Add the first item to the carousel
           ["2.Ejemplos Guiados"]: {
             synonyms: [
                 'la segunda',
                 'dos',
                 'opción dos',
                 'Opcion 2',
                 'segunda',
                'Ejemplos',
                'Ejemplos Guiados',
             ],
             title: 'Ejemplos Guiados',
             description: '¿Necesitas ayuda con un tema? Dejame ayudarte!',
             image: new Image({
               url: "https://firebasestorage.googleapis.com/v0/b/sistemas-inteligentes-bot.appspot.com/o/img_ejem.png?alt=media&token=ac5132ba-5f65-4324-b491-3857a7130366",
               alt: 'Ejemplos',
             }),
           },
		    // Add third item to the carousel
		    ["3.Video Explicativo"]: {
		      synonyms: [
		        'tres',
		        'opción 3',
		        'Opcion tres',
		        'tercera',
		        'la tercera',
		        'la ultima',
                'Video',
                'Video Explicativo',
		      ],
		      title: 'Video Explicativo',
		      description: 'Puedo presentarte videos educativos, con el objetivo de ayudarte a estudiar mejor!.',
		      image: new Image({
		        url: "https://firebasestorage.googleapis.com/v0/b/sistemas-inteligentes-bot.appspot.com/o/img_video.png?alt=media&token=08b1c7c8-4c04-46c6-874c-f677b8f1c560",
		        alt: 'Ejemplos',
		      }),
		    },
		  },
		}));
        conv.ask(new Suggestions(['Qué es AI','Qué es Algoritmo' ,'Ejemplo de ML', 'Salir']));

});



const SELECTED_ITEM_RESPONSES = {
  ["1.Definiciones"]: 'Puedo ayudarte brindandote brindandote definiciones sobre conceptos de la clase de Sistemas Inteligentes. Sólo basta preguntarme:,¿Qué es Algoritmo? o ¿Explicame qué es un sensor?.',
  ["2.Ejemplos Guiados"]: 'Puedo ayudarte a entender temas, explicandote de forma dinámica para un mejor aprendizaje. Sólo basta decir: Ejemplo sobre Grafo o  Ayudame a entender el teorema de Bayes.',
  ["3.Video Explicativo"]: '¿Te gustaría dar un repaso a la clase?, con tan solo decir: Video sobre Big Data o  Material audiovisual a cerca de Simulación Sensorial.',
};
app.intent('actions.intent.OPTION', (conv, params, option) => {
  let response = 'Puedes hacerme preguntas sobre Definiciones, Ejemplos Guiados o Videos explicativos. \n Sólo basta preguntarme:,¿Qué es Algoritmo? o Dame un ejemplo sobre Grafo';
  	if (option && SELECTED_ITEM_RESPONSES.hasOwnProperty(option)) {
    	response = SELECTED_ITEM_RESPONSES[option];
	}
  	conv.ask(new SimpleResponse({
                speech:response,
                text:response,
    }));
    conv.ask(new SimpleResponse({
                speech:"Ahora inténtalo tú mismo. Dime en qué te puedo ayudar.",
                text:"Ahora inténtalo tú mismo. Dime en qué te puedo ayudar. 😄",
    }));
    conv.ask(new Suggestions(['Qué es AI','Qué es Algoritmo' ,'Ejemplo de ML', 'Salir']));
});


// More intent handling if needed
exports.helloWorld = functions.https.onRequest(app);
