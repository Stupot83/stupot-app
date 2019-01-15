var db = new PouchDB('k9_database');
console.log('Hello world');
console.log(db);

var doc = {
    "_id": "messages",
    "messages": [
      "I have walked Kaos 2.5 miles today",
      "Pablo has been really naughty and will not be going out any more this week as a punishment",
      "Kira is cute"
    ]
  };
  db.put(doc);

  db.get('messages').then(function (doc) {
    console.log(doc);
  });

const form = document.querySelector('form')
form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
    const newMessage = document.querySelector('textarea').value
    console.log(newMessage)
    db.get('messages').then(doc => {
        doc.messages.push(newMessage)
        return db.put(doc)
    }).catch(err => {
        console.log(err)
    })
});

