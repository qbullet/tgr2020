const tf = require('@tensorflow/tfjs-node');

const createData = require('./createData')
const createModel = require('./createModel')
const trainModel = require('./trainModel')
const plotResult = require('./plotResult')




const predictModel = async xv => {

    const secData = await createData(10)
    const xs = secData.xs
    const ys = secData.ys
    const model = await createModel(100)
    const loss = await trainModel(model,xs,ys,100)
    const arrayXV = tf.tensor1d(xv);
    let yv = await model.predict(arrayXV)
   
    // console.log("YV = " + yv)
    return yv

}
const app = async() => {

    const xv = [1,5,7,4,8,5,2,5,4,16]
    const yv = await predictModel(xv)
    plotResult(xv,yv);
}
app()
