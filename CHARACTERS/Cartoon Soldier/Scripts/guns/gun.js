var firing : boolean = false;
var accuracy : float;
private var bulletCaseGenerator : Transform;
private var bulletTraceGenerator : Transform;
private var muzzleFlashGenerator : Transform;
private var bulletCaseGeneratorScript : bulletCaseGenerator;
private var bulletTraceGeneratorScript : bulletTraceGenerator;
private var muzzleFlashGeneratorScript : muzzleFlashGenerator;

function Start(){
	bulletCaseGenerator = transform.Find("bulletCaseGenerator");
	bulletTraceGenerator = transform.Find("bulletTraceGenerator");
	muzzleFlashGenerator = transform.Find("muzzleFlashGenerator");
	bulletCaseGeneratorScript = bulletCaseGenerator.GetComponent("bulletCaseGenerator");
	bulletTraceGeneratorScript = bulletTraceGenerator.GetComponent("bulletTraceGenerator");
	muzzleFlashGeneratorScript = muzzleFlashGenerator.GetComponent("muzzleFlashGenerator");
	firing = false;
	//accuracy = 0.9;
}

function Update () {
	bulletCaseGeneratorScript.on = firing;
	bulletTraceGeneratorScript.on = firing;
	muzzleFlashGeneratorScript.on = firing;
	bulletTraceGeneratorScript.accuracy = accuracy;
	firing = false;
}

function Fire(){
	firing = true;
}

function SetAccuracy(accuracyValue : float){
	accuracy = accuracyValue;
}