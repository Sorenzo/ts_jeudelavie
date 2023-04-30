import './style.css'
import {Scene, CanvasTexture, PlaneGeometry, WebGLRenderer, GridHelper, AxesHelper, PerspectiveCamera, Mesh, BoxGeometry, MeshBasicMaterial} from 'three'

var scene = new Scene();
var camera = new PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(scene.position);
var renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

var gh = new GridHelper(10, 10, "black", "black");
gh.rotation.x = Math.PI * 0.5;
gh.position.z = 0.01;
scene.add(gh);

var canvas = document.createElement("canvas");
var map = new CanvasTexture(canvas);
canvas.width = 512;
canvas.height = 512;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawRectangle(x, y, width, height, color) {
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

drawRectangle(0, 0, 10, 10, "gray");

drawRectangle(1, 1, 4, 3, "aqua");
drawRectangle(0, 6, 6, 3, "magenta");
drawRectangle(3, 2, 6, 6, "yellow");

var plane = new Mesh(new PlaneGeometry(10, 10), new MeshBasicMaterial({
  color: "white",
  map: map
}));
scene.add(plane);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});

/*
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