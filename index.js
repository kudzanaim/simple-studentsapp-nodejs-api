const express = require('express');
const firebase = require('firebase');
const app = express();

// DB Configs:
const config = {
    apiKey: "AIzaSyDXekdW9VrU_TtnfoG2Em_WvdP88yRMlbg",
    authDomain: "students-79891.firebaseapp.com",
    databaseURL: "https://students-79891.firebaseio.com",
    projectId: "students-79891",
    messagingSenderId: "1077278622101",
    appId: "1:1077278622101:web:1b9a71e2e724ee8253769c"
};

// Initialize Firebase
let DB;
( firebase.apps.length > 0 )? null : (DB = firebase.initializeApp(config));

// Get List of All:
app.get('/all', async(req, res) => {
    const allStudents = await DB.database().ref('USERS').once('value').then(list=>list.val());
    return res.send(allStudents)
})

// Search first:
app.get('/search/f', async(req, res) => {
    const query = req.query.s;
    const resulta = await DB.database().ref('USERS').orderByChild('firstname').startAt(query).endAt(query+"\uf8ff").once('value').then(r=>r.val());

    return res.send({results:{
        firstnames: resulta
    }})
})
// Search last:
app.get('/search/l', async(req, res) => {
    const query = req.query.s;
    const resultb = await DB.database().ref('USERS').orderByChild('lastname').startAt(query).endAt(query+"\uf8ff").once('value').then(r=>r.val());

    return res.send({results:{
        lastnames: resultb,
    }})
})


app.listen(process.env.PORT || 5555, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        console.log(`Running on ${process.env.PORT || 5555}`)
    }
})