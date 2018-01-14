var muzzleFlashPrefab : GameObject;
var materials : Material[];
var rate : float = 8.0;
var on : boolean = true;

private var nextMuzzleFlashTime : float;

function Update () {
	if (on){
		if(Time.time > nextMuzzleFlashTime){
			nextMuzzleFlashTime = Time.time + (1.0 / rate);
			var newMuzzleFlash : GameObject = Instantiate(muzzleFlashPrefab,transform.position,transform.rotation);
			var materialId : int = Mathf.RoundToInt(Random.Range(0,materials.Length));
			newMuzzleFlash.renderer.material = materials[materialId];
			newMuzzleFlash.transform.parent = transform;
		}
	}
}