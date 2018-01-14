private var life : float = 0.06;
private var destroyTime : float;
private var angle : float;
var material : Material[];
var flyingSparkPrefab : GameObject;	
private var flyingSparkAmount : int = 3;
private var flyingSparkAmountVariation : int = 2;

function Start(){
	var materialID : int = Mathf.FloorToInt(Random.value * material.Length);
	renderer.material = material[materialID];
	destroyTime = Time.time + life;
	angle = Random.value * 360; 
	transform.LookAt(Camera.main.transform.position);
	transform.localRotation.eulerAngles.z += angle;
	transform.localScale *= 0.5 + Random.value;
	var flyingSparkAmount : int = flyingSparkAmount + Mathf.RoundToInt(Random.Range(-flyingSparkAmountVariation *0.5, flyingSparkAmountVariation *0.5));
	for(var i = 0; i < flyingSparkAmount; i++){
		Instantiate(flyingSparkPrefab, transform.position, transform.rotation);
	}
}

function Update () {
	if (Time.time > destroyTime){
		Destroy(gameObject);
	}
	transform.LookAt(Camera.main.transform.position);
	transform.localRotation.eulerAngles.z += angle;
	transform.localScale *= 1 + 10 *(Time.deltaTime);
}