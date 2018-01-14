//This script controls how the soldier will move.
@script RequireComponent(CharacterController);

var forwardSpeedMultiplier : float = 3.0;
var strafeSpeedMultiplier : float = 2.0;
var turnSpeedMultiplier : float = 6.0;
var gravity : float = 9.8;
//var soldierLocation : String = "smoothWorldPosition/soldierSkeleton";
var soldier : Transform;
var turnSpeed : float = 0.0;
var forwardSpeed : float = 0.0; //Speed the character will moved at.
var strafeSpeed : float = 0.0;
var isGrounded : boolean;

private var stopAfterLanding : float = 0.0; //How much time in seconds will the character stop after landing.
private var fallSpeed : float = 0.0;
private var lastGroundedTime : float; //Last time since soldier was touching the ground.
private var lastLandingTime : float; //Last time since the soldier landed after a fall.
private	var targetForwardSpeed : float;
private	var targetStrafeSpeed : float;
private var crouchControllerScript : crouchController;
private var isFalling : boolean;
private var healthScript : health;
private var recoilAmount : float;
private var recoilAmountTarget : float;

function Start(){
	crouchControllerScript = GetComponent("crouchController");
	healthScript = GetComponent("health");
	isFalling = false;
	//soldier = transform.Find(soldierLocation);
}

function Update () {
	//Stick to platforms.
	var rayHeight : float = 0.5;
	var rayOrigin : Vector3 = transform.position + Vector3.up * rayHeight;
	var platformRay : Ray = new Ray(rayOrigin, Vector3.down);
	var rayDistance : float = rayHeight * 2.0;
	var platformHit : RaycastHit;
	if (Physics.Raycast(platformRay, platformHit, rayDistance)){
		if(platformHit.transform.root != transform){
			isGrounded = true;
			transform.position.y = platformHit.point.y;
		}
	}
	else{
		isGrounded = false;
	}
	
	var controller : CharacterController = GetComponent(CharacterController);
	//Hit recoil.
	var recoilVector : Vector3 = Vector3.zero;
	var recoilInhibit : float = 1.0;
	var deathInhibit : float = 1.0;
	if (healthScript != null){
		var lastHitTime : float = healthScript.GetLastHitTime();
		var recoilDirecion : Vector3 = healthScript.GetrecoilDirecion();
		var maxRecoil : float = 0.6;
		var timeAfterHit : float = Time.time - lastHitTime;
		var recoilAmountTarget : float = 0.0;
		if(timeAfterHit < maxRecoil && lastHitTime != 0){
			recoilAmountTarget = maxRecoil-timeAfterHit;
			recoilAmountTarget *= (1-Mathf.Abs(Input.GetAxis("Vertical")));
			recoilAmountTarget *= (1-Mathf.Abs(Input.GetAxis("Horizontal")));
		}
		if(recoilAmount < recoilAmountTarget){
			recoilAmount = Mathf.Lerp(recoilAmount, recoilAmountTarget, Time.deltaTime);
		}
		else{
			recoilAmount = Mathf.Lerp(recoilAmount, recoilAmountTarget, Time.deltaTime*20);
		}
		var biasRecoilAmount : float = recoilAmount; //Bias to 0.
		biasRecoilAmount /= maxRecoil;
		biasRecoilAmount = Mathf.Pow(biasRecoilAmount,2.0);
		biasRecoilAmount *= maxRecoil;
		recoilVector = recoilDirecion * biasRecoilAmount;
		recoilInhibit = 1 -(recoilAmount*0.65/maxRecoil);
		var health : float = healthScript.health;
		if(health <= 0){
			deathInhibit = 0;
		}
		else{
			deathInhibit = 1.0;
		}
	}
	//Position.
	if (isGrounded){
		if (isFalling){
			isFalling = false;
			lastLandingTime = Time.time;
			stopAfterLanding = (lastLandingTime - lastGroundedTime) * 2.0;
		}
		fallSpeed = 0.0;
	}
	else{
		if (!isFalling){
			isFalling = true;
			lastGroundedTime = Time.time;
		}
		fallSpeed += gravity * Time.deltaTime;
	}
	var moveDirection : Vector3;
	moveDirection.y -= fallSpeed;
	if (isGrounded){
		targetForwardSpeed = Input.GetAxis("Vertical");
		targetStrafeSpeed = Input.GetAxis("Horizontal");
		targetForwardSpeed *=  forwardSpeedMultiplier;
		targetStrafeSpeed *= strafeSpeedMultiplier;
		if(Input.GetAxis("Vertical") < 0){//Slow down going backwards;
			targetForwardSpeed *= 0.5;
		}
		if(Input.GetKey(KeyCode.LeftShift)){//Sprint with left shift;
			targetForwardSpeed *= 1.5;
			targetStrafeSpeed *= 1.5;
		}
	}
	if(crouchControllerScript != null){ //Crouch speed multiplier.
		targetForwardSpeed = Mathf.Lerp(targetForwardSpeed, targetForwardSpeed * crouchControllerScript.crouchSpeedMultiplier, crouchControllerScript.globalCrouchBlend);
	}
	if(Time.time <= lastLandingTime + stopAfterLanding && stopAfterLanding > 0.5){
		var timeSinceLanding : float = Time.time - lastLandingTime;
		var landingSpeedInhibit : float = Mathf.Pow(timeSinceLanding / stopAfterLanding, 1.5);
		targetForwardSpeed *= landingSpeedInhibit;
		targetStrafeSpeed *= landingSpeedInhibit;
	}
	forwardSpeed = Mathf.Lerp(forwardSpeed, targetForwardSpeed, Time.deltaTime * 15.0);
	strafeSpeed = Mathf.Lerp(strafeSpeed, targetStrafeSpeed, Time.deltaTime * 15.0);
	moveDirection += soldier.forward * forwardSpeed * recoilInhibit * deathInhibit;
	moveDirection += soldier.right * strafeSpeed * recoilInhibit * deathInhibit;
	moveDirection += recoilVector;
	controller.Move(moveDirection * Time.deltaTime);//Move the controller.
	//Rotation.
	var targetTurnSpeed : float = 0.0;
	targetTurnSpeed= Input.GetAxis("Mouse X");
	targetTurnSpeed *= Mathf.Pow(turnSpeedMultiplier,3);
	targetTurnSpeed *= deathInhibit;
	turnSpeed = Mathf.Lerp(turnSpeed, targetTurnSpeed, Time.deltaTime * 25.0);
	transform.rotation.eulerAngles.y += turnSpeed * Time.deltaTime;
}