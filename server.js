const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
const dotenv = require('dotenv')
dotenv.config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'pomo-todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('todos').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({todo: request.body.todo, pomosCompleted: 0, pomodorosGraphic: ''})
    .then(result => {
        console.log('to-do task added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addCompletedPomo', (request, response) => {
    db.collection('todos').updateOne({todo: request.body.taskNameS, pomosCompleted: request.body.pomoNumS},{
        $set: {
            pomosCompleted: request.body.pomoNumS + 1,
            pomodorosGraphic: '◐'.repeat(request.body.pomoNumS + 1)
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Completed Pomodoro Session')
        response.json('Pomodoro Session Completed')
    })
    .catch(error => console.error(error))

})

app.put('/subOnePomo', (request, response) => {
    db.collection('todos').updateOne({todo: request.body.taskNameS, pomodorosGraphic: request.body.pomoGraphicS, pomosCompleted: request.body.pomoNumS},{
        $set: {
            pomosCompleted: request.body.pomoNumS - 1,
            pomodorosGraphic: '◐'.repeat(request.body.pomoNumS - 1)
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Deleted One Completed Pomodoro Session')
        response.json('Pomodoro Session Taken away')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteTodo', (request, response) => {
    db.collection('todos').deleteOne({todo: request.body.taskNameS})
    .then(result => {
        console.log('Task deleted')
        response.json('Task deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})