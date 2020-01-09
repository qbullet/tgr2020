
const createModel = async (num_nodes) => {
    
    const tf = require('@tensorflow/tfjs-node');

    const model = tf.sequential();
    model.add(tf.layers.dense({units: num_nodes, activation: 'sigmoid', inputShape: [4]}));
    model.add(tf.layers.dense({units: 4, activation: 'softmax'}));
    model.compile({optimizer: 'sgd', loss: 'categoricalCrossentropy'});
    
    const saveModel = await model.save('file://./my-model');

    return model;
};

module.exports = createModel;

