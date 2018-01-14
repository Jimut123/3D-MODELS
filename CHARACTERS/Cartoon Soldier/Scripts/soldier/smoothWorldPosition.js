//Character Controller clibs stairs' steps in a very snappy manner.
//The purpose of this script is to smooth this snappy changes of position.
//This script must be in a game object in between the hierarchy of the character controller and the soldier.
var ignoreColliders : Collider[];
var horizontalSmooth : float = 2.0;
var verticalSmooth : float = 10.0;
private var worldPosition : Vector3;
private var platformPosition : Vector3;
private var previousPlatformPosition : Vector3;
private var platform : Transform;
private var moveFast : boolean;
private var nothingBelowTime : float;
private var nothingBelowBuffer :float = 0.2;
var list : Array = new Array();

function LateUpdate () {
	horizontalSmooth = Mathf.Max(horizontalSmooth, 0);
	verticalSmooth = Mathf.Max(verticalSmooth, 0);
	if (horizontalSmooth == 0 || moveFast){
		worldPosition.x = transform.parent.position.x;
		worldPosition.z = transform.parent.position.z;
	}
	else{
		worldPosition.x = Mathf.Lerp(worldPosition.x, transform.parent.position.x, Time.deltaTime * 50.0 / horizontalSmooth);
		worldPosition.z = Mathf.Lerp(worldPosition.z, transform.parent.position.z, Time.deltaTime * 50.0 / horizontalSmooth);
	}

	if(verticalSmooth == 0 || moveFast){
		worldPosition.y = transform.parent.position.y;
	}
	else{
		worldPosition.y = Mathf.Lerp(worldPosition.y, transform.parent.position.y, Time.deltaTime * 50.0 / verticalSmooth);
	}
	transform.position = worldPosition;
	moveFast = ShouldMoveFast();
}

function ShouldMoveFast() : boolean{
	var hits : RaycastHit[] = Physics.RaycastAll(worldPosition + Vector3.up * 0.25, -Vector3.up, 0.5);
	var closestHitDistance : float = -1;
	var closestTransform : Transform = null;;
	for(var i = 0; i < hits.Length; i++){
		var hit : RaycastHit = hits[i];
		var hitCollider : Collider = hit.collider;
		var ignore : boolean = false;
		for(var n = 0; n < ignoreColliders.Length; n++){
			var ignoreCollider : Collider = ignoreColliders[n];
			if(hitCollider == ignoreCollider){
				ignore = true;
			}
		}
		if(!ignore){
			list.Add(hit.transform.name);
			if(closestHitDistance == -1){
				closestHitDistance = hit.distance;
				closestTransform = hit.transform;
			}
			else{
				if(hit.distance < closestHitDistance){
					closestHitDistance = hit.distance;
					closestTransform = hit.transform;
				}
			}
		}
	}
	if(closestTransform == null){//No platform found.
		platform = null;
		nothingBelowTime += Time.deltaTime; //Start counting time if nothing is below.
		if(nothingBelowTime > nothingBelowBuffer){
			return true; //Nothing below, then it's falling, it should move fast.
		}
		else{
			return false; //Nothing is below, but respect buffer. Move smoothly.
		}
	}
	else{
		nothingBelowTime = 0; //Reset this value because platorm was found.
		if(platform == closestTransform){ //If still at the same platform, compare with previous position.
			platformPosition = platform.position;
			if(platformPosition != previousPlatformPosition){//If position is different, then it's a moving platform, it should move fast.
				return true;
			}
			else{
				return false; //Platform is at the same position, is on a static floor. Should move smoothly.
			}
		}
		else{ //Is on a different platform, store the inital position.
			platform = closestTransform;
			previousPlatformPosition = platform.position;
			return false;
		}
	}
	
}
