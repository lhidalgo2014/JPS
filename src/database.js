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
export async function registerSorteo(type, prizeList, date, ticketAmount, tickectCost) {
  var collRef = db.collection("sorteo")
  await collRef.add({
    "type": type,
    "state": "sorteando",
    "date": date,
    "prizeList": prizeList,
    "ticketAmount": ticketAmount,
    "tickectCost": tickectCost,
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
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    return data
  }).catch((err) => {
    return []
  });
}

// Create sorteo component
export async function createSorteo(docUID, winnerNumber) {
  var doc = db.collection("sorteo").doc(docUID)
  await doc.update({
    "state": "sorteado",
    "winnerNumber": winnerNumber
  }).then(() => {
    return "Actualizado correctamente"
  }).catch((err) => {
    return "Error al sortear"
  });
}