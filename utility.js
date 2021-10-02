const fs = require('fs')
const csv = require('csv-parser')
const fastCsv = require('fast-csv')

const writeCsvData = (filePath, data) => {
    fastCsv.write(data, { headers: true })
    .on("finish", ()=>{
        console.log("File Created")
    })
    .pipe(fs.createWriteStream(filePath))
}

const getCsvData = (filePath, callback) => {
    let result = []
    
    fs.createReadStream(filePath)
    .pipe(csv({}))
    .on('data', (data) => result.push(data))
    .on('end', () => callback(result))
}

module.exports = {
    getCsvData,
    writeCsvData
}