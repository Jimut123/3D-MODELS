var life : float = 1.5;
var lifeVariation : float = 0.5;

private var startTime : float;
private var destroyTime : float;
private var velocity : Vector3;
private var gravity : float = 9.8;
private var scale : float = 1.0;


function Start(){
	startTime = Time.time;
	life += Random.Range(-lifeVariation*0.5,lifeVariation*0.5); //Vary life.
	destroyTime = Time.time + life;
	velocity = Random.insideUnitSphere * 4.0;
	velocity.y += Random.value * 3.0;
}

function Update () {
	if(Time.time > destroyTime){
		Destroy(gameObject);
	}
	var hit : RaycastHit;
	if (Physics.Raycast(transform.position, velocity, hit, velocity.magnitude * Time.deltaTime)){
		velocity = Vector3.Reflect(velocity, hit.normal);
	}
	//Velocity.
	velocity.y -= gravity * Time.deltaTime;
	velocity = Vector3.Lerp(velocity, Vector3.zero, Time.deltaTime);
	transform.position += velocity * Time.deltaTime;
	//Rotation.
	transform.LookAt(transform.position + velocity);
	//Scale.
	scale = Mathf.Lerp(0.2,0.05, (Time.time - startTime) / life);
	transform.localScale = Vector3.one * scale;
	transform.localScale.z = (0.2 + velocity.magnitude * 0.6) * scale;
}

