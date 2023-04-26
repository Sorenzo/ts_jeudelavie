import './style.css'

const canvas = document.getElementById("tutorial") as HTMLCanvasElement;
const cursor = document.getElementById("cursor") as HTMLCanvasElement;
const ctx = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
const ctxGrid = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
const testBtn = document.querySelector('#testBtn') as HTMLCanvasElement;

canvas.width = 800;
canvas.height = 800;

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

drawGrid(ctxGrid, canvas.width, canvas.height, 10, 10);

canvas.addEventListener('mouseover', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
}

















/*

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

const test = () => {
  let pixelData = ctx.getImageData(1, 1, 1, 1).data;
  
  let nombreDeGeneration = 0;

  while(nombreDeGeneration < 1) {
    let caseVivante: [] = [];
    let caseMorte: [] = [];
    
    for (let x = 0; x < displayWidth; x++) {
      for (let y = 0; y < displayHeight; y++) {
        let nbCases = 0;

        pixelData = ctx.getImageData(x, y, 1, 1).data;

        if(isBlack(pixelData)) {
          console.log(x, y);
          nbCases++;
        }

      
        for(let i = x-1; i < x+2; i++) {
          for(let j = y-1; j < y+2; j++) {
            
            if(i == x && j == y) {
              continue;
            } else {
              
              if(
                (pixelData[0] == 0) &&
                (pixelData[1] == 0) &&
                (pixelData[2] == 0) &&
                (pixelData[3] == 255)
              ) {
  
                pixelData = ctx.getImageData(i, j, 1, 1).data;
  
                if(
                  (pixelData[0] == 0) &&
                  (pixelData[1] == 0) &&
                  (pixelData[2] == 0) &&
                  (pixelData[3] == 255)
                ) {
                  nbCases++;
                }
  
                
                //console.log(pixelData[0], pixelData[1], pixelData[2], pixelData[3])
              }
            }
          }
        }

        
  
        if(
          (pixelData[0] == 0) &&
          (pixelData[1] == 0) &&
          (pixelData[2] == 0) &&
          (pixelData[3] == 255)
        ) {
          if (nbCases == 3){
            caseVivante.push([x, y]);
          } else{
            caseMorte.push([x, y]);
          }
        } else {
          if (nbCases == 3 || nbCases == 2){
            caseVivante.push([x, y]);
          } else {
            caseMorte.push([x, y]);
          }
        }
        
      }
    }


    
    for(let i = 0; i < caseVivante.length; i++) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(caseVivante[i][0], caseVivante[i][1], 1, 1);
    }
  
    for(let i = 0; i < caseMorte.length; i++) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(caseMorte[i][0], caseMorte[i][1], 1, 1);
    }

    nombreDeGeneration++

    if(nombreDeGeneration == 100){ console.log(nombreDeGeneration) }
  }

  
  
  
      
      for(let i = x-1; i < x+2; i++) {
        for(let j = y-1; j < y+2; j++) {
          
          let pixelData = ctx.getImageData(i, j, 1, 1).data;
          if(
            (pixelData[0] == 0) &&
            (pixelData[1] == 0) &&
            (pixelData[2] == 0) &&
            (pixelData[3] == 255)
          ) {
            console.log(i, j);
            
            //console.log(pixelData[0], pixelData[1], pixelData[2], pixelData[3])
          }
          
        
          if(i == x && j == y) {
            continue;
          } else {
            let pixelData = ctx.getImageData(i, j, 1, 1).data;
            if(
              (pixelData[0] == 0) &&
              (pixelData[1] == 0) &&
              (pixelData[2] == 0) &&
              (pixelData[3] == 255)
            ) {
              nbCase++;
              console.log(nbCase, i, j);
              
              //console.log(pixelData[0], pixelData[1], pixelData[2], pixelData[3])
            }
          }

          
        }
      }

      if(
        (pixelData[0] == 0) &&
        (pixelData[1] == 0) &&
        (pixelData[2] == 0) &&
        (pixelData[3] == 0)
      ) {
        if (nbCase == 3 || nbCase == 2){
          caseVivante.push([x, y]);
        } else {
          caseMorte.push([x, y]);
        }
      } else {
        if (nbCase == 3){
          caseVivante.push([x, y]);
        } else{
          caseMorte.push([x, y]);
        }
      }
}


*/