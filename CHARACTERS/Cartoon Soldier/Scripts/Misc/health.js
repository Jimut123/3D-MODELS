var health : float;

private var lastHitTime : float;
private var hitDirection : Vector3;
private var recoilDirecion : Vector3;
private var deathTime : float;
private var alive : boolean = true;

function Update(){
	if( health <= 0 && alive){
		alive = false;
		deathTime = Time.time;
	}
	if (health > 0){
		alive = true;
	}
	health = Mathf.Max(health, 0);
}

function SetLastHitTime(){
	lastHitTime = Time.time;
}

function SetLastHitTime(setTime : float){
	lastHitTime = setTime;
}

function GetLastHitTime() : float{
	return lastHitTime;
}

function SetHitDirection(direction : Vector3){
	hitDirection = direction;
}

function GetHitDirection() : Vector3{
	return hitDirection;
}

function SetrecoilDirecion(direction : Vector3){
	recoilDirecion = direction;
}

function GetrecoilDirecion() : Vector3{
	return recoilDirecion;
}

function GetDeathTime() : float{
	return deathTime;
}

function SetHealth(newHealth : float){
	health = newHealth;
}

function GetHealth() : float{
	return health;
}

