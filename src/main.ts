import './style.css'
import {Scene, CanvasTexture, PlaneGeometry, WebGLRenderer, GridHelper, AxesHelper, PerspectiveCamera, Mesh, BoxGeometry, MeshBasicMaterial} from 'three'
const body = document.querySelector('body') as HTMLBodyElement
var scene = new Scene();

var camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 2000);
camera.position.set(0, 0, 100);

camera.lookAt(scene.position);
const renderer = new WebGLRenderer({
  antialias : true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xffffff, 1 );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);


/*
var gh = new GridHelper(200, 200, "black", "black");
gh.rotation.x = Math.PI * 0.5;
gh.position.z = 0.01;
scene.add(gh);

*/

var canvas = document.createElement("canvas");
var map = new CanvasTexture(canvas);
canvas.width = 1000;
canvas.height = 1000;
var ctx = canvas.getContext("2d",{willReadFrequently: true}) as CanvasRenderingContext2D;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawRectangle(x: number, y: number, width: number, height: number, color: string) {
  let xUnit = canvas.width / 100;
  let yUnit = canvas.height / 100;

  let x_ = x * xUnit;
  let y_ = y * yUnit;
  let w_ = width * xUnit;
  let h_ = height * yUnit;

  ctx.fillStyle = color;
  ctx.fillRect(x_, y_, w_, h_);
  map.needsUpdate = true;
}

function getPixelColor(x: number, y: number, width: number, height: number): Uint8ClampedArray {
  let xUnit = canvas.width / 100;
  let yUnit = canvas.height / 100;

  let x_ = x * xUnit;
  let y_ = y * yUnit;
  let w_ = width * xUnit;
  let h_ = height * yUnit;

  return ctx.getImageData(x_, y_, w_, h_).data;
}

drawRectangle(40, 38, 1, 1, "black");
drawRectangle(40, 39, 1, 1, "black");
drawRectangle(40, 40, 1, 1, "black");

console.log(isBlack(getPixelColor(40, 38, 1, 1)));
console.log(isBlack(getPixelColor(40, 39, 1, 1)));
console.log(isBlack(getPixelColor(40, 40, 1, 1)));


var plane = new Mesh(new PlaneGeometry(100, 100), new MeshBasicMaterial({
  color: "white",
  map: map
}));
scene.add(plane);

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

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});

let interval: any = null;

function draw() {
  interval = setInterval(() => {
    let aliveCells: any[] = [];
    let deadCells: any[] = [];
  
    for(let x=0; x < 100; x++) {
        for(let y=0; y < 100; y++) {
            let pixelData = getPixelColor(x, y, 1, 1);
            let nb = 0;
    
            for(let i=x-1; i < x+2; i++) {
                for(let j=y-1; j < y+2; j++) {
                    if(i == x && j == y) {
                        continue;
                    }else {
                        let p = getPixelColor(i, j, 1, 1);
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
                }
            }
        }
    }

  
    for(let i=0; i < deadCells.length; i++) {
        drawRectangle(deadCells[i][0], deadCells[i][1], 1, 1, "white");
    }
  
    for(let i=0; i < aliveCells.length; i++) {
        drawRectangle(aliveCells[i][0], aliveCells[i][1], 1, 1, "black");
    }
  });
}



window.addEventListener("keydown", (e) => {
  if(e.key == " ") {
    console.log('start');
    draw();
  }
});

window.addEventListener("keyup", (e) => {
  if(e.key == "p") {
    console.log('stop');
    clearInterval(interval);
  }
});










/*
const body = document.querySelector('body') as HTMLBodyElement
var scene = new Scene();
var camera = new PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 0, 10);
camera.position.z = 200;
camera.lookAt(scene.position);
var renderer = new WebGLRenderer();
renderer.setClearColor(0x888888);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);


var gh = new GridHelper(200, 200, "black", "black");
gh.rotation.x = Math.PI * 0.5;
gh.position.z = 0.01;
scene.add(gh);


renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});





window.addEventListener("keyup", (e) => {
  console.log('keyup', e.key);
  body.style.cursor = "auto";
});

var canvas = document.createElement("canvas");

canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var planeW = 10; // pixels
var planeH = 10; // pixels 
var numW = 10; // how many wide (50*50 = 2500 pixels wide)
var numH = 10; // how many tall (50*50 = 2500 pixels tall)
var plane = new Mesh(
    new PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ),
    new MeshBasicMaterial( {
     
        color: 0x000000,
        wireframe: true
    } )
);

scene.add(plane);



function drawRectangle(x: number, y: number, width: number, height:number, color:string) {
  let xUnit = canvas.width / 10;
  let yUnit = canvas.height / 10;

  let x_ = x * xUnit;
  let y_ = y * yUnit;
  let w_ = width * xUnit;
  let h_ = height * yUnit;

  ctx.fillStyle = color;
  ctx.fillRect(x_, y_, w_, h_);
  map.needsUpdate = true;
}

drawRectangle(0, 0, 10, 10, "blue");

var plane = new Mesh(new PlaneGeometry(10, 10), new MeshBasicMaterial({
  color: "white",
  map: map
}));
scene.add(plane);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});


var canvas = document.createElement("canvas");
var map = new CanvasTexture(canvas);
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);


function drawRectangle(x: number, y: number, width: number, height:number, color:string) {
  let xUnit = canvas.width / 10;
  let yUnit = canvas.height / 10;

  let x_ = x * xUnit;
  let y_ = y * yUnit;
  let w_ = width * xUnit;
  let h_ = height * yUnit;

  ctx.fillStyle = color;
  ctx.fillRect(x_, y_, w_, h_);
  map.needsUpdate = true;
}

var plane = new Mesh(new PlaneGeometry(window.innerWidth, window.innerHeight), new MeshBasicMaterial({
  color: "white",
  map: map
}));
scene.add(plane);


for(let i=0; i<100; i++) { 
  for(let j=0; j<100; j++) {
    drawRectangle(i, j, 1, 1, "blue");
  }
}

import {Scene, WebGLRenderer, AxesHelper, PerspectiveCamera, Mesh, BoxGeometry, MeshBasicMaterial} from 'three'

const scene = new Scene();
scene.add(new AxesHelper());

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 3;
const renderer = new WebGLRenderer({
    antialias : true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);
scene.add(camera);
document.body.appendChild(renderer.domElement);

const cube = new Mesh(
    new BoxGeometry(1, 1, 1), 
    new MeshBasicMaterial({ color: 0xff0000 })
);

scene.add(cube);

function createLabel(text, x, y, z, size, color) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    context.font = size + "pt Arial";
    context.textAlign = "center";
    context.fillStyle = "blue";
    context.fillRect(0, 0, 600, 600);
    

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
        map : texture
    });

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(600, 600, 10, 10), material);
    // mesh.overdraw = true;
    // mesh.doubleSided = true;
    mesh.position.x = x;
    mesh.position.y = y;

    return mesh;
}

function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


*/