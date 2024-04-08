const express = require("express")
const app = express() 
const mysql = require("mysql")
const cors = require("cors")
const port = process.env.PORT||10500


app.use(cors())
app.use(express.json())


// const connection = mysql.createConnection({
//     host : 'sql6.freesqldatabase.com',
//     user : 'sql6697319',
//     password: 'Mxx3f2MS2R',
//     database : 'sql6697319'
// })

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'jayson123',
    database : 'express cat'
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
    const loc = []
    if(body.onLocation) {
        loc.push({
            lat : body.latitude,
            lng : body.longitude
        })
        response.json(loc)
    }else if(body.onSignin){
        connection.query('INSERT INTO client_data SET ?', body, (err, result) => {
            if(err) {
                response.json({hasError: true, errMessage: err.errno})
            }
            console.log("saved")
            response.send(body)
        })
    }

})
app.listen(port, function() {
    console.log("Listening...")
})