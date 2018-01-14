var on : boolean = true;

function Update () {
	if(on){
		transform.LookAt(Camera.main.transform.position);
		transform.localScale = Vector3.one * Random.Range(0.3,0.5);
		var laserColor : Color = Color.red;
		laserColor.a = Random.Range(0.2,1.0);
		renderer.material.SetColor("_TintColor",laserColor);
		renderer.enabled = true;
	}
	else{
		renderer.enabled = false;
	}
}