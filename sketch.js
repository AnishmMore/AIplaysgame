var horizon;
var obstacleSpeed;
var score;
var obstacles = [];
const TOTAL =100;
let dinos= [];
let saveddinos=[];
function setup() {

  createCanvas(1000, 300);


  textAlign(CENTER);

  horizon = height - 40;

	score = 0;
	obstacleSpeed = 6;

	for (let i=0;i<TOTAL;i++){
	dinos[i] = new TRex();}

  textSize(20);
 //newObstacle(frameCount);
}




function draw() {
  background(51);
    drawHUD();
	
	handleObstacles();
	
	
	handleLevel(frameCount);
	for (let dino of dinos){
	dino.think(obstacles);	
	dino.update(horizon);
}
 	
}

/**
	* draws horizon & score
	*/
function drawHUD() {

  /* draw horizon */
  stroke(255);
	strokeWeight(2);
  line(0, horizon, width, horizon);

	/* draw score */
  noStroke();
  text("Score: " + score, width / 2, 30);

	/* draw T-Rex */
	for (let dino of dinos){
	dino.draw();
	}
	if(dinos.length===0){
		score=0;
		frameCount==0;
		nextGeneration();
		obstacles=[];}
}


/**
	*	updates, draws, and cleans out the obstacles
	*/
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();
		for(let j=dinos.length-1;j>=0;j--){
		

		if (obstacles[i].hits(dinos[j])) // if there's a collision
			saveddinos.push(dinos.splice(j,1)[0]);
		
	}
	 
		



	if (!obstacles[i].onScreen) // if it's no longer showing
      obstacles.splice(i, 1); // delete from array
  
  }
}


/**
	* speeds game up, pushes new obstacles, & handles score
	*/


function handleLevel(n) {

  if (n % 29 === 0) { 
    var n = noise(n); // noisey
    if (n > 0.47)
      newObstacle(n); // push new obstacle

	  if (n % 120 === 0) // every 2 seconds
	    obstacleSpeed *= 1.20; // speed up

  }

	score++;
}

/**
	* pushes random obstacle
	*/
function newObstacle(n) {

	var col = color(random(255), random(255), random(255));
	var size =random(20) + 20;
  var obs = new Obstacle(width + size, size, horizon, col);
  obstacles.push(obs);
}

/*function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32) && dino.onGround) // jump if possible
		dino.jump();
}*/

function endGame() {

	noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Press f5 to restart", width / 2, height / 2 + 20);
}

