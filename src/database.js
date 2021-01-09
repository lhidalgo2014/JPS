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
      return "Actualizado correctamente"
    }).catch((err) => {
      return "Error al depositar el dinero"
    });
}

// Register component
export async function registerSorteo(type, prizeList) {
  var doc = db.collection("sorteo")
  await doc.add({
    "type": type,
    "state": "sorteando",
    "date": new Date(),
    "prizeList": prizeList
  }).then(() => {
    return "Actualizado correctamente"
  }).catch((err) => {
    return "Error al depositar el dinero"
  });
}

// Search component
export async function getSorteos() {
  var doc = db.collection("sorteo").where("state", "==", "sorteando")
  await doc.get()
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