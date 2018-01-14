@script RequireComponent(soldierMovement);
@script RequireComponent(crouchController);

var aimSpeed : float = 5.0;
var accuracyLossMultiplier : float = 0.5;

private var firing : boolean = false;
var gunSelectorScript : gunSelector;
private var crosshairTransform : Transform;
private var accuracyLoss : float;
private var accuracyLossTarget : float;
private var shootingAimLoss : float;
private var vibratingAimLoss : float; //shootingAimLoss with firing vibration.
private var isSprinting : boolean;
//External scripts.
private var crosshairScript : crosshair;
private var soldierMovementScript : soldierMovement;
private var crouchControllerScript : crouchController;
private var healthScript : health;

function Start(){
	crosshairTransform = transform.Find("crosshair");
	//External scripts.
	crosshairScript = crosshairTransform.GetComponent(crosshair);
	soldierMovementScript = GetComponent(soldierMovement);
	crouchControllerScript = GetComponent(crouchController);
	healthScript = GetComponent(health);
}

function Update () {
	var health : float = 100;
	if(healthScript != null){
		health = healthScript.GetHealth();
	}
	//Input.
	var isGrounded : boolean = soldierMovementScript.isGrounded;
	if (Input.GetMouseButton(0) && !isSprinting && isGrounded && health > 0){
		firing  = true;
		gunSelectorScript.BroadcastMessage("Fire",SendMessageOptions.DontRequireReceiver);
	}
	else{
		firing = false;
	}
	//Accuracy.
	var aimCrouchMultiplier : float	= 1 + crouchControllerScript.globalCrouchBlend *10;
	var turnSpeed : float = soldierMovementScript.turnSpeed;
	var forwardSpeed : float = soldierMovementScript.forwardSpeed;
	var strafeSpeed : float = soldierMovementScript.strafeSpeed;
	accuracyLossTarget = 1.0;
	if (forwardSpeed > soldierMovementScript.forwardSpeedMultiplier*1.2){
		isSprinting = true;
		accuracyLossTarget += 1.0;
	}
	else{
		isSprinting = false;
	}
	
	if(firing){
		shootingAimLoss = Mathf.Lerp(shootingAimLoss, 2.0, Time.deltaTime* 2.0);
		crosshairScript.yOffset += Random.Range(0,0.5)*Time.deltaTime;
		crosshairScript.xOffset += Random.Range(-0.05,shootingAimLoss*0.1)*Time.deltaTime;
	}	
	else{
		shootingAimLoss = Mathf.Lerp(shootingAimLoss, 0, Time.deltaTime * 20.0);
	}
	vibratingAimLoss = shootingAimLoss + Mathf.Sin(Time.time*80)*shootingAimLoss*0.5;
	accuracyLossTarget += vibratingAimLoss;
	accuracyLossTarget += Mathf.Pow(Mathf.Abs(forwardSpeed * 2.0 + strafeSpeed * 2.0),0.1);
	accuracyLossTarget += Mathf.Pow(Mathf.Pow(Mathf.Abs(turnSpeed), 2.3) / Mathf.Pow(10,4), 0.35);
	accuracyLossTarget += (1- crouchControllerScript.globalCrouchBlend) * 0.5;
	accuracyLossTarget *= accuracyLossMultiplier;
	if(accuracyLoss > accuracyLossTarget){
		accuracyLoss = Mathf.Lerp(accuracyLoss, accuracyLossTarget, Time.deltaTime * aimSpeed * aimCrouchMultiplier * 0.5);//Gain aim.
	}
	else{
		accuracyLoss = Mathf.Lerp(accuracyLoss, accuracyLossTarget, Time.deltaTime * aimSpeed);//Lose aim.
	}
	crosshairScript.accuracyLoss = accuracyLoss;
	accuracyLoss = Mathf.Max(accuracyLoss, 1.0);
	var accuracy : float = 1 / accuracyLoss;
	gunSelectorScript.BroadcastMessage("SetAccuracy", accuracy, SendMessageOptions.DontRequireReceiver);
}

function isFiring() : boolean{
	return firing;
}