var soldierCamera : Transform;
var lodPrefabs : GameObject[];
var lodDistances : float[];
var soldierCharacter : GameObject;

private var currentLod : int;

function Update (){
	var lodDistance : float = Vector3.Distance(soldierCamera.position, soldierCharacter.transform.position);
	var selectLod : int =  lodPrefabs.Length - 1;
	for (var i = 0; i < lodDistances.Length; i++){
		if (i == 0){
			if(lodDistance < lodDistances[i]){
				selectLod = 0;
			}
		}
		else{
			if(lodDistance < lodDistances[i] && lodDistance > lodDistances[i-1]){
				selectLod = i;
			}
		}
	}
	if (selectLod != currentLod){
		SetLod(selectLod);
	}
}

function SetLod(lod : int){
	Destroy(soldierCharacter);
	var newLOD : GameObject = Instantiate(lodPrefabs[lod], transform.position, transform.rotation);
	newLOD.transform.parent = transform;
	newLOD.name = "soldierCharacter";
	soldierCharacter = newLOD;
	currentLod = lod;
}
