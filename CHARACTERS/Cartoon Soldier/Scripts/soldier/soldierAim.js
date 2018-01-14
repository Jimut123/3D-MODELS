var soldierCamera : Transform;
var headRotationFix : Vector3 = Vector3(180,90,90);
var crosshair : Transform;

private var target : Vector3;
private var targetTarget : Vector3; //The target for Mathf.Lerp to the target.
private var rightUpperArm : Transform;
private var rightClavicle : Transform;
private var leftUpperArm : Transform;
private var leftClavicle : Transform;
private var leftForearm : Transform;
private var leftFinger : Transform;
private var spine1 : Transform;
private var spine2 : Transform;
private var head : Transform;
private var neck : Transform;
private var cameraYRotation : float;
private var cameraPitch : float;
private var torsoOffsetAngle : float;
private var torsoOffsetPitch : float;
private var leanHead : float = 0.0;
private var soldierAnimationScript : soldierAnimation;
private var leftArmIkScript : MonoBehaviour;
private var ikArm : Transform;
private	var ikUpperArm : Transform;
private	var ikForearm : Transform;
private var transition : float;
private var transitionTarget : float; // 0 means normal animation, 1 means complete aim.
private var transition2 : float;
private var transition2Target : float; // 0 means normal animation, 1 means complete aim. For head and torso.

function Start(){
	spine1 =  transform.Find("Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1");
	spine2 =  spine1.Find("Bip01 Spine2");
	neck = spine2.Find("Bip01 Neck");
	rightClavicle = neck.Find("Bip01 R Clavicle");
	rightUpperArm = rightClavicle.Find("Bip01 R UpperArm");
	leftClavicle = neck.Find("Bip01 L Clavicle");
	leftUpperArm = leftClavicle.Find("Bip01 L UpperArm");
	leftForearm = leftUpperArm.Find("Bip01 L Forearm");
	leftFinger = leftForearm.Find("Bip01 L Hand/Bip01 L Finger2/Bip01 L Finger21");
	head = neck.Find("Bip01 Head");
	soldierAnimationScript = GetComponent("soldierAnimation");
	ikArm = leftUpperArm.Find("ikArm");
	ikArm.parent = transform.root;
	ikArm.position = leftUpperArm.position;
	ikUpperArm = ikArm.Find("upperArm");
	ikForearm = ikUpperArm.Find("elbow");
	leftArmIkScript = ikArm.GetComponent("inverseKinematics");
	var upperArmLength : float = Vector3.Distance(leftUpperArm.position, leftForearm.position);
	var forearmLength : float = Vector3.Distance(leftForearm.position, leftFinger.position);	
	ikForearm.parent = null;
	ikUpperArm.localScale = Vector3(upperArmLength, upperArmLength, upperArmLength);
	ikForearm.localScale = Vector3(forearmLength, forearmLength, forearmLength);
	ikForearm.parent = ikUpperArm;
	ikForearm.localPosition = Vector3.zero;
	ikForearm.position += ikUpperArm.forward * upperArmLength;
}

function LateUpdate(){
	//Target.
	var targetRay : Ray = soldierCamera.camera.ViewportPointToRay(crosshair.position);
	var targetRayDistance : float = 300.0;
	var targetHit : RaycastHit;
	targetTarget = targetRay.origin + targetRay.direction * targetRayDistance;
	if(Physics.Raycast(targetRay, targetHit, targetRayDistance)){
		var targetHitDistance : float = Vector3.Distance(targetHit.point, soldierCamera.position);
		var soldierDistance : float = Vector3.Distance(transform.position, soldierCamera.position);
		if (targetHitDistance > soldierDistance * 1.0){
			var targetRayUpperArm : Ray;
			targetRayUpperArm.origin = rightUpperArm.position;
			targetRayUpperArm.direction = targetHit.point - rightUpperArm.position; 
			targetTarget = rightUpperArm.position + (targetHit.point - rightUpperArm.position).normalized * targetRayDistance;
		}
	}
	target = Vector3.Lerp(target,targetTarget,Time.deltaTime * 10.0);
	var aimAid : Transform = new GameObject("aidAim").transform; //This will be used to aid the body parts aim in the rigth direction.
	//Transition 1(arms).
	transitionTarget = 1.0;
	transitionTarget *= 1 - soldierAnimationScript.landingBlend; //Landing.
	transitionTarget *= 1 - soldierAnimationScript.fallingBlend;//Falling.
	transitionTarget *= 1 - soldierAnimationScript.sprintBlend;// Sprinting.
	transitionTarget *= 1 - soldierAnimationScript.crouchSprintBlend; //Crouch sprinting.
	transitionTarget *= 1 - soldierAnimationScript.hitBlend; //Getting hit.
	transitionTarget *= 1 - soldierAnimationScript.dieBlend; //Dying.
	//Transition 2(spine and head)
	transition2Target = 1.0;
	transition2Target *= 1 - soldierAnimationScript.hitBlend; //Getting hit.
	transition2Target *= 1 - soldierAnimationScript.dieBlend; //Dying.	
	//Store pre-rotations.
	var rightUpperArmLocalRotation : Quaternion = rightUpperArm.localRotation;
	var leftUpperArmLocalRotation : Quaternion = leftUpperArm.localRotation;
	var leftForearmLocalRotation : Quaternion = leftForearm.localRotation;
	var headLocalRotation : Quaternion = head.localRotation;
	var spine1LocalRotation : Quaternion = spine1.localRotation;
	var spine2LocalRotation : Quaternion = spine2.localRotation;
	//Aiming.
	var characterYRotation : float = transform.rotation.eulerAngles.y;
	var spineYRotation : float = spine1.rotation.eulerAngles.y + 60;
	if (soldierCamera != null){
		cameraYRotation = soldierCamera.rotation.eulerAngles.y;
		cameraPitch = soldierCamera.localRotation.eulerAngles.x;
	}
	var deltaTorsoAngle : float = Mathf.DeltaAngle(spineYRotation, cameraYRotation);
	torsoOffsetAngle = Mathf.Lerp(torsoOffsetAngle, deltaTorsoAngle, Time.deltaTime * 15.0);
	var deltaTorsoPitch : float = Mathf.DeltaAngle(0, cameraPitch);
	torsoOffsetPitch = Mathf.Lerp(torsoOffsetPitch, deltaTorsoPitch, Time.deltaTime * 15.0);
	spine1.localRotation.eulerAngles.x -= torsoOffsetAngle * .5;
	spine2.localRotation.eulerAngles.x -= torsoOffsetAngle * .5;
	spine1.localRotation.eulerAngles.z -= torsoOffsetPitch * .5;
	spine2.localRotation.eulerAngles.z -= torsoOffsetPitch * .5;
	aimAid.position = rightUpperArm.position;//Right arm.
	var gunAim : Transform = rightUpperArm.Find("Bip01 R Forearm/Bip01 R Hand/gun/gunAim");
	aimAid.LookAt(gunAim);
	rightUpperArm.parent = aimAid;
	aimAid.LookAt(target);
	rightUpperArm.parent = rightClavicle;
	aimAid.position = leftUpperArm.position;//Upper arm.
	aimAid.LookAt(leftForearm);
	leftUpperArm.parent = aimAid;
	var gunGrab : Transform = rightUpperArm.Find("Bip01 R Forearm/Bip01 R Hand/gun/gunGrab");
	aimAid.LookAt(gunGrab);
	leftUpperArm.parent = leftClavicle;
	//IK. (Left arm).
	ikArm.position = leftUpperArm.position;
	var leftElbowTarget : Transform = spine2.Find("leftElbowTarget");
	leftArmIkScript.elbowTarget = leftElbowTarget.position;
	leftArmIkScript.target = gunGrab.position;
	leftArmIkScript.CalculateIK();
	var upperArmRotation : Quaternion = ikUpperArm.Find("upperArmRotation").rotation;
	var forearmRotation : Quaternion = ikForearm.Find("forearmRotation").rotation;
	leftUpperArm.rotation = upperArmRotation;
	leftForearm.rotation = forearmRotation;
	Destroy(aimAid.gameObject);
	if (soldierCamera != null){ //Head.
		head.LookAt(target);
		head.Rotate(headRotationFix);
		//Lean head  so it doesn't intersects with the gun.
		var minHeadLeanAngle : float = 0.0;
		var maxHeadLeanAngle : float = 120.0;
		var fullLeanAngle : float = 20;
		var leanHeadTarget : float =  0.0;
		if (head.localRotation.eulerAngles.x > minHeadLeanAngle && head.localRotation.eulerAngles.x < maxHeadLeanAngle){
			leanHeadTarget = head.localRotation.eulerAngles.x - minHeadLeanAngle; //Angle for leaning the head.
			leanHeadTarget /= maxHeadLeanAngle;
			leanHeadTarget *= fullLeanAngle;
		}
		leanHead = Mathf.Lerp(leanHead, leanHeadTarget, Time.deltaTime * 5.0);
		head.Rotate(0,leanHead,0);
	}
	//Transition 1.
	transition = Mathf.Lerp(transition, transitionTarget, Time.deltaTime * 5.0);
	if(transition < 1.0){ //Only Lerp if transitionTarget is between 0 and 1.
		rightUpperArm.localRotation = Quaternion.Lerp(rightUpperArmLocalRotation, rightUpperArm.localRotation, transition);
		leftUpperArm.localRotation = Quaternion.Lerp(leftUpperArmLocalRotation, leftUpperArm.localRotation, transition);
		leftForearm.localRotation = Quaternion.Lerp(leftForearmLocalRotation, leftForearm.localRotation, transition);
		
	}
	//Transition 2.
	transition2 = Mathf.Lerp(transition2, transition2Target, Time.deltaTime * 5.0);
	if(transition2 < 1.0){ //Only Lerp if transitionTarget is between 0 and 1.
		head.localRotation = Quaternion.Lerp(headLocalRotation, head.localRotation, transition2);
		spine1.localRotation = Quaternion.Lerp(spine1LocalRotation, spine1.localRotation, transition2);
		spine2.localRotation = Quaternion.Lerp(spine2LocalRotation, spine2.localRotation, transition2);
	}
}