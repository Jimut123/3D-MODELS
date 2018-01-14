var particleFade : AnimationCurve;
var color : Color;
var minSize : float;
var maxSize : float;

function Update () {
	var particles : Particle[] = particleEmitter.particles;
	for (var i = 0; i < particles.Length; i++){
		particles[i].color = color;
		particles[i].color.a = particleFade.Evaluate(1-(particles[i].energy / particles[i].startEnergy));
		var energyVariation : float = particleEmitter.maxEnergy - particleEmitter.minEnergy;
		var particleEnergyVariation : float = particles[i].startEnergy - particleEmitter.minEnergy;
		var makeSize : float = particleEnergyVariation / energyVariation;
		particles[i].size = Mathf.Lerp(minSize, maxSize, makeSize);
	}
	particleEmitter.particles = particles;
	
}