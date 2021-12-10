const express = require('express');
const fileUpload = require('express-fileupload');
const csvToJson = require('convert-csv-to-json');
const app = express();
const port = 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//app.use(express.json());
app.use(fileUpload());

// route handlers
app.get('/api', (req, res) => {
    const fs = require('fs');
    //console.log('in express', res)
    // read data from json file and send back to component
    let rawData = fs.readFileSync('jsonData.json');
    let data = JSON.parse(rawData);
    console.log('data',data);
    res.json(data);
});

app.post('/api', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    //`${__dirname}/../app/public/uploads/${file.name}`

    file.mv(`./uploads/${file.name}`, error => {
        if(error) {
            console.log(error);
            return res.status(500).send(error);
        }

        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(`./uploads/${file.name}`, 'jsonData.json');

        res.json({fileName: file.name, filePath: `/uploads/S{file.name}`});
    })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})