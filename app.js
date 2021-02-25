const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");

const INITIAL_COLOR = "black";

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    //console.log(event.target.style.backgroundColor);

    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;

}

function handleRangeChange(event){
    //console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleClearClick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
}

Array.from(colors).forEach(color =>
    color.addEventListener('click', handleColorClick)
);

if(range) {
    range.addEventListener('input', handleRangeChange);
}

if(mode){
    mode.addEventListener('click', handleModeClick);
}

if(save){
    save.addEventListener('click', handleSaveClick);
}

if(clear){
    clear.addEventListener('click', handleClearClick);
}