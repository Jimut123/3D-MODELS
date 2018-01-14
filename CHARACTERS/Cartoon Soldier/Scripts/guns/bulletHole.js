var materials : Material[];
var life : float = 4.0;
var size : float = 1.0;

private var destroyTime : float;
private var startTime : float;

function Start(){
	startTime = Time.time;
	destroyTime = Time.time + life;
	var chooseId : int = Mathf.RoundToInt(Random.Range(0,materials.Length));
	renderer.material = materials[chooseId];
	var parent : Transform = transform.parent;
	transform.parent = null;
	transform.localRotation.eulerAngles.z = Random.value * 360;
	transform.localScale = Vector3.one * (0.5 + Random.value * 0.5) * size;
	transform.parent = parent;
}

function Update () {
	if (Time.time > destroyTime){
		Destroy(gameObject);
	}
	//var age = Time.time - startTime;
	if (Time.time > destroyTime - 1.0){
		var fadeProgress : float = destroyTime-Time.time;
		renderer.material.color.a = fadeProgress;
	}
}