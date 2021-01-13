import { db, firebase } from './firebase'

// Account money component
export async function transactAccountMoney(account, transaction, amount) {
    var doc = db.collection("account").doc(account)
    await doc.update({
      "deposit_history": firebase.firestore.FieldValue.arrayUnion({
        "date": Date.now(),
        "transaction": transaction,
        "amount": amount
      }),
      "total": firebase.firestore.FieldValue.increment(amount)
    }).then(() => {
      return true
    }).catch((err) => {
      return false
    });
}

// Register component
export async function registerSorteo(type, prizeList, date) {
  var collRef = db.collection("sorteo")
  await collRef.add({
    "type": type,
    "state": "sorteando",
    "date": date,
    "prizeList": prizeList
  }).then(() => {
    return "Actualizado correctamente"
  }).catch((err) => {
    return "Error al depositar el dinero"
  });
}

// Search component
export async function getSorteos() {
  var collRef = db.collection("sorteo").where("state", "==", "sorteando")
  await collRef.get()
  .then((querySnapshot) => {
    let docs = []
    querySnapshot.forEach(function (doc) {
      const tempDoc = doc.data()
      tempDoc.id = doc.id

      docs.push(tempDoc)
    });
    console.log(docs)
    return docs
  }).catch((err) => {
    return []
  });
}

// Create sorteo component
export async function createSorteo(docUID) {
  var doc = db.collection("sorteo").doc(docUID)
  await doc.update("state", "sorteado").then(() => {
    return "Actualizado correctamente"
  }).catch((err) => {
    return "Error al sortear"
  });
}