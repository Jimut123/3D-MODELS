var minLife : float = 0.01;
var maxLife : float = 0.02;

private var destroyTime : float;
private var angle : float;

function Start(){
	destroyTime = Time.time + Random.Range(minLife, maxLife);
	angle = 90 * Mathf.Round(Random.Range(0,3));
}

function Update () {
	if (Time.time > destroyTime){
		Destroy(gameObject);
	}
	transform.LookAt(Camera.main.transform.position);
	transform.localRotation.eulerAngles.z += angle;
}