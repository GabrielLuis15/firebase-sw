// CONFIGURAÇÃO FIREBASE REALTIME DATABASE

const admin = require("firebase-admin");


// Se as variáveis de ambiente existirem,
// significa que estamos no Vercel/produção.
if (process.env.FIREBASE_PROJECT_ID) {

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        }),

        databaseURL: "https://sistemaswebatividade-default-rtdb.firebaseio.com/"
    });

} else {

    // Ambiente local
    const serviceAccount = require("./serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),

        databaseURL: "https://sistemaswebatividade-default-rtdb.firebaseio.com/"
    });
}

const admin = require('firebase-admin');

let serviceAccount;

// Se estiver rodando na Vercel (onde existe a variável de ambiente)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Se estiver rodando localmente na sua máquina
  serviceAccount = require('./serviceAccountKey.json');
}

// Inicializa o Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = admin;


const db = admin.database();

module.exports = db;