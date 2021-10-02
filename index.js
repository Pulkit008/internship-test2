const { getCsvData, writeCsvData } = require('./utility')

const ques1 = (data) => {
    const results = []
    let temp

    if(data[0].Year%10 != 0)
        temp = data[0]

    data.forEach(record => {
        delete record.Total
        if(record.Year%10 == 0){
            if(temp) results.push(temp)
            temp = record
        } else {
            delete record.Year
            temp.Population = record.Population
            delete record.Population
            for (const [key, value] of Object.entries(record)) {
                temp[key] = parseInt(temp[key]) + parseInt(value)
            }
        }
    })
    results.push(temp)
    writeCsvData('output/answer-1/main.csv', results)
}

const ques2 = (data) => {
    let temp = {}

    data.forEach(record => {
        if (!temp[record.occupation]){
            temp[record.occupation] = {}
        }
        if (!temp[record.occupation].min){
            temp[record.occupation].min = 150
            temp[record.occupation].max = 0
        }
        const age = parseInt(record.age)
        if ( age < temp[record.occupation].min )
            temp[record.occupation].min = age
        
        if ( age > temp[record.occupation].max )
            temp[record.occupation].max = age
    })

    let results = []
    
    for (const [key, value] of Object.entries(temp)) {
        results.push({
            occupation: key,
            ...value
        })
    }

    writeCsvData('output/answer-2/main.csv', results)
}

const ques3 = (data) => {
    const results = []
    data.forEach(record => {
        results.push({
            Team: record.Team,
            'Yellow Cards': parseInt(record['Yellow Cards']),
            'Red Cards': parseInt(record['Red Cards'])
        })
    })

    results.sort((a,b)=> {
        if (a['Yellow Cards'] < b['Yellow Cards'])
            return 1
        if (a['Yellow Cards'] > b['Yellow Cards'])
            return -1
        return 0
    })
    results.sort((a,b)=> {
        if (a['Red Cards'] < b['Red Cards'])
            return 1
        if (a['Red Cards'] > b['Red Cards'])
            return -1
        return 0
    })
    writeCsvData('output/answer-3/main.csv', results)
}

getCsvData('input/question-1/main.csv', ques1)
getCsvData('input/question-2/main.csv', ques2)
getCsvData('input/question-3/main.csv', ques3)