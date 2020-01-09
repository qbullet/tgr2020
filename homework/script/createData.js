const tf = require('@tensorflow/tfjs-node');

async function run(filename) {
    const dataset = tf.data.csv(filename, {hasHeader: true});
    const v = await dataset.toArray();
    v.forEach((line) => {
        console.log(line);  
    });      
}

run('file://./out.csv');