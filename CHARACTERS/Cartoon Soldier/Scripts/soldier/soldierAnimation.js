//Curves.
var idleBlendCurve : AnimationCurve;
var walkBlendCurve : AnimationCurve;
var runBlendCurve : AnimationCurve;
var sprintBlendCurve : AnimationCurve;
var strafeBlendCurve : AnimationCurve;
var turnBlendCurve : AnimationCurve;
var animationSpeedCurve : AnimationCurve;
var turnAnimationSpeedCurve : AnimationCurve;
var fallingBlendCurve : AnimationCurve;
var landingDurationCurve : AnimationCurve;
var hitBlendCurve : AnimationCurve;
var tiltMultiplier : float = 1.0;

//Animation blend values.
var idleBlend : float;
var walkBlend : float;
var runBlend : float;
var sprintBlend : float;
var strafeBlend : float;
var turnBlend : float;
var animationSpeed : float;
var turnAnimationSpeed : float;
var fallingBlend : float;
var landingDuration : float;
var landingInhibit : float;
var landingBlend : float;
var crouchIdleBlend : float;
var crouchRunBlend : float;
var crouchSprintBlend : float;
var crouchStrafeBlend : float;
var crouchTurnBlend : float;
var hitBlend : float;
var dieBlend : float;
//---
private var soldierRotation : Quaternion;
private var verticalSpeed : float;
private var lastPosition : Vector3;
private var lastYRotation : float;
private var tilt : float;
private var backward : boolean; //Switch when strafing backwards.
private var backwardBuffer : float = 0.5; //So it doesn switches too fast.
private var lastLandingTime : float; //Last time soldier landed after a fall.
private var isFalling : boolean;
private var startedFallingTime : float;
private var isGrounded : boolean;
private var hitStartTime : float; //Time in which hit animation should start playing.
private var getHitDirection : Vector3;
//External scripts.
private var crouchControllerScript : crouchController;
private var weaponControllerScript : weaponController;
private var healthScript : health;
//
function Start(){
	soldierRotation = Quaternion.identity;
	globalCrouchBlend = 0.0;
	globalCrouchBlendTarget = 0.0;
	globalCrouchBlendVelocity = 0.0;
	crouchControllerScript = transform.root.GetComponent(crouchController);
	weaponControllerScript = transform.root.GetComponent(weaponController);
	healthScript = transform.root.GetComponent(health);
}

function LateUpdate(){
	//Gather external script info.
	var firing : boolean = false; //Firing.
	if (weaponControllerScript != null){
		 firing = weaponControllerScript.isFiring();
	}
	var crouchInhibit : float = 1.0;//Crouch.
	var standInhibit : float = 0.0;
	var crouchSpeedMultiplier : float = 1.0;
	if(crouchControllerScript != null){
		crouchInhibit = 1 - crouchControllerScript.globalCrouchBlend;
		standInhibit = (1 -crouchInhibit);
		crouchSpeedMultiplier = crouchControllerScript.crouchSpeedMultiplier;
	}
	var lastHitTime : float;
	var hitDirection : Vector3;
	var health : float;
	var deathTime : float;
	if (healthScript != null){
		lastHitTime = healthScript.GetLastHitTime();
		hitDirection = healthScript.GetHitDirection();
		health = healthScript.health;
		deathTime = healthScript.GetDeathTime();
	}
	//Velocity calculation.
	var velocity : Vector3 = (transform.position - lastPosition) / Time.deltaTime; //Units per second.
	var previousVerticalSpeed : float = verticalSpeed;
	verticalSpeed = (transform.position.y - lastPosition.y) / Time.deltaTime;
	var overallSpeed : float = (transform.position - lastPosition).magnitude / Time.deltaTime;
	lastPosition = transform.position;
	var forwardSpeed : float = transform.InverseTransformDirection(velocity).z;
	var strafeSpeed : float = transform.InverseTransformDirection(velocity).x;
	var turnSpeed : float = Mathf.DeltaAngle(lastYRotation, transform.rotation.eulerAngles.y);
	lastYRotation = transform.rotation.eulerAngles.y;
	//Is grounded.
	var rayHeight : float = 0.3;
	var rayOrigin : Vector3 = transform.position + Vector3.up * rayHeight;
	var groundRay : Ray = new Ray(rayOrigin, Vector3.down);
	var rayDistance : float = rayHeight * 2.0;
	var groundHit : RaycastHit;
	if (Physics.Raycast(groundRay, groundHit, rayDistance)){
		isGrounded = true;
	}
	else{
		isGrounded = false;
	}
	//Animation blending.
	minimumFallSpeed  = -0.5; //Should be called maximum.
	if (!isFalling && verticalSpeed < minimumFallSpeed && !isGrounded){ //Start falling time.
		isFalling = true;
		startedFallingTime = Time.time;
	}
	var totalFallDuration : float = 0.0;
	if(isFalling && verticalSpeed > minimumFallSpeed){ //Land time.
		isFalling = false;
		lastLandingTime = Time.time;
		totalFallDuration = (lastLandingTime - startedFallingTime);
		landingDuration = landingDurationCurve.Evaluate(totalFallDuration);
	}
	var fallDuration : float;
	if (Time.time > startedFallingTime && isFalling){//Current fall duration.
		fallDuration = Time.time - startedFallingTime;
	}
	else{
		fallDuration = 0.0;
	}
	//Animation blending values.
	var hitInhibit : float = 1 - hitBlend;//Make other animations inhibit when getting hit.
	var dieInhibit : float = 1 - dieBlend;//Don't play animations if dying.
	var blendSpeed : float = 0.2;
	fallingBlend = fallingBlendCurve.Evaluate(fallDuration); //Falling blend.
	fallingBlend *= dieInhibit;
	animation.Blend("soldierFalling",fallingBlend,blendSpeed);
	var fallingInhibit : float = Mathf.Pow(Mathf.Abs(1 - fallingBlend),2.0);//Make other animations inhibit when falling.
	if(Time.time < lastLandingTime + landingDuration){ //Landing blend.
		var timeSinceLanding : float =  Time.time - lastLandingTime;
		var landingProgress : float = timeSinceLanding / landingDuration; //From 0 to 1.
		landingProgress = Mathf.Pow(landingProgress, 0.6);
		landingBlend = 1 - landingProgress;
		var landingAnimationStartTime : float = Mathf.Clamp01(1 - landingDuration);
		animation["soldierLanding"].time = Mathf.Lerp(landingAnimationStartTime, 1.0 ,landingProgress);
		animation.Blend("soldierLanding",landingBlend,0.05);
		landingInhibit = Mathf.Pow(1 - landingBlend,2.0);
	}
	else{
		landingBlend = 0.0;
		landingDuration = 0.0;
		landingAnimationStartTime = 0.0;
		landingInhibit = 1.0;
	}
	var idleBlend = idleBlendCurve.Evaluate(Mathf.Abs(forwardSpeed) + Mathf.Abs(strafeSpeed)); //Idle blend.
	idleBlend -= Mathf.Abs(turnSpeed) * .8;
	idleBlend *= fallingInhibit;
	idleBlend *= landingInhibit;
	idleBlend *= crouchInhibit;
	idleBlend *= hitInhibit;
	idleBlend *= dieInhibit;
	//idleBlend = Mathf.Clamp01(idleBlend);
	animation.Blend("soldierIdle",idleBlend,blendSpeed);
	walkBlend = walkBlendCurve.Evaluate(Mathf.Abs(forwardSpeed)); //Walk blend.
	walkBlend *= fallingInhibit;
	walkBlend *= landingInhibit;
	walkBlend *= crouchInhibit;
	walkBlend *= dieInhibit;
	walkBlend = Mathf.Clamp01(walkBlend);
	animation.Blend("soldierWalk",walkBlend,blendSpeed);
	runBlend = runBlendCurve.Evaluate(Mathf.Abs(forwardSpeed)); //Run blend.
	runBlend *= fallingInhibit;
	runBlend *= landingInhibit;
	runBlend  *= crouchInhibit;
	runBlend *= dieInhibit;
	//runBlend = Mathf.Clamp01(runBlend);
	animation.Blend("soldierRun",runBlend,blendSpeed);
	sprintBlend = sprintBlendCurve.Evaluate(forwardSpeed);//Sprint blend.
	sprintBlend *= fallingInhibit;
	sprintBlend *= landingInhibit;
	sprintBlend *= crouchInhibit;
	sprintBlend *= dieInhibit;
	//sprintBlend = Mathf.Clamp01(sprintBlend);
	animation.Blend("soldierSprint",sprintBlend,blendSpeed);
	strafeBlend = strafeBlendCurve.Evaluate(Mathf.Abs(strafeSpeed)); //Strafing blend.
	strafeBlend *= fallingInhibit;
	strafeBlend *= landingInhibit;
	strafeBlend *= crouchInhibit;
	strafeBlend *= dieInhibit;
	//strafeBlend = Mathf.Clamp01(strafeBlend);
	if (forwardSpeed > backwardBuffer){
		backward = false;
	}
	if(forwardSpeed < -backwardBuffer){
		backward = true;
	}
	if(!backward){
		if(strafeSpeed > 0){
			animation.Blend("soldierStrafeRight",strafeBlend,blendSpeed);
			animation.Blend("soldierStrafeLeft",0,blendSpeed);
		}
		else{
			animation.Blend("soldierStrafeLeft",strafeBlend,blendSpeed);
			animation.Blend("soldierStrafeRight",0,blendSpeed);
		}
	}
	else{
		if(strafeSpeed > 0){
			animation.Blend("soldierStrafeLeft",strafeBlend,blendSpeed);
			animation.Blend("soldierStrafeRight",0,blendSpeed);
		}
		else{
			animation.Blend("soldierStrafeRight",strafeBlend,blendSpeed);
			animation.Blend("soldierStrafeLeft",0,blendSpeed);
		}	
	}
	turnBlend = turnBlendCurve.Evaluate(Mathf.Abs(turnSpeed)); //Turn blend.
	turnBlend -= overallSpeed;
	turnBlend = Mathf.Clamp01(turnBlend);
	turnBlend *= crouchInhibit;
	turnBlend *= dieInhibit;
	if(turnSpeed > 0){
		animation.Blend("soldierSpinRight",turnBlend,blendSpeed);
		animation.Blend("soldierSpinLeft",0,blendSpeed);
	}
	else{
		animation.Blend("soldierSpinLeft",turnBlend,blendSpeed);
		animation.Blend("soldierSpinRight",0,blendSpeed);	
	}
	//Crouch Idle animation blending. Blend values are calculated above for convenince.
	if (crouchControllerScript != null){ //Works with a global crouch value that's handled in the crouch controller script.	
		var inverseCrouchSpeedMultiplier : float = (1/crouchSpeedMultiplier);
		crouchIdleBlend = idleBlendCurve.Evaluate((Mathf.Abs(forwardSpeed) + Mathf.Abs(strafeSpeed))* inverseCrouchSpeedMultiplier); //Crouch idle blend.
		crouchIdleBlend -= Mathf.Abs(turnSpeed) * .8;
		crouchIdleBlend *= fallingInhibit;
		crouchIdleBlend *= landingInhibit;
		crouchIdleBlend *= standInhibit;
		crouchIdleBlend *= dieInhibit;
		animation.Blend("soldierCrouch",crouchIdleBlend,0.05);
		crouchRunBlend = runBlendCurve.Evaluate(Mathf.Abs(forwardSpeed) * inverseCrouchSpeedMultiplier);//Crouch run blend.
		crouchRunBlend *= fallingInhibit;
		crouchRunBlend *= landingInhibit;
		crouchRunBlend *= standInhibit;
		crouchRunBlend *= dieInhibit;
		animation.Blend("soldierCrouchRun",crouchRunBlend,0.05);
		crouchSprintBlend = sprintBlendCurve.Evaluate(forwardSpeed * inverseCrouchSpeedMultiplier);//Crouch sprint blend.
		crouchSprintBlend *= fallingInhibit;
		crouchSprintBlend *= landingInhibit;
		crouchSprintBlend *= standInhibit;
		crouchSprintBlend *= dieInhibit;
		animation.Blend("soldierCrouchSprint",crouchSprintBlend,0.05);
		crouchStrafeBlend = strafeBlendCurve.Evaluate(Mathf.Abs(strafeSpeed) * inverseCrouchSpeedMultiplier); //Crouch strafe blend.
		crouchStrafeBlend *= fallingInhibit;
		crouchStrafeBlend *= landingInhibit; 
		crouchStrafeBlend *= standInhibit;
		crouchStrafeBlend *= dieInhibit;
		if(!backward){
			if(strafeSpeed > 0){
				animation.Blend("soldierCrouchStrafeRight",crouchStrafeBlend,blendSpeed*2);
				animation.Blend("soldierCrouchStrafeLeft",0,blendSpeed*2);
			}
			else{
				animation.Blend("soldierCrouchStrafeLeft",crouchStrafeBlend,blendSpeed*2);
				animation.Blend("soldierCrouchStrafeRight",0,blendSpeed*2);
			}
		}
		else{
			if(strafeSpeed > 0){
				animation.Blend("soldierCrouchStrafeLeft",crouchStrafeBlend,blendSpeed*2);
				animation.Blend("soldierCrouchStrafeRight",0,blendSpeed*2);			
			}
			else{
				animation.Blend("soldierCrouchStrafeRight",crouchStrafeBlend,blendSpeed*2);
				animation.Blend("soldierCrouchStrafeLeft",0,blendSpeed*2);			
			}
		}
		crouchTurnBlend = turnBlendCurve.Evaluate(Mathf.Abs(turnSpeed)); //Crouch turn blend.
		crouchTurnBlend -= overallSpeed;
		crouchTurnBlend = Mathf.Clamp01(crouchTurnBlend);
		crouchTurnBlend *= standInhibit;
		crouchTurnBlend *= dieInhibit;
		if(turnSpeed > 0){
			animation.Blend("soldierCrouchSpinRight", crouchTurnBlend, blendSpeed);
			animation.Blend("soldierCrouchSpinLeft",0, blendSpeed);
		}
		else{
			animation.Blend("soldierCrouchSpinLeft", crouchTurnBlend, blendSpeed);
			animation.Blend("soldierCrouchSpinRight",0, blendSpeed);			
		}		
	}
	var timeAfterHit : float = Time.time - lastHitTime; //Hit blend.
	getHitBlend = hitBlendCurve.Evaluate(timeAfterHit);
	hitBlend = getHitBlend;
	hitBlend *= dieInhibit;
	var frontHitBlend : float = hitBlend * Mathf.Max(hitDirection.z,0);
	animation.Blend("soldierHitFront",frontHitBlend,blendSpeed);
	var backHitBlend : float = hitBlend * -Mathf.Min(hitDirection.z,0);
	animation.Blend("soldierHitBack",backHitBlend,blendSpeed);
	var rightHitBlend : float = hitBlend * Mathf.Max(hitDirection.x,0);
	animation.Blend("soldierHitRight",rightHitBlend,blendSpeed);
	var leftHitBlend : float = hitBlend * -Mathf.Min(hitDirection.x,0);
	animation.Blend("soldierHitLeft",leftHitBlend,blendSpeed);
	var timeSinceDeath : float = Time.time - deathTime;
	var dying : boolean = false;
	if(timeSinceDeath > 0.1){
		dying = true;
	}
	if(!dying){
		getHitDirection = hitDirection;
	}
	if (health <= 0){  //Die blend.
		dieBlend = 1.0;
		if (getHitDirection.z > 0){
			animation["soldierDieFront"].time = timeSinceDeath;
			if(animation["soldierDieFront"].time > animation["soldierDieFront"].length){
				animation["soldierDieFront"].time = animation["soldierDieFront"].length;
			}
			animation.Blend("soldierDieFront",dieBlend,blendSpeed);
		}
		else{
			animation["soldierDieBack"].time = timeSinceDeath;
			if(animation["soldierDieBack"].time > animation["soldierDieBack"].length){
				animation["soldierDieBack"].time = animation["soldierDieBack"].length;
			}
			animation.Blend("soldierDieBack",dieBlend,blendSpeed);
		}
	}
	else{
		dieBlend = 0.0;
	}
	//Animation speed.
	var animationSpeed : float;
	var strafeSpeedMultiplier : float = 1.4; //Speed up strafe animations.
	
	if(!backward){
		animationSpeed = animationSpeedCurve.Evaluate(overallSpeed);
	}
	else{
		animationSpeed = -animationSpeedCurve.Evaluate(overallSpeed);
	}
	animation["soldierWalk"].speed = animationSpeed;
	animation["soldierRun"].speed = animationSpeed;
	animation["soldierSprint"].speed = animationSpeed;
	animation["soldierStrafeRight"].speed = animationSpeed;
	animation["soldierStrafeLeft"].speed = animationSpeed;
	animation["soldierCrouchRun"].speed = animationSpeed;
	animation["soldierCrouchSprint"].speed = animationSpeed;
	animation["soldierCrouchStrafeRight"].speed = animationSpeed;
	animation["soldierCrouchStrafeLeft"].speed = animationSpeed;
	var turnAnimationSpeed : float = turnAnimationSpeedCurve.Evaluate(Mathf.Abs(turnSpeed));
	animation["soldierSpinRight"].speed = turnAnimationSpeed;
	animation["soldierSpinLeft"].speed = turnAnimationSpeed;
	animation["soldierCrouchSpinRight"].speed = turnAnimationSpeed;
	animation["soldierCrouchSpinLeft"].speed = turnAnimationSpeed;
	//Torso recoil when firing.
	if (firing){
		var spine1 = transform.Find("Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1");
		var spine2 = spine1.Find("Bip01 Spine2");
		spine1.localRotation.eulerAngles.z += Mathf.Sin(Time.time * 50) * 0.5;
		spine2.localRotation.eulerAngles.z += Mathf.Sin(Time.time * 50 - 1.0) * 0.5;
	}
	//Rotation.
	var deltaAngle : float = Mathf.DeltaAngle(transform.rotation.eulerAngles.y, transform.root.rotation.eulerAngles.y);
	var turnAngle : float = Mathf.Pow(Mathf.Abs(deltaAngle), 2.5) * Mathf.Sign(deltaAngle) / 80;
	turnAngle *= dieInhibit;
	soldierRotation.eulerAngles.y += turnAngle * Time.deltaTime;
	transform.rotation = soldierRotation;
	//Tilt
	var tiltTarget = -turnAngle * 0.01 * forwardSpeed * tiltMultiplier;
	Mathf.Clamp(tiltTarget,-30,30);
	tilt = Mathf.Lerp(tilt, tiltTarget, Time.deltaTime * 7.0);
	if (Mathf.Abs(verticalSpeed) > 1){
		tilt /= Mathf.Abs(verticalSpeed);
	}
	transform.localRotation.eulerAngles.z = tilt;
}