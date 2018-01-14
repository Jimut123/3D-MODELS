var dustCloudPrefab : GameObject;
var rate : float = 8.0;
var materials : Material[];
var on : boolean = true;
var life : float = 0.3;

private var nextdustCloudTime : float;
private var destroyTime : float;
var velocity : Vector3;

function Start(){
	destroyTime = Time.time + life;
}

function Update () {
	if (Time.time > destroyTime){
		Destroy(gameObject);
	}
	if(Time.time > nextdustCloudTime){
		nextdustCloudTime = Time.time + (1.0 / rate);
		var newDustCloud : GameObject = Instantiate(dustCloudPrefab,transform.position,transform.rotation);
		var materialId : int = Mathf.RoundToInt(Random.Range(0,materials.Length-1));
		newDustCloud.renderer.material = materials[materialId];
		newDustCloud.GetComponent("dustCloud").velocity = velocity;
	}
}