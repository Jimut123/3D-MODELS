var life : float = 2.0;

private var startTime : float;
private var destroyTime : float;
private var velocity : Vector3;
private var gravity : float = 9.8;
private var angle : float;
private var startSturnSpeed : float;
private var turnSpeed : float;
private var startScale : float;;
private var endScale : float;

function Start(){
	startTime = Time.time;
	destroyTime = Time.time + life;
	velocity += Random.insideUnitSphere*.5;
	velocity.y += Random.value * 0.6;
	turnSpeed = Random.Range(-360,360);
	startSturnSpeed = turnSpeed;
	angle = Random.value * 360;
	startScale = Random.Range(0.05,0.01);
	transform.localScale = Vector3.one * startScale;
	endScale = 1.0 + Random.value * 2.0;
}

function Update () {
	if(Time.time > destroyTime){
		Destroy(gameObject);
	}
	var age : float = Time.time - startTime;
	var falloffProgress : float = Mathf.Pow(age / life, 0.2);
	turnSpeed = Mathf.Lerp(startSturnSpeed ,0, falloffProgress);
	velocity.y -= gravity * Time.deltaTime;
	velocity = Vector3.Lerp(velocity, Vector3.zero, Time.deltaTime * 5.0);
	transform.position += velocity * Time.deltaTime;
	transform.LookAt(Camera.main.transform.position);
	angle += turnSpeed * Time.deltaTime;
	transform.localRotation.eulerAngles.z = angle;
	transform.localScale = Vector3.Lerp(Vector3.one*startScale , Vector3.one * endScale, falloffProgress);
	var cloudColor : Color = renderer.material.GetColor("_Color");
	cloudColor.a = Mathf.Lerp(cloudColor.a, 0, Time.deltaTime * life);
	renderer.material.SetColor("_Color", cloudColor);
}