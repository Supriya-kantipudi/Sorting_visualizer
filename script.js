const n = 10;
const array = [];

init();

function init(){
    for(let i=0;i<n;i++){
        array[i] = Math.random();
    }
    showBars();
    console.log(array);
}

function play(){
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;
    if(move.type == "swap"){
        [array[i],array[j]] = [array[j],array[i]];
    }
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },200);
}
function bubbleSort(array){
    const moves = [];
    for(let i=0;i<array.length;i++){
        for(let j=1;j<(array.length-i);j++){
            moves.push({indices:[j-1,j],type:"comp"});
            if(array[j-1]>array[j]){
                moves.push({indices:[j-1,j],type:"swap"});
                var temp = array[j-1];
                array[j-1] = array[j];
                array[j] = temp;
            }
        }
    }
    console.log(moves);
    return moves;
}


function showBars(move){
    container.innerHTML = "";
    for(let i=0;i<array.length;i++){
        const bar = document.createElement("div");
        bar.style.height = array[i]*100+"%";
        bar.classList.add("bar");
        
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = move.type == "swap"?"red":"blue";
        }
        container.appendChild(bar);
    }
}


