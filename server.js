const express = require("express")
const app = express() 
const mysql = require("mysql")
const cors = require('cors')
const port = 4040
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const connection = mysql.createConnection({
    host    : 'sql6.freesqldatabase.com',
    user    : 'sql6695400',
    password: 'U9Bwq5aM2T',
    database: 'sql6695400'
})

connection.connect((err)=> {
    if(err) throw err

    console.log("EROR: " + err)
})
app.post('/api/signin', (request, response) => {
    const {firstname, lastname, username, password} = request.body

    const data = {
        firstname   : firstname,
        lastname    : lastname,
        username    : username,
        password    : password
    }

    connection.query('INSERT INTO client_data SET ?', data, (err, result) => {
        if(err) throw err
        console.log("saved")
        response.sed("Data mo ay naka save na")
    })

})
app.listen(port, function() {
    console.log("Listening...")
})