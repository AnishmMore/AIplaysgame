class TRex {
	constructor(brain){
	this.x = 40;
	this.y = 40;

	this.yVelocity = 0;
	this.speed = 1;
	this.onGround = true;
	this.radius=20;
	 // size of circle
	
	this.score=0;
	this.fitness=0;
	 if(brain){
        this.brain = brain.copy();
    } 
    else 
    {
      this.brain = new NeuralNetwork(3, 8, 2);
    }
  }

  dispose=function() {
    this.model.dispose();
  }
  mutate=function(){
		this.brain.mutate(0.1)
	}

  think= function(obstacles){

  	//find closest obstacle
  	let closest = 0;
  	let closestD=Infinity;
  	for(let i=0;i<obstacles.length;i++){
  		let d = obstacles[i].x-this.x;
  		if(d< closestD && d>0)
  		{
  			closest=obstacles[i];
  			closestD=d;
  		}

  	}
	let inputs=[];
	inputs[0]=this.y/height;
	inputs[1]=closest.x/height;
	inputs[2]=closest.size/height;

	
	let output= this.brain.predict(inputs);
	if (output[0] > output[1] && this.onGround ){
		this.jump();
	}
}

/**
	*	handle y values
	*/
	update = function(platform) {
	this.score++;
	var bottom = this.y + this.radius; // bottom pixel of circle
	var nextBottom = bottom + this.yVelocity; // calculate next frame's bottom

  if (bottom <= platform && nextBottom >= platform) { // next frame will be on platform

		this.yVelocity = 0; // reset velocity
		this.y = platform - this.radius; // don't go past platform
		this.onGround = true;
  } else if (platform - bottom > 1) { // nowhere near platform

		this.yVelocity += this.speed; // increase velocity
		this.onGround = false;
  }

	/* movement */
	this.y += this.yVelocity;
}

/**
	* make the dino jump
	*/
	jump = function() {

	this.yVelocity = -(this.radius * 0.7); // jump
}
	

	draw = function() {

  
	stroke(255);
	fill(153,100);

	strokeWeight(2);
  ellipse(this.x, this.y, this.radius * 2);
}
}
