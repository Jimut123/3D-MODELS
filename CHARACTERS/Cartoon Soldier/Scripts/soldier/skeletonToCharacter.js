var	rootLocation : String = "soldierCharacter/Bip01";
var	pelvisLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis";
var	spineRootLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine"; 
var	stomachLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1";
var	torsoLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2";
var	neckLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck"; 
var	headLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 Head";
var	rightThighLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh";
var	rightCalfLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh/Bip01 R Calf";    
var	rightFootLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh/Bip01 R Calf/Bip01 R Foot";    
var	rightToeLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh/Bip01 R Calf/Bip01 R Foot/Bip01 R Toe0";     
var	leftThighLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh";     
var	leftCalfLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh/Bip01 L Calf";   
var	leftFootLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh/Bip01 L Calf/Bip01 L Foot";    
var	leftToeLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh/Bip01 L Calf/Bip01 L Foot/Bip01 L Toe0";    
var	rightClavicleLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle";   
var	rightUpperArmLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle/Bip01 R UpperArm";    
var	rightForearmLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle/Bip01 R UpperArm/Bip01 R Forearm";     
var	rightHandLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle/Bip01 R UpperArm/Bip01 R Forearm/Bip01 R Hand";    
var	leftClavicleLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle";   
var	leftUpperArmLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle/Bip01 L UpperArm";    
var	leftForearmLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle/Bip01 L UpperArm/Bip01 L Forearm";     
var	leftHandLocation : String = "soldierCharacter/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle/Bip01 L UpperArm/Bip01 L Forearm/Bip01 L Hand";  

private var root : Transform;
private var pelvis : Transform;
private var spineRoot: Transform;
private var stomach: Transform;
private var torso : Transform;
private var neck : Transform;
private var head : Transform;
private var  rightThigh : Transform;
private var  rightCalf : Transform;
private var  rightFoot : Transform;
private var  rightToe : Transform;
private var leftThigh : Transform;
private var leftCalf : Transform;
private var leftFoot : Transform;
private var leftToe : Transform;
private var rightClavicle : Transform;
private var rightUpperArm : Transform;
private var rightForearm : Transform;
private var rightHand : Transform;
private var leftClavicle : Transform;
private var leftUpperArm : Transform;
private var leftForearm : Transform;
private var leftHand : Transform;

private var rootSource : Transform;
private var pelvisSource : Transform;
private var spineRootSource : Transform;
private var stomachSource : Transform;
private var torsoSource  : Transform;
private var neckSource  : Transform;
private var headSource  : Transform;
private var  rightThighSource  : Transform;
private var  rightCalfSource  : Transform;
private var  rightFootSource  : Transform;
private var  rightToeSource  : Transform;
private var leftThighSource  : Transform;
private var leftCalfSource  : Transform;
private var leftFootSource  : Transform;
private var leftToeSource  : Transform;
private var rightClavicleSource  : Transform;
private var rightUpperArmSource  : Transform;
private var rightForearmSource  : Transform;
private var rightHandSource  : Transform;
private var leftClavicleSource  : Transform;
private var leftUpperArmSource  : Transform;
private var leftForearmSource  : Transform;
private var leftHandSource  : Transform;

function Start(){
	//Source.
	rootSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01");
	pelvisSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis");
	spineRootSource  = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine"); 
	stomachSource  = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1");
	torsoSource  = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2");
	neckSource  = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck"); 
	headSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 Head");
	rightThighSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh");
	rightCalfSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh/Bip01 R Calf");    
	rightFootSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh/Bip01 R Calf/Bip01 R Foot");    
	rightToeSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 R Thigh/Bip01 R Calf/Bip01 R Foot/Bip01 R Toe0");     
	leftThighSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh");     
	leftCalfSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh/Bip01 L Calf");   
	leftFootSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh/Bip01 L Calf/Bip01 L Foot");    
	leftToeSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 L Thigh/Bip01 L Calf/Bip01 L Foot/Bip01 L Toe0");    
	rightClavicleSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle");   
	rightUpperArmSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle/Bip01 R UpperArm");    
	rightForearmSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle/Bip01 R UpperArm/Bip01 R Forearm");     
	rightHandSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 R Clavicle/Bip01 R UpperArm/Bip01 R Forearm/Bip01 R Hand");    
	leftClavicleSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle");   
	leftUpperArmSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle/Bip01 L UpperArm");    
	leftForearmSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle/Bip01 L UpperArm/Bip01 L Forearm");     
	leftHandSource = transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis/Bip01 Spine/Bip01 Spine1/Bip01 Spine2/Bip01 Neck/Bip01 L Clavicle/Bip01 L UpperArm/Bip01 L Forearm/Bip01 L Hand");    	
	//Target.
	root = transform.Find(rootLocation);
 	pelvis = transform.Find(pelvisLocation);
 	spineRoot = transform.Find(spineRootLocation);
 	stomach = transform.Find(stomachLocation);
 	torso = transform.Find(torsoLocation);
 	neck = transform.Find(neckLocation);
 	head = transform.Find(headLocation);
  	rightThigh = transform.Find(rightThighLocation);
  	rightCalf = transform.Find(rightCalfLocation);
  	rightFoot = transform.Find(rightFootLocation);
  	rightToe = transform.Find(rightToeLocation);
 	leftThigh = transform.Find(leftThighLocation);
 	leftCalf = transform.Find(leftCalfLocation);
 	leftFoot = transform.Find(leftFootLocation);
 	leftToe = transform.Find(leftToeLocation);
 	rightClavicle = transform.Find(rightClavicleLocation);
 	rightUpperArm = transform.Find(rightUpperArmLocation);
 	rightForearm = transform.Find(rightForearmLocation );
 	rightHand  = transform.Find(rightHandLocation);
 	leftClavicle = transform.Find(leftClavicleLocation);
 	leftUpperArm = transform.Find(leftUpperArmLocation );
 	leftForearm = transform.Find(leftForearmLocation);
 	leftHand = transform.Find(leftHandLocation);
}

function LateUpdate () {
	//Check if something was deleted. Assume if Bip01 was deleted everything is deleted. (For LOD)
	if(root == null){
		root = transform.Find(rootLocation);
		spineRoot = transform.Find(spineRootLocation);
		stomach = transform.Find(stomachLocation);
		torso = transform.Find(torsoLocation);
		neck = transform.Find(neckLocation);
		head = transform.Find(headLocation);
		rightThigh = transform.Find( rightThighLocation);
		rightCalf = transform.Find( rightCalfLocation);
		rightFoot = transform.Find( rightFootLocation);
		rightToe = transform.Find( rightToeLocation);
		leftThigh = transform.Find(leftThighLocation);
		leftCalf = transform.Find(leftCalfLocation);
		leftFoot = transform.Find(leftFootLocation);
		leftToe = transform.Find(leftToeLocation);
		rightClavicle = transform.Find(rightClavicleLocation);
		rightUpperArm = transform.Find(rightUpperArmLocation);
		rightForearm = transform.Find(rightForearmLocation);
		rightHand = transform.Find(rightHandLocation);
		leftClavicle = transform.Find(leftClavicleLocation);
		leftUpperArm = transform.Find(leftUpperArmLocation);
		leftForearm = transform.Find(leftForearmLocation);
		leftHand = transform.Find(leftHandLocation);
	}

	//Match Rotation.
	if(root != null){
		root.rotation = rootSource.rotation;
		root.position = rootSource.position;
	}
	if(spineRoot != null){
		spineRoot.rotation = spineRootSource.rotation;
	}
	if(stomach != null){
		stomach.rotation = stomachSource.rotation;
	}
	if(torso != null){
		torso.rotation = torsoSource.rotation;
	}
	if(neck != null){
		neck.rotation = neckSource.rotation;
	}
	if(head != null){
		head.rotation = headSource.rotation;
	}
	if( rightThigh != null){
		 rightThigh.rotation =  rightThighSource.rotation;
	}
	if( rightCalf != null){
		 rightCalf.rotation =  rightCalfSource.rotation;
	}
	if( rightFoot != null){
		 rightFoot.rotation =  rightFootSource.rotation;
	}
	if( rightToe != null){
		 rightToe.rotation =  rightToeSource.rotation;
	}
	if(leftThigh != null){
		leftThigh.rotation = leftThighSource.rotation;
	}
	if(leftCalf != null){
		leftCalf.rotation = leftCalfSource.rotation;
	}
	if(leftFoot != null){
		leftFoot.rotation = leftFootSource.rotation;
	}
	if(leftToe != null){
		leftToe.rotation = leftToeSource.rotation;
	}
	if(rightClavicle != null){
		rightClavicle.rotation = rightClavicleSource.rotation;
	}
	if(rightUpperArm != null){
		rightUpperArm.rotation = rightUpperArmSource.rotation;
	}
	if(rightForearm != null){
		rightForearm.rotation = rightForearmSource.rotation;
	}
	if(rightHand != null){
		rightHand.rotation = rightHandSource.rotation;
	}
	if(leftClavicle != null){
		leftClavicle.rotation = leftClavicleSource.rotation;
	}
	if(leftUpperArm != null){
		leftUpperArm.rotation = leftUpperArmSource.rotation;
	}
	if(leftForearm != null){
		leftForearm.rotation = leftForearmSource.rotation;
	}
	if(leftHand != null){
		leftHand.rotation = leftHandSource.rotation;
	}
}