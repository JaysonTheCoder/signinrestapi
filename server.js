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
    const {lat , lng} = request.body

    const data = {
        latitude : lat,
        longitude : lng
    }

    connection.query('INSERT INTO api SET ?', data, (err, result) => {
        if(err) throw err
        console.log("saved")
        response.sed("Naka save na ang coordinates")
    })

})
app.listen(port, function() {
    console.log("Listening...")
})