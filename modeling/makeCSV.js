const axios = require('axios')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const hashData = async (data) => {
    console.log('Hash!!!!!!!!!!!!!!!!!!!!!!!')
    let temp2 = [...data]
    let count = 1
    let res = 0
    let resp = []
    temp2.map((d,i)=>{
    // const rssi = (d.rssi == 0 ? -194 : d.rssi)
    const {rssi} = d
    // console.log("TCL: hashData -> rssi", rssi)
    // if(rssi===0) console.log('!!!!!1')
        if(i!=0){
         if(d.timestamp.substr(14, 2) == temp2[i-1].timestamp.substr(14, 2)){
                    res+=parseInt(rssi)
                    count++
                }
        else {
            if(res === 0 ) res = rssi
            // console.log("TCL: hashData -> res", res)
            // console.log("TCL: hashData -> count", count) 
            // console.log({mac_addr:d.mac_addr,rssi:res/count ,timestamp:d.timestamp, topic:d.topic })
            // console.log(d)
            resp = [...resp, {mac_addr:d.mac_addr,rssi:res/count ,timestamp:d.timestamp, topic:d.topic,label:d.label }]
           
            res=0
            count=1
        } 
        }
        else{
            res+=parseInt(rssi)
            count = 1
        }
    })
return resp
}


const makeCSV = async () => {
    const respData = await axios.get('https://fitm2020-be3d8.firebaseio.com/track.json')
    const rawData= respData.data
    let _29 = []
    let _14 = []
    let _32 = []
    let _11 = []
    for(key in rawData)
    {
        if(rawData[key].topic == '/tgr2020/track/data/29')
        _29 =[..._29,rawData[key]]
    else if(rawData[key].topic == '/tgr2020/track/data/14')
    _14= [..._14,rawData[key]]
    else if(rawData[key].topic == '/tgr2020/track/data/32')
        _32= [..._32 , rawData[key]]
    else if(rawData[key].topic == '/tgr2020/track/data/11')
    _11 = [..._11,rawData[key]]
    }
    // console.log("TCL: makeCSV -> respData", respData.data)
    _29 = await hashData(_29)
    // console.log("TCL: makeCSV -> _29", _29)
    _32 = await hashData(_32)
    // console.log("TCL: makeCSV -> _32", _32)
    _14 = await hashData(_14)
    // console.log("TCL: makeCSV -> _14", _14)
    _11 = await hashData(_11)
    // console.log("TCL: makeCSV -> _11", _11)
    

// not found is -85
    const indexArray = [0, 0, 0, 0]
    let traget = _11 
    if(traget.length < _14.length) traget = _14
    if(traget.length < _29.length) traget = _29
    if(traget.length < _32.length) traget = _32
    // const maxArray = Math.max(_29.length,_32.length,_14.length,_11.length)
    // console.log("TCL: makeCSV -> maxAttay", maxAttay)
    let dataToCsv = []
    for (let index = 0 ; index < traget.length ; index += 1){
        let tempArray = {}
        console.log(_11[indexArray[0]].timestamp.substr(14,2) , ' - ' , traget[index].timestamp.substr(14,2))
       if( index < _11.length && (_11[indexArray[0]].timestamp.substr(14,2) === traget[index].timestamp.substr(14,2)) ){ 
            tempArray = {...tempArray, rssi11:_11[indexArray[0]].rssi }
            indexArray[0]++    
        }
        else {
            tempArray = {...tempArray, rssi11:-85 }
        }

        if( index < _14.length && (_14[indexArray[1]].timestamp.substr(14,2) === traget[index].timestamp.substr(14,2)) ){ 
            tempArray = {...tempArray, rssi14:_14[indexArray[1]].rssi }

            indexArray[1]++    
        }
        else {
            tempArray = {...tempArray, rssi14:-85 }
        }

        if( index < _29.length && (_29[indexArray[2]].timestamp.substr(14,2) === traget[index].timestamp.substr(14,2)) ){ 
            tempArray = {...tempArray, rssi29:_29[indexArray[2]].rssi }
            indexArray[2]++    
        }
        else {
            tempArray = {...tempArray, rssi29:-85 }
        }

        
        if( index < _32.length && (_32[indexArray[3]].timestamp.substr(14,2) === traget[index].timestamp.substr(14,2)) ){ 
            tempArray = {...tempArray, rssi32:_32[indexArray[3]].rssi }
            indexArray[3]++    
        }
        else {
            tempArray = {...tempArray, rssi32:-85 }
        }
        tempArray = {...tempArray, label:traget[index].label}
        dataToCsv = [...dataToCsv, tempArray]
    }

    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
          {id: 'rssi11', title: 'rssi11'},
          {id: 'rssi14', title: 'rssi14'},
          {id: 'rssi29', title: 'rssi29'},
          {id: 'rssi32', title: 'rssi32'},
          {id:'label', title:'label'}
        ]
      });
      csvWriter
    .writeRecords(dataToCsv)
    .then(()=> console.log('The CSV file was written successfully'));
    // console.log(resp)
    // console.log(dataToCsv)
}

makeCSV()