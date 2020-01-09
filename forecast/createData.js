const tf = require('@tensorflow/tfjs-node');
const csv = require('csv-parser')
const fs = require('fs')


async function createData(filename) {
    const dataset = tf.data.csv(filename, {hasHeader: true});
    //console.log("TCL: createData -> dataset", dataset)
    
    
    const results = await new Promise(function(resolve,reject){
        let results = [];
        
         fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => results =[...results, data])
            .on('end', () => {
            resolve(results)
        })
    // results.push(data)
    })

    let array = [];
    let xs = [];
    let ys = [];
    let xv = [];
    let yv = [];
    results.forEach(async line => {
        let data2 = [];
        Object.keys(line).forEach(async(key) =>{
            data2 = [...data2, line[key]];
        });
        array = [...array, data2];       
    });

    //console.log('size of data : ',array.length)

    let numberOfTrain = Math.floor(array.length*0.8)
    let numberOfVal = array.length - numberOfTrain

    //console.log('Train : ',numberOfTrain,'Val : ',numberOfVal)

    let flag = 0;
    array.forEach(element => {
        let features = element[2].toString().replace('\"','')
        features = features.replace('\"','')
        features = features.replace('[','')
        features = features.replace(']','')
        if(flag < numberOfTrain)
        {
            xs = [...xs,features.split(',')]
            ys = [...ys,element[1]];
        }
        else
        {
            xv = [...xv,features.split(',')]
            yv = [...yv,element[1]];
        }
        flag++
    });
    
    //console.log(xs.length)
    const train = [xs,ys];
    const validate = [xv,yv];

    //console.log(train)
    return {train,validate}
}


//createData('./rawData.csv')
const runCreateData = async () => {
    let postData = await createData('./rawData.csv')
    console.log('train == ',postData.train)
    console.log('val == ',postData.validate)
}
runCreateData()
