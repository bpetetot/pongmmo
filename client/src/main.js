var socket = io('http://192.168.43.60:9000');

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var renderer = new PIXI.WebGLRenderer(800, 600);

// The renderer will create a canvas element for you that you can then insert into the DOM.
var fps = document.getElementById('fps')
var mainStage = document.getElementById('main')
mainStage.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// Declare a global variable for our sprite so that the animate function can access it.
var player = null;
var players = [];

var avatarFile = require("file!../assets/fabien.png")

var ticker = new PIXI.ticker.Ticker();


socket.on('SET_PLAYER', function (data) {
  // load the texture we need
  PIXI.loader.add('player', avatarFile).load(function (loader, resources) {
      // This creates a texture from a 'avatar.png' image.
      player = new PIXI.Sprite(resources.player.texture);
      // Setup the position and scale of the avatar
      player.position.x = data.x;
      player.position.y = data.y;
      // Add the avatar to the scene we are building.
      stage.addChild(player);
  });
});

socket.on('SET_PLAYERS', function (data) {
  data.forEach(function(p, i) {
    // load the texture we need
    PIXI.loader.add('player' + i, avatarFile).load(function (loader, resources) {
        // This creates a texture from a 'avatar.png' image.
        player = new PIXI.Sprite(resources.player.texture);
        // Setup the position and scale of the avatar
        player.position.x = p.x;
        player.position.y = p.y;
        // Add the avatar to the scene we are building.
        stage.addChild(player);
        players.push(player)
    });
  })
  // kick off the animation loop (defined below)
  animate();
});

socket.on('UPDATE_PLAYER', function (data) {
  const p  = players[0];
  // Setup the position and scale of the avatar
  p.position.x = data.x;
  p.position.y = data.y;
});

function updateFPS() {
  fps.innerHTML = 'FPS : ' + ticker.FPS;
}

document.addEventListener('keydown', function(event) {
  var keyName = event.key;
  if (keyName === 'ArrowLeft') {
    player.x -= 10
    socket.emit('UPDATE_PLAYER', { x: player.x, y: player.y})
  } else if (keyName === 'ArrowRight') {
    player.x += 10
    socket.emit('UPDATE_PLAYER', { x: player.x, y: player.y})
  }
}, false);



function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
    // each frame we spin the avatar around a bit
    //avatar.rotation += 0.01;

    //
    updateFPS()
    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}
