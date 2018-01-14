var laserDustPrefab : GameObject;

private var startTime : float;
private var life : float = 1.0;;
private var lifeVariation : float = 1.0;
private var endTime : float;
private var length : float;
private var laserDustRate : float = 12.0;
private var nextLaserDustTime : float;
private var laserColor : Color;
private var curveProgress : float;

function Start(){
	startTime = Time.time;
	life = life + lifeVariation * Random.value;
	endTime = Time.time + life;
	length = Random.Range(1,3);
	laserColor = Color(0,0,0);
	for (var i = 0; i < transform.childCount; i++){
		var child : Transform = transform.GetChild(i);
		child.renderer.material.SetColor("_TintColor", laserColor);
	}
}

function Update () {
	if(Time.time > endTime){
		Destroy(gameObject);
	}
	var age : float = Time.time - startTime;
	var progress : float = age / life;
	curveProgress = -4*Mathf.Pow(progress,2) + progress*4;
	laserColor = Color(curveProgress*0.10,0,0);
	for (var i = 0; i < transform.childCount; i++){
		var child : Transform = transform.GetChild(i);
		if(child.name == "visual"){
			child.renderer.material.SetColor("_TintColor", laserColor);
			child.localScale = Vector3.one * 0.1;
			child.localScale.y = length + 2.0 * curveProgress + Random.value*1.0;
		}
	}
	transform.localScale = Vector3.one;
	if(Time.time > nextLaserDustTime){
		nextLaserDustTime = Time.time + (1/ laserDustRate);
		var newLaserDust : GameObject = Instantiate(laserDustPrefab, transform.position, Quaternion.identity);
		newLaserDust.transform.parent = transform;
		var getPosition : float = (transform.localScale.y*0.5) / newLaserDust.transform.localScale.y;
		newLaserDust.transform.localPosition.y = Random.Range(-getPosition*0.5,getPosition*0.5);

	}
}

function GetCurveProgress(){
	return curveProgress; //Red is the only color used on the laser color. Black is transparent because of particle additive material.
}