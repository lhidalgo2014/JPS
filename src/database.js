import { db } from './firebase'

export async function addStorteo() {
    var collection = db.collection("sorteo")
    await collection.add({
      "date": "28/12/20",
      "comment": "second upload"
    });
}