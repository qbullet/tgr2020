const tf = require('@tensorflow/tfjs-node');

const try2MakeCSV = require('./try2MakeCSV')
const createModel = require('./createModel')
const trainModel = require('./trainModel')
const plotResDult = require('./plotResult')
const predictModel = async xv => {

    const secData = await try2MakeCSV('file://./out.csv')
    const xs = secData.xs
    const ys = secData.ys
    const model = await createModel(100)
    const loss = await trainModel(model,xs,ys,100)
    const arrayXV = tf.tensor2d(xv,[1,4]);
    let yv = await model.predict(arrayXV)
   
    // console.log("YV = " + yv)
    return yv

}
const app = async() => {

    const xv = [
                [-48,-54.5,-31,-44]
               
    ]
    const yv = await predictModel(xv)
    // console.log(yv)
    plotResDult(xv,yv);
}
app()
