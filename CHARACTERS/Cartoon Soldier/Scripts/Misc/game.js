var soldier : GameObject;
var soldierPrefab : GameObject;
var sentryGun : GameObject;
var sentryGunPrefab : GameObject;
var resetMenu : boolean = false;
var menu1 : GUIText;
var menu2 : GUIText;
var lockCursorCheck : boolean = true;
var showCursor : boolean = false;

function Start(){
	Screen.lockCursor = lockCursorCheck;
	Screen.showCursor = showCursor;
}
function Update () {
	if (Input.GetKey ("escape")) {
		Application.Quit();
	}
	if(Input.GetKeyDown(KeyCode.B)){
		Debug.Break();
	}
	if(Input.GetKeyDown(KeyCode.R)){
		resetMenu = true;
	}
	if(resetMenu){
		menu1.text = "Reset menu:";
		menu2.text = "(1) Reset soldier. (2) Reset sentry gun.";
		if(Input.GetKeyDown(KeyCode.Alpha1)){
			 ResetSoldier();
			 resetMenu = false;
		}
		if(Input.GetKeyDown(KeyCode.Alpha2)){
			 ResetSentryGun();
			 resetMenu = false;
		}
	}
	else{
		menu1.text = "Soldier scripts v0.93 sample scene";
		menu2.text = "(Under development - report bugs: dogzerx@hotmail.com)";
	}
	Screen.lockCursor = true;
}

function ResetSoldier(){
	Destroy(soldier);
	soldier = Instantiate(soldierPrefab,Vector3.zero,Quaternion.identity);
	soldier.name = "soldier3rdPerson"; //This is so the sentry gun will recognize & shoot him.
}

function ResetSentryGun(){
	Destroy(sentryGun);
	sentryGun = Instantiate(sentryGunPrefab,Vector3(0,0,3), Quaternion.identity);
	sentryGun.transform.rotation.eulerAngles.y = 90;
	sentryGun.name = "sentryGun"; //This is so the sentry gun will recognize & shoot him.
}