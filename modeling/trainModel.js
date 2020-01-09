const tf = require('@tensorflow/tfjs-node');
let array = [];
const trainModel = async (model, xs, ys, epochs) => {
    
    const xs2 = tf.tensor2d(xs)
    const ys2 = tf.tensor2d(ys)
    // const ys2 = tf.oneHot( tf.tensor1d(ys).toInt() , 4)
    // ys2.print()
    // console.log(ys)
    // console.log('aaa=> ',awaitxs2.data())


   await model.fit(xs2, ys2, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch, log) => {
                console.log(`Epoch ${epoch}: loss = ${log.loss}`)
                array = [...array, log.loss]
            }
        }
    });
    // console.log("TCL: trainModel -> array", array)
    // console.log('asdasd => ',array)
    return array;
};

module.exports = trainModel;

