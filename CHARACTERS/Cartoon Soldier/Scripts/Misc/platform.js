var maxHeight : float = 5.0;
var minHeight : float = 1.0;
var speed : float = 2.0;
private var rising : boolean;
private var velocity : float;

function Start(){
	rising = true;
}
function Update () {
	if (rising){
		transform.position.y = Mathf.SmoothDamp(transform.position.y, maxHeight, velocity, 1.0 / speed);
		if(Mathf.Abs(transform.position.y - maxHeight) < 0.1){
			rising = false;
		}
	}
	else{
		transform.position.y = Mathf.SmoothDamp(transform.position.y, minHeight, velocity, 1.0 / speed);
		if(Mathf.Abs(transform.position.y - minHeight) < 0.1){
			rising = true;
		}
	}
}