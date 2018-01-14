var on : boolean = true;

var gameScript : game;

function Update () {
	if(Input.GetKeyDown(KeyCode.Tab)){
		if(on){
			on = false;
		}
		else{
			on = true;
		}
	}
	var camera : Transform = gameScript.soldier.transform.Find("smoothWorldPosition/soldierCamera");
	if(on){	
		camera.GetComponent(Camera).enabled = false;
		camera.GetComponent(AudioListener).enabled = false;
		GetComponent(Camera).enabled = true;
		GetComponent(AudioListener).enabled = true;
		transform.LookAt(gameScript.soldier.transform.Find("smoothWorldPosition/soldierSkeleton/Bip01/Bip01 Pelvis"));
	}
	else{
		camera.GetComponent(Camera).enabled = true;
		camera.GetComponent(AudioListener).enabled = true;	
		GetComponent(Camera).enabled = false;
		GetComponent(AudioListener).enabled = false;
	}
}