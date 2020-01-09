const plotly = require('plotly')("herohrx1125", "P6QkZFnWF0eSJJYDKUtH");


const plotResult = async (xv, yv) => {

    var data = [{ x: xv, y: Array.from(await yv.data()), type: 'scatter' }];
    var layout = { fileopt: "overwrite", filename: "thatSoEZ-example" };

    // const test1 = Array.from(yv.dataSync())
    // console.log('--------------------------------------------------------')
    // console.log("YV(DS) = ", Array.from(await yv.data()))
    // console.log("YV(Array) " +  test1)
    // console.log('--------------------------------------------------------')
    plotly.plot(data, layout, function (err, msg) {
        if (err) return console.log(err);
        console.log(msg);
    });
}

module.exports = plotResult;
