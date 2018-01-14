var cameraTiltMultiplier : float = 1.0;
private var lastPosition : Vector3;
private var forwardSpeed : float;
private var cameraTilt : float;
private var verticalAim : float;
private var localPosition : Vector3;
private var positionOffset : Vector3;
//External scripts.
private var healthScript : health;
private var crouchControllerScript : crouchController;
//Soldier parts.
private var spine2 : Transform;

function Start(){
	cameraTilt = 0.0;
	vertialAim = 0.0;
	localPosition = transform.localPosition;
	positionOffset = Vector3.zero;
	healthScript = transform.root.GetComponent(health);
	crouchControllerScript = transform.root.GetComponent(crouchController);
	spine2 = transform.root.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2");
}

function Update(){
	var health : float = 100;
	if(healthScript != null){
		health = healthScript.GetHealth();
	}
	//Camera tilt.
	var cameraTiltTarget : float;
	cameraTiltTarget = Input.GetAxis("Mouse X");
	var velocity : Vector3 = transform.root.position - lastPosition;
	lastPosition = transform.root.position;
	forwardSpeed = transform.InverseTransformDirection(velocity).z;
	cameraTiltTarget *= -forwardSpeed * 60.0 * cameraTiltMultiplier ;
	cameraTiltTarget = Mathf.Clamp(cameraTiltTarget,-30,30);
	cameraTilt = Mathf.Lerp(cameraTilt, cameraTiltTarget, Time.deltaTime * 3.0);
	if(health > 0){
		transform.localRotation.eulerAngles.z = cameraTilt;
	}
	//Vertical aim.
	verticalAim -= Input.GetAxis("Mouse Y") * Time.deltaTime * 100.0;
	verticalAim = Mathf.Clamp(verticalAim,-40,50);
	var crouchCameraYOffset : float = 0.0; //Camera crouch;
	if(crouchControllerScript != null){
		crouchCameraYOffset = -crouchControllerScript.globalCrouchBlend * 0.2;
	}
	if(health <= 0){
		verticalAim = 0;
		crouchCameraYOffset = 0;
	}
	if(health>0){
		transform.localRotation.eulerAngles.x = Mathf.LerpAngle(transform.localRotation.eulerAngles.x, verticalAim, Time.deltaTime * 5.0);
	}
	//Local position.
	if(verticalAim > 0){
		positionOffset.y = verticalAim * 0.03;
	}
	else{
		positionOffset.y = verticalAim * 0.02;
	}

	positionOffset.y += crouchCameraYOffset;
	if(health > 0){
		transform.localPosition = Vector3.Lerp(transform.localPosition, localPosition + positionOffset, Time.deltaTime * 5.0);
	}
	//Death Camera.
	if(health <= 0){
		var spineRelativePos : Vector3 = spine2.position - transform.position;
		var lookSpineRotation : Quaternion = Quaternion.LookRotation(spineRelativePos);
		transform.rotation = Quaternion.Slerp(transform.rotation, lookSpineRotation,Time.deltaTime*3.0);
		transform.localPosition = Vector3.Lerp(transform.localPosition,Vector3(2,3,0),Time.deltaTime*3.0);
	}
}
