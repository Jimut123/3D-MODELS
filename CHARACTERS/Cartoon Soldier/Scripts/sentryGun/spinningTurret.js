var on : boolean = true;
var maxSpeed : float = 1000;
var acceleration : float = 0.8;
var speed : float;

function Update () {
	if(on){
		speed = Mathf.Lerp(speed, maxSpeed, Time.deltaTime * acceleration);
	}
	else{
		speed = Mathf.Lerp(speed, 0, Time.deltaTime * acceleration);
	}
	transform.localRotation.eulerAngles.y += speed * Time.deltaTime;
}