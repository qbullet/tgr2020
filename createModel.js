
const createModel = (num_nodes) => {
    
    const tf = require('@tensorflow/tfjs-node');

    const model = tf.sequential();
    model.add(tf.layers.dense({units: num_nodes, activation: 'relu', inputShape: [1]}));
    model.add(tf.layers.dense({units: 1, activation: 'linear'}));
    model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

    return model;
};

module.exports = createModel;

