const express = require("express")
const app = express() 
const mysql = require("mysql")
const cors = require("cors")
const port = process.env.PORT||10500


app.use(cors())
app.use(express.json())



// const connection = mysql.createConnection({
//     host    : 'sql6.freesqldatabase.com',
//     user    : 'sql6695400',
//     password: 'U9Bwq5aM2T',
//     database: 'sql6695400'
// })

const connection = mysql.createConnection({
    host : 'sql6.freesqldatabase.com',
    user : 'sql6695400',
    password: 'U9Bwq5aM2T',
    database : 'sql6695400'
})
connection.connect((err)=> {
    if(err) {
        console.log(err)
        return
    }
    console.log("Connected")
})
app.post('/signin', (request, response) => {
    const body = request.body
    const data = {
        firstname   : body.firstname,
        lastname    :  body.lastname,
        username    :  body.username,
        password    :  body.password
    }

    connection.query('INSERT INTO client_data SET ?', body, (err, result) => {
        if(err) {
            response.json({hasError: true, errMessage: err.errno})
        }
        console.log("saved")
        response.send("Data mo ay naka save na")
    })

})
app.listen(port, function() {
    console.log("Listening...")
})