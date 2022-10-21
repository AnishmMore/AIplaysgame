
function nextGeneration() {
	console.log('next generation');
	calculateFitness();

	for(let i=0;i< TOTAL; i++){
		dinos[i] = pickOne();
	}
	for(leti=0;i<TOTAL;i++){
		saveddinos[i].dispose();
	}
	saveddinos=[];
}

function pickOne(){
	let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - saveddinos[index].fitness;
    index++;
  }
  index--;
  let dino = saveddinos[index];
  let child = new TRex(dino.brain);
  child.mutate();
  return child;
}
function calculateFitness(){
	let sum=0;
	for(let dino of saveddinos){
		sum+=dino.score;
	}
	for(let dino of saveddinos){
		dino.fitness=dino.score / sum;

	}
}