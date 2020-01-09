const tf = require('@tensorflow/tfjs-node');

const createData = async(filename) => {
    const dataset = tf.data.csv(filename, {hasHeader: true});
    const rawData = await dataset.toArray();
    let xs = []
    let ys = []
    console.log(rawData)
    rawData.forEach(instance => {
        // ys.push(instance.label)
        if(instance.label==11) ys.push([1,0,0,0])
        else if(instance.label==14) ys.push([0,1,0,0])
        else if(instance.label==29) ys.push([0,0,1,0])
        else if(instance.label==32) ys.push([0,0,0,1])
        // delete instance.label
        xs.push([instance.rssi11,instance.rssi14,instance.rssi29,instance.rssi32])
    });      
    console.log('====================')
    console.log('XS : ',xs)
    console.log('YS : ',ys)
    console.log('====================')

    return {xs,ys}
}

module.exports = createData;

