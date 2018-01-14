var laserLinePrefab : GameObject;
var on : boolean;
var disableRootCollider : boolean = true;

private var laserPointTransform : Transform;
private var laserPointOrigin : Transform;
private var laserLineRate : float = 2;
private var nextLaserLineTime : float;
private var positionBuffer : float = 2.0;//Between the ends.

function Start(){
	on = true;
	laserPointTransform = transform.Find("laserPoint");
	laserPointOrigin = transform.Find("laserPointOrigin");
}

function Update () {
	var hit : RaycastHit;
	var maxLength : float = 20.0;
	if(disableRootCollider){
		transform.root.collider.enabled = false;
	}
	if(Physics.Raycast(transform.position, transform.forward, hit) && on){
		triggerChildrenColliderScript = hit.transform.root.GetComponent(triggerChildrenCollider);//Children collider property.
		var reCheck : boolean; //Re-check if there's a hit for children collider.
		var mainColliderHit : Collider = hit.collider; //Parent collider. (must be re enabled)
		if(triggerChildrenColliderScript != null){ //Trigger children property. Enable children collider and disable root collider.
			hit.collider.enabled = false;
			var childrenColliderList : Collider[] = triggerChildrenColliderScript.childrenColliderList;
			for (var i = 0; i < childrenColliderList.Length; i++){
				childrenColliderList[i].enabled = true;
			}
			reCheck = Physics.Raycast(transform.position, transform.forward, hit); //Recheck collision for children collider.
		}	
		if(reCheck || triggerChildrenColliderScript == null){ 
			laserPointTransform.position = hit.point + hit.normal * 0.03;
			laserPointTransform.GetComponent(laserPoint).on = true;
			maxLength = Mathf.Min(maxLength, Vector3.Distance(transform.position, hit.point));
		}
		else{
			laserPointTransform.GetComponent(laserPoint).on = false;
		}
		if(triggerChildrenColliderScript != null){//Trigger children property. Disable children collider and enable root collider.
			mainColliderHit.enabled = true;
			for (var n = 0; n < childrenColliderList.Length; n++){
				childrenColliderList[n].enabled = false;
			}
		}
	}
	else{
		laserPointTransform.GetComponent(laserPoint).on = false;
	}
	if(disableRootCollider){
		transform.root.collider.enabled = true;
	}
	laserLineRate = maxLength * 0.5;
	
	if(Time.time > nextLaserLineTime && on){
		nextLaserLineTime = Time.time + (1/laserLineRate);
		var newLaserLine : GameObject = Instantiate(laserLinePrefab, transform.position, Quaternion.identity);
		newLaserLine.name = "laserLine";
		newLaserLine.transform.parent = transform;
		newLaserLine.transform.localRotation = Quaternion.identity;
		newLaserLine.transform.localRotation.eulerAngles.x += 90;
		if(maxLength < positionBuffer*2.0){
			newLaserLine.transform.localPosition.z = positionBuffer;
		}
		else{
			newLaserLine.transform.localPosition.z = Random.Range(positionBuffer,maxLength-positionBuffer);
		}
	}
	if(on){
		laserPointOrigin.GetComponent(laserPoint).on = true;
	}
	else{
		laserPointTransform.GetComponent(laserPoint).on = false;
		laserPointOrigin.GetComponent(laserPoint).on = false;
	}
	//Delete laser lines further than ray cast hit.
	if (maxLength > positionBuffer * 2){
		for (var m = 0; m < transform.childCount; m++){
			var child : Transform = transform.GetChild(m);
			if(child.localPosition.z > maxLength && child.name == "laserLine"){
				Destroy(child.gameObject);
			}
		}
	}
}