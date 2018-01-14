var objs : GameObject[];

var rotationAmountX : float = 0.05;
var rotationAmountY : float = 0.2;
var rotationAmountZ : float = 0.0;

var randomSpeedPercent : float = 0.0;

private var numObjs;
private var r : float[];

function Start () {
	
	numObjs = objs.length;
	r = new float[numObjs];
	
	for (var i = 0; i<numObjs; i++) {
		r[i] = 1 + (Random.value * (randomSpeedPercent/100.0));
	}
	
}
function Update () {
	
	for (var i = 0; i<numObjs; i++) {
	
		objs[i].transform.Rotate( Vector3(rotationAmountX*r[i], rotationAmountY*r[i], rotationAmountZ*r[i])  );
	}
	
}