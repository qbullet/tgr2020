const createData = (num_pts) => {
    let ys = [];
    let xs = [];
    
    for(let i=0;i<num_pts;i++)
    {
        xs = [...xs,i]
        ys = [...ys , 2*i + Math.random(0,1)]
    }
    
    // console.log("xs = " + xs)
    // console.log("ys = " + ys)

    return {xs,ys};
};


module.exports = createData;