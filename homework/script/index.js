const axios = require('axios')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const hashData = async (data) => {
    let temp2 = [...data]
    let count = 0
    let res = 0
    let resp = []
    temp2.map((d,i)=>{
    const rssi = (d.rssi == 0 ? -194 : d.rssi)
    if(rssi===0) console.log('!!!!!1')
        if(i!=0){
         if(d.timestamp.substr(14, 2) == temp2[i-1].timestamp.substr(14, 2)){
                    res+=parseInt(rssi)
                    count++
                }
        else {

            resp = [...resp, {mac_addr:d.mac_addr,rssi:isNaN(res/count)?rssi:res/count ,timestamp:d.timestamp }]
            res=0
            count=0
        } 
        }
        else{
            res+=parseInt(rssi)
            count = 1
        }
        // console.log('aa ',d.timestamp.substr(14, 2))
        // for(temp in temp2){
            // if(d.timestamp.substr(14, 2)==temp.timestamp.substr(14, 2))
            // temp3.map((temp)=>{
            //     if(d.timestamp.substr(14, 2)==temp.timestamp.substr(14, 2))
            //     count++
            //     res+=temp.rssi 
            //     temp2.splice(i,1)
            // })
        // }

    })
return resp
}

const test =async () =>{
const data = await axios.get('https://fitm2020-be3d8.firebaseio.com/test.json')
const currentData = data.data
for(firstKey in currentData);
const rawData = currentData[firstKey].test
let _29 = []
let _14 = []
let _32 = []
let _11 = []
for(key in rawData) {
    if(rawData[key].mac_addr == '80:E1:25:00:D9:D7')
        _29 =[..._29,rawData[key]]
    else if(rawData[key].mac_addr == '80:E1:26:07:D6:C2')
    _14= [..._14,rawData[key]]
    else if(rawData[key].mac_addr == '80:E1:26:00:5F:6A')
        _32= [..._32 , rawData[key]]
    else if(rawData[key].mac_addr == '80:E1:26:07:CD:59')
    _11 = [..._11,rawData[key]]
}
_29 = await hashData(_29)
_32 = await hashData(_32)
_14 = await hashData(_14)
_11 = await hashData(_11)
let resp = [_29,_32,_14,_11]
resp = [].concat(...resp)
resp = resp.map(data =>{
    const a = {...data}
    if(data.rssi>-60){
    return {...a, label:3}
    }
    else {
        return {...a, label:99}
    }
})
// console.log(resp)
// console.log(rawData)
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'mac_addr', title: 'mac_addr'},
      {id: 'rssi', title: 'rssi'},
      {id: 'timestamp', title: 'timestamp'},
      {id:'label', title:'label'}
    ]
  });
//   let dataToCSV = []
//   for(key in rawData){
      
//     dataToCSV = [...dataToCSV , rawData[key]]
//     }
  
  csvWriter
    .writeRecords(resp)
    .then(()=> console.log('The CSV file was written successfully'));
    console.log(resp)



}
test()