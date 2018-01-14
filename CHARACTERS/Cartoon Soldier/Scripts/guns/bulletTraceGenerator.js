var bulletTracePrefab : GameObject;
var rate : float = 8.0;
var velocity : Vector3;
var on : boolean = false;
var accuracy : float = 1.0; //1.0 to 0.0;

private var nextbulletTraceTime : float;

function Update () {
	accuracy = Mathf.Clamp01(accuracy);
	if (on){
		if(Time.time > nextbulletTraceTime){
			rate = Mathf.Max(rate, 1.0);
			nextbulletTraceTime = Time.time + (1.0 / rate);
			var newBulletTrace : GameObject = Instantiate(bulletTracePrefab,transform.position,transform.rotation);
			var bulletVelocity : Vector3 = newBulletTrace.GetComponent("bulletTrace").velocity;
			var badAim : float = (1-accuracy);
			badAim *= newBulletTrace.GetComponent("bulletTrace").bulletSpeed * 0.05;
			bulletVelocity += newBulletTrace.transform.right * Random.Range(-badAim,badAim);
			bulletVelocity += newBulletTrace.transform.up * Random.Range(-badAim,badAim);
			newBulletTrace.GetComponent("bulletTrace").velocity = bulletVelocity;
		}
	}
}