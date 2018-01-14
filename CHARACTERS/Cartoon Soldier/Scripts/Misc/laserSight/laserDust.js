private var startTime : float;
private var life : float = 0.5;
private var lifeVariation : float = 1.0;
private var endTime : float;
private var length : float;
private var scale : float;
private var maxAlpha : float;

function Start(){
	startTime = Time.time;
	life = life + lifeVariation * Random.value;
	endTime = Time.time + life;
	length = Random.Range(6,8);
	scale = Random.Range(0.11,0.14);
	var laserColor = Color(0,0,0);
	renderer.material.SetColor("_TintColor", laserColor);
	maxAlpha = Random.Range(0.1,0.3);
}

function Update () {
	if(Time.time > endTime){
		Destroy(gameObject);
	}
	var age = Time.time - startTime;
	var progress = age / life;
	var curveProgress = -4*Mathf.Pow(progress,2) + progress*4;
	var parentAlpha : float = 1.0;
	if(transform.parent != null){
		parentAlpha = transform.parent.GetComponent(laserLine).GetCurveProgress();
	}
	var laserColor = Color(curveProgress * maxAlpha * parentAlpha,0,0);
	renderer.material.SetColor("_TintColor", laserColor);
	transform.LookAt(Camera.main.transform.position);
	transform.localScale = Vector3.one * (scale + curveProgress * scale * 0.2);
}