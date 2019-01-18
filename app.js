var db = new PouchDB('k9_database');
console.log('Hello world');
console.log(db);

  db.get('messages').then(function (doc) {
        renderMessages(doc);
    }).catch(function(e) {
        if (e.message == 'missing') {
        db.put({
            "_id": "messages",
            "messages": [
              "I have walked Kaos 2.5 miles today",
              "Pablo has been really naughty and will not be going out any more this week as a punishment",
              "Kira is cute"
            ]
          }).then(function(response) {
              db.get('messages').then(function(doc) {
                  renderMessages(doc);
          });
        });
    }
  });

  function renderMessages(doc) {
      console.log('rendering messages with doc:');
      console.log(doc);
      const formattedMessages = doc.messages.map(msg => `<p class="message-item">${msg}</p>`).join('');
      document.querySelector('#messages-container').innerHTML = formattedMessages;
  }

const form = document.querySelector('form')
form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
    const newMessage = document.querySelector('textarea').value;
    db.get('messages').then(doc => {
        doc.messages.push(newMessage);
        renderMessages(doc);
        document.querySelector('textarea').value = '';
        return db.put(doc);
    }).catch(err => {
        console.log(err);
    });
});

db.replicate.to('https://stupot-app-db-server.stupot83.me');

