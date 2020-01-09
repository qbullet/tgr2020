let g11 = document.getElementById('g11');
let g14 = document.getElementById('g14');
let g29 = document.getElementById('g29');
let g32 = document.getElementById('g32');
    
const allPos = ['g11','g14','g29','g32',]
let curPos = allPos[Math.floor(Math.random() * 4)]
setBlink(curPos);

function setPos()
{
    const allPos = ['g11','g14','g29','g32',]
    let curPos = allPos[Math.floor(Math.random() * 4)]
    setBlink(curPos);
}
    
function setBlink(curPos) 
{
    let pos = document.getElementById(curPos);
    var blink = setInterval(blinkFunc, 200);

    function blinkFunc()
    {
        if (pos.className == "btn btn-danger disabled")pos.className = "btn btn-info disabled";
        else if (pos.className == "btn btn-info disabled")pos.className = "btn btn-danger disabled";
    }
}