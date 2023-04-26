import './style.css'

const canvas = document.getElementById("game") as HTMLCanvasElement;
const cursor = document.getElementById("cursor") as HTMLCanvasElement;
const ctx = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
const ctxGrid = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
const startBtn = document.querySelector('#start') as HTMLCanvasElement;
const clearBtn = document.querySelector('#clear') as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gridCellSize = 10;
let interval = null;

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, cellWidth: number, cellHeight: number) {
  ctx.beginPath();
  ctx.strokeStyle = "#ccc";

  for(let i=0; i <= width; i++) {
    ctx.moveTo(i * cellWidth, 0);
    ctx.lineTo(i * cellWidth, height);
  }

  for(let i=0; i <= height; i++) {
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(width, i * cellHeight);
  }

  ctx.stroke();
}

function createPixel(x: number, y: number) {
  ctx.beginPath();
  
  ctx.fillRect(x, y, gridCellSize, gridCellSize);
}

function getPixelData(x: number, y: number) {
  return ctx.getImageData(x, y, gridCellSize, gridCellSize).data;
}

function addPixel() {
  const x = cursor.offsetLeft - canvas.offsetLeft;
  const y = cursor.offsetTop - canvas.offsetTop;
  createPixel(x, y);
}

function isBlack(pixelData: Uint8ClampedArray) {
  if(
    (pixelData[0] == 0) &&
    (pixelData[1] == 0) &&
    (pixelData[2] == 0) &&
    (pixelData[3] == 255)
  ) {
    return true;
  } else {
    return false;
  }
}

//drawGrid(ctxGrid, canvas.width, canvas.height, gridCellSize, gridCellSize);

canvas.addEventListener('mousemove', (e) => {
  const cursorLeft = e.clientX - (cursor.offsetWidth / 2);
  const cursorTop = e.clientY - (cursor.offsetHeight / 2);

  cursor.style.left = Math.floor(cursorLeft / gridCellSize) * gridCellSize + "px";
  cursor.style.top = Math.floor(cursorTop / gridCellSize) * gridCellSize + "px";
});

canvas.addEventListener('click', () => {
  ctx.fillStyle = "#000";
  addPixel();
})

cursor.addEventListener('click', () => {
  ctx.fillStyle = "#000";
  addPixel();
})

startBtn.addEventListener('click', () => {
  interval = setInterval(() => {
    let aliveCells: any[] = [];
    let deadCells: any[] = [];

    for(let x=0; x < canvas.width; x+=gridCellSize) {
      for(let y=0; y < canvas.height; y+=gridCellSize) {
        let pixelData = getPixelData(x, y);
        let nb = 0;

        for(let i=x-10; i < x+20; i+=10) {
          for(let j=y-10; j < y+20; j+=10) {
            if(i == x && j == y) {
              continue
            }else {
              let p = getPixelData(i, j);
              if(isBlack(p)){
                nb++;
              }
            }
          }
        }

        if(isBlack(pixelData)) {
          if(nb > 3 || nb < 2) {
            deadCells.push([x, y]);
          } else {
            aliveCells.push([x, y]);
          }
        } else {
          if(nb == 3) {
            aliveCells.push([x, y]);
          } else {
            deadCells.push([x, y]);
          }
        }
      }
    }

    for(let i=0; i < deadCells.length; i++) {
      ctx.fillStyle = "#FFF";
      createPixel(deadCells[i][0], deadCells[i][1]);
    }

    for(let i=0; i < aliveCells.length; i++) {
      ctx.fillStyle = "#000";
      createPixel(aliveCells[i][0], aliveCells[i][1]);
    }
  }, 1);
})

clearBtn.addEventListener('click', () => {
  clearInterval(interval);
  let nb = 0;
  ctx.fillStyle = "#FFF";
  for(let i=0; i < canvas.width; i+=gridCellSize) {
    for(let j=0; j < canvas.height; j+=gridCellSize) {
      createPixel(i, j);
    }
  }

  //drawGrid(ctxGrid, canvas.width, canvas.height, gridCellSize, gridCellSize);
})