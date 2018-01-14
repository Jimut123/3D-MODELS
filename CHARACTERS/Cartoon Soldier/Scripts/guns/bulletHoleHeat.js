var life : float = 1.0;
var startColor : Color;
var endColor : Color;

private var startTime : float;
private var destroyTime : float;

function Start(){
	life = Random.value * life;
	startTime = Time.time;
	destroyTime = Time.time + life;
}

function Update () {
	if(Time.time > destroyTime){
		Destroy(gameObject);
	}
	var age : float = Time.time - startTime;
	var progress : float = age / life;
	var heatColor = renderer.material.GetColor("_TintColor");
	heatColor = Color.Lerp(startColor, endColor, progress);
	heatColor.a = Mathf.Lerp(1,0,progress);
	renderer.material.SetColor("_TintColor", heatColor);
}