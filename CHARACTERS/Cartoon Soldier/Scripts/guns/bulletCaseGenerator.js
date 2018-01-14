var bulletCasePrefab : GameObject;
var rate : float = 8.0;
var velocity : Vector3;
var on : boolean = true;

private var nextbulletCaseTime : float;

function Update () {
	if (on){
		if(Time.time > nextbulletCaseTime){
			nextbulletCaseTime = Time.time + (1.0 / rate);
			var newBulletCase : GameObject = Instantiate(bulletCasePrefab,transform.position,transform.rotation);
			newBulletCase.GetComponent(bulletCase).velocity = transform.TransformDirection(velocity) + Random.insideUnitSphere * 0.3;
		}
	}
}