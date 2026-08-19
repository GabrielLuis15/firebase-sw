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
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sistemaswebatividade-default-rtdb.firebaseio.com/"
});
}

const db = admin.database();

module.exports = admin, db, admin.database();