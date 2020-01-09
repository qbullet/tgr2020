const tf = require('@tensorflow/tfjs-node');
let array = [];
const trainModel = async (model, xs, ys, epochs) => {

    const xs2 = tf.tensor1d(xs)
    const ys2 = tf.tensor1d(ys)
   


   await model.fit(xs2, ys2, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch, log) => {
                //console.log(`Epoch ${epoch}: loss = ${log.loss}`)
                array = [...array, log.loss]
            }
        }
    });
    // console.log("TCL: trainModel -> array", array)

    return array;
};

module.exports = trainModel;

