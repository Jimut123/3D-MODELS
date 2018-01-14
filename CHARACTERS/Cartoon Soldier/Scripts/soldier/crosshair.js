var crosshairCenter : Vector2 = Vector2(0.5,0.6);
var offseting : float = 2.0;
var textureUp : Texture;
var textureDown : Texture;
var textureRight : Texture;
var textureLeft : Texture;
var accuracyLoss : float;
var xOffset : float;
var yOffset : float;

private var position : Vector3;
private var xOffsetSpeed : float;
private var yOffsetSpeed : float;
private var crosshairColor : Color = Color.white;
private var crosshairAlpha : float = 1.0;

//External Scripts.
private var healthScript : health;

function Start(){
	healthScript = transform.root.GetComponent("health");
}

function LateUpdate () {
	var health : float = 100.0;
	if(healthScript != null){
		health = healthScript.GetHealth();
	}
	if(health > 0){
		xOffsetSpeed += Input.GetAxis("Mouse X") * Time.deltaTime * 0.2;
		yOffsetSpeed += Input.GetAxis("Mouse Y") * Time.deltaTime * 0.2;
	}
	xOffsetSpeed = Mathf.Lerp(xOffsetSpeed, 0, Time.deltaTime * 20.0);
	yOffsetSpeed = Mathf.Lerp(yOffsetSpeed, 0, Time.deltaTime * 20.0);
	xOffset += xOffsetSpeed;
	yOffset += yOffsetSpeed;
	xOffset = Mathf.Lerp(xOffset, 0, Time.deltaTime * Mathf.Pow(Mathf.Abs(xOffset),offseting ) * offseting * 100);
	yOffset = Mathf.Lerp(yOffset, 0, Time.deltaTime * Mathf.Pow(Mathf.Abs(yOffset),offseting ) * offseting * 100);
	position = Vector3(crosshairCenter.x + xOffset, crosshairCenter.y + yOffset, 0);
	transform.position = position;
}

function OnGUI(){
	var health : float = 100.0;
	if(healthScript != null){
		health = healthScript.GetHealth();
	}
	var alphaWave : float = 0.1;
	if (health > 0){
		crosshairAlpha = Mathf.Sin(Time.time) * alphaWave + (1-alphaWave);
	}
	else{
		crosshairAlpha = Mathf.Lerp(crosshairAlpha,0,Time.deltaTime);
	}
	crosshairColor.a = crosshairAlpha;
	GUI.color = crosshairColor;
	var scale : float = Screen.width * 0.03;
	var xPosition : float = Screen.width * crosshairCenter.x + xOffset * Screen.width - scale *0.5;
	var yPosition : float = Screen.height * (1-crosshairCenter.y) - yOffset * Screen.height - scale *0.5;
	var screenAccuracyDisplay : float = (accuracyLoss * Screen.width) / 40;
	GUI.DrawTexture(Rect(xPosition, yPosition + screenAccuracyDisplay, scale, scale),textureUp);
	GUI.DrawTexture(Rect(xPosition, yPosition - screenAccuracyDisplay, scale, scale),textureDown);
	GUI.DrawTexture(Rect(xPosition - screenAccuracyDisplay, yPosition, scale, scale),textureRight);
	GUI.DrawTexture(Rect(xPosition + screenAccuracyDisplay, yPosition, scale, scale),textureLeft);
}