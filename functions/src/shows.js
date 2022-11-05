import dbConnect from './dbConnect.js'

export function getAllShows(req, res) {
  const db = dbConnect()
  db.collection('shows').get()
    .then(collection => {
      const showsArr = collection.docs.map(doc => {
        return { ...doc.data(), albumId: doc.id }
      })
      res.send(showsArr)
    })
    .catch(err => res.status(500).send({ success: false, message: err }))
}

export function createNewShow(req, res) {
    const db = dbConnect()
    db.collection('shows').add(req.body)
      .then(() => getAllShows(req, res))
      .catch(err => res.status(500).send({ success: false, message: err }))
  }

  export async function updateShow(req, res) {
    const { uid } = req.params
    const db = dbConnect()
    const doc = await db.collection('shows').doc(uid).update(req.body)
        .catch(err => res.status(500).send({ success: false, message: err }))
    res.status(202).send({ success: true, message: 'show Updated ' + uid })
  }
  
  export async function deleteShow(req, res) {
    const { uid } = req.params
    const db = dbConnect()
    const doc = await db.collection('shows').doc(uid).delete()
        .catch(err => res.status(500).send({ success: false, message: err }))
    res.status(202).send({ success: true, message: 'show Deleted' })
  }
  
  export async function getOneShow(req, res) {
    const { uid } = req.params
    const db = dbConnect()
    const doc = await db.collection('shows').doc(uid).get()
    if (!doc.exists){
        console.log("no match")
        res.status(404).send({ success: false, message: 'not found'})

    } else{
        res.status(202).send({ success: true, message: doc.data()})

    }
        //.catch(err => res.status(500).send({ success: false, message: err }))

  }
  