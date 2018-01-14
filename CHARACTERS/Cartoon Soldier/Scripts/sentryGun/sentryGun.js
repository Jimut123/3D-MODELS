var targetRootName : String[];
var explosionPrefab : GameObject;
var blackSmokePrefab : GameObject;
private var rotatorAngleScan : float = 35;
private var rotatorAcceleration : float = 5.0;
private var firing : boolean = false;
private var bulletTraceGeneratorScript : bulletTraceGenerator;
private var muzzleFlashGeneratorScript : muzzleFlashGenerator;
private var spinningTurretScript : spinningTurret;
private var base : Transform;
private var rotator : Transform;
private var pitch : Transform;
private var barrel : Transform;
private var bulletTraceGenerator : Transform;
private var muzzleFlashGenerator : Transform;
private var laserSight : Transform;
private var laserSightScript : laserSight;
private var exploded : boolean = false;;
//Ai
private var foundTarget : boolean;
private var lastTargetfoundTime : float;
private var targetBufferTime : float;
private var targetTransform : Transform;
private var sentryHealth : float;
private var healthScript : health;
var useLaserToFindTargets : boolean = true;
var targetMaxDeltaAngle : float = 30;
private var targets : GameObject[];
//Rotator.
private var rotatorSpeed : float;
private var rotatorMaxSpeed : float = 60.0;
private var rotatorAngleTarget : float;
private var rotatorDirection : float = 1;
private var rotatorChangeDirectionTime : float;
private var rotatorChangeDirectionDelay: float = 1.0;
//Pitch.
private var pitchAngle : float;
private var pitchVelocity : float;
private var pitchTarget : float;
private var deadPitchAngle : float = 30;

function Start(){
	base = transform.Find("sentryGunBase");
	rotator = base.Find("sentryGunRotator");
	pitch = rotator.Find("sentryGunPitch");
	barrel = pitch.Find("sentryGunBarrel");
	bulletTraceGenerator = barrel.Find("bulletTraceGenerator");
	muzzleFlashGenerator = barrel.Find("muzzleFlashGenerator");
	spinningTurretScript = barrel.GetComponent("spinningTurret");
	bulletTraceGeneratorScript = bulletTraceGenerator.GetComponent("bulletTraceGenerator");
	muzzleFlashGeneratorScript = muzzleFlashGenerator.GetComponent("muzzleFlashGenerator");
	laserSight = pitch.Find("laserSight");
	laserSightScript = laserSight.GetComponent("laserSight");
	targetBufferTime = 2.0;
	healthScript = GetComponent("health");
}

function Update (){
	var sentryHealth = healthScript.health;
	var	barrelSpeed : float = spinningTurretScript.speed;
	var maxBarrelSpeed : float  = spinningTurretScript.maxSpeed;
	if(barrelSpeed > maxBarrelSpeed * 0.8){
		bulletTraceGeneratorScript.on = firing;
		muzzleFlashGeneratorScript.on = firing;
	}
	else{
		bulletTraceGeneratorScript.on = false;
		muzzleFlashGeneratorScript.on = false;	
	}
	spinningTurretScript.on = firing;
	if(bulletTraceGeneratorScript.on){
		rigidbody.AddForceAtPosition(bulletTraceGenerator.up* Time.deltaTime * Random.value * 1900, bulletTraceGenerator.position) ;
	}
	if(sentryHealth <= 0 && exploded == false){//Explosion.
		exploded = true;
		Instantiate(explosionPrefab,pitch.position,pitch.rotation);
		rigidbody.AddForce(Vector3.up*400.0);
		var newBlackSmoke : GameObject = Instantiate(blackSmokePrefab,pitch.position,pitch.rotation);
		newBlackSmoke.transform.parent = transform;
	}
	if(barrel.position.y < transform.position.y + 0.2 || sentryHealth == 0){
		collider.enabled = false;
		base.collider.enabled = true;
		base.collider.isTrigger = false;
		rotator.collider.enabled = true;
		rotator.collider.isTrigger = false;
		pitch.collider.enabled = true;
		pitch.collider.isTrigger = false;
		barrel.collider.enabled = true;
		barrel.collider.isTrigger = false;
		firing = false; //Deactivate if laying on the ground.
		laserSightScript.on = false;
		rotatorSpeed = Mathf.Lerp(rotatorSpeed,0, Time.deltaTime * rotatorAcceleration);
	}
	else{
		sentryAI();
	}
	rotator.localRotation.eulerAngles.z += rotatorSpeed * Time.deltaTime;
	//Pitch Angle.
	if(sentryHealth > 0){ //Alive.
		pitchAngle = 4.0;
	}
	else{
		pitchTarget = deadPitchAngle; //Dead.
		if(pitchAngle > pitchTarget + 1){
			pitchVelocity -= 3.0 * Time.deltaTime;
		}
		if(pitchAngle < pitchTarget -1){
			pitchVelocity += 3.0 * Time.deltaTime;
		}
		pitchVelocity = Mathf.Lerp(pitchVelocity,0,Time.deltaTime*5.0);
		pitchAngle += pitchVelocity;
	}
	if(pitchAngle > deadPitchAngle){
		pitchVelocity *= -1;
	}
	pitch.localRotation.eulerAngles.x = pitchAngle;
}

function sentryAI(){
	//Check for targets.
	var hit : RaycastHit;
	if (useLaserToFindTargets){ //This checks for targets using raycast (the laser).
		if (Physics.Raycast(bulletTraceGenerator.position, bulletTraceGenerator.forward, hit)){
			var isTarget : boolean = false;
			for (var i = 0; i < targetRootName.Length; i++){
				if (hit.transform.root.name == targetRootName[i]){
					isTarget = true; //Check if what's ahead correspond to the target list.
				}
			}
			if(isTarget){
				foundTarget = true; //If what's ahead is a target.
				lastTargetfoundTime = Time.time;
				if(targetTransform == null){
					targetTransform = hit.transform; //This is the target.
				}
			}
		}
	}
	else{ //This checks for targets using a deltaAngle (Makes the turrent start shooting sooner).
		targets = GetTargets();
		for (var n = 0; n < targets.Length; n++){
			var deltaAngle : float;
			deltaAngle = Vector3.Angle(targets[n].transform.position - transform.position, -rotator.up);
			Debug.DrawRay(transform.position, -rotator.up * 10.0);
			if(deltaAngle < targetMaxDeltaAngle){
				foundTarget = true;
				lastTargetfoundTime = Time.time;
				targetTransform = targets[n].transform;
			}
		}
	}
	//If target has been destroyed.
	if(targetTransform == null){
		foundTarget = false;
		firing = false;
	}
	//Target.
	if(foundTarget){
		firing = true;
		var targetPositionNoHeight : Vector3 = targetTransform.position;
		targetPositionNoHeight.y = rotator.position.y;
		var targetDirection = targetPositionNoHeight - rotator.position;
		var angleToTarget : float = Vector3.Angle(targetDirection, -rotator.up);
		var targetSide : float = rotator.InverseTransformPoint(targetPositionNoHeight).x;
		if(targetSide > 0){
			rotatorSpeed = Mathf.Lerp(rotatorSpeed,rotatorMaxSpeed, Time.deltaTime * rotatorAcceleration);
		}
		else{
			rotatorSpeed = Mathf.Lerp(rotatorSpeed,-rotatorMaxSpeed, Time.deltaTime * rotatorAcceleration);
		}
	}
	//No target.
	if(Time.time > lastTargetfoundTime + targetBufferTime){
		foundTarget = false;
		targetTransform = null;
		firing = false;
		var getRotatorAngle : float = rotator.localRotation.eulerAngles.z;
		if (getRotatorAngle > 180){
			getRotatorAngle -= 360;
		}
		if(rotatorDirection == 0){ //Choose new direction.
			rotatorChangeDirectionTime = Time.time + rotatorChangeDirectionDelay;
			if (getRotatorAngle > 0){
				rotatorDirection = -1;
			}
			else{
				rotatorDirection = 1;
			}
		}
		if(Time.time < rotatorChangeDirectionTime){
			rotatorSpeed = Mathf.Lerp(rotatorSpeed,0, Time.deltaTime * rotatorAcceleration);//Hold still.
		}
		if (rotatorDirection > 0 && Time.time > rotatorChangeDirectionTime){//Scan right.
			if(getRotatorAngle > rotatorAngleScan * 0.95){
				rotatorDirection = 0;
			}
			rotatorSpeed = Mathf.Lerp(rotatorSpeed,rotatorMaxSpeed, Time.deltaTime * rotatorAcceleration);
		}
		if(rotatorDirection < 0 && Time.time > rotatorChangeDirectionTime){//Scan left.
			if(getRotatorAngle < -rotatorAngleScan * 0.95){
				rotatorDirection = 0;
			}
			rotatorSpeed = Mathf.Lerp(rotatorSpeed,-rotatorMaxSpeed, Time.deltaTime * rotatorAcceleration);			
		}
	}
	else{
		rotatorSpeed = Mathf.Lerp(rotatorSpeed,0, Time.deltaTime * rotatorAcceleration);
	}	
}

function GetTargets() : GameObject[]{
	var returnList = new GameObject[targetRootName.Length];
	for (var i = 0; i < targetRootName.Length; i++){
		returnList[i] = GameObject.Find(targetRootName[i]);
	}
	return returnList;
}