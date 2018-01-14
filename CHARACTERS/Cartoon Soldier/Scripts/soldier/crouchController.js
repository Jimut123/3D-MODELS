@script RequireComponent(CharacterController);

var crouchSpeedMultiplier : float = 0.5;
var crouchTogglingTime : float = 0.1;
var globalCrouchBlend : float; //0 is standing up, 1 is crouching.

private var globalCrouchBlendTarget : float;
private var globalCrouchBlendVelocity : float;
private var disable : boolean;

function Update () {
	//Crouching.
	if (Input.GetKeyDown(KeyCode.C)){
		if(!disable){
			if (globalCrouchBlend < 0.5){
				globalCrouchBlendTarget = 1.0;
			}
			else{
				globalCrouchBlendTarget = 0.0;
			}
		}
		disable = true;
	}
	else{
		disable = false;
	}
	globalCrouchBlend = Mathf.SmoothDamp(globalCrouchBlend, globalCrouchBlendTarget, globalCrouchBlendVelocity, crouchTogglingTime);
}