var life : float = 0.5;
var bulletSpeed : float = 1.0;
var dustPrefab : GameObject;
var bulletHolePrefab : GameObject;

private var destroyTime : float;
private var velocity : Vector3;
private var gravity : float = 9.8;

function Start(){
	destroyTime = Time.time + life;
	velocity += transform.forward * bulletSpeed;
}

function Update () {
	if(Time.time > destroyTime){
		Destroy(gameObject);
	}
	var ray : Ray;
	ray.origin = transform.position;
	ray.direction = transform.forward;
	var hit : RaycastHit;
	if (Physics.Raycast(ray,hit,bulletSpeed*Time.deltaTime)){
		triggerChildrenColliderScript = hit.transform.root.GetComponent(triggerChildrenCollider);
		var reCheck : boolean; //Re-check if there's a hit for children collider.
		var mainColliderHit : Collider = hit.collider; //Parent collider. (must be re enabled)
		if(triggerChildrenColliderScript != null){ //Trigger children property. Enable children collider and disable root collider.
			hit.collider.enabled = false;
			var childrenColliderList : Collider[] = triggerChildrenColliderScript.childrenColliderList;
			for (var i = 0; i < childrenColliderList.Length; i++){
				childrenColliderList[i].enabled = true;
			}
			reCheck = Physics.Raycast(ray,hit,bulletSpeed*Time.deltaTime); //Recheck collision for children collider.
		}
		if(reCheck || triggerChildrenColliderScript == null){ //If children collider or root collider are hit, process the bullet hit.
			Destroy(gameObject);
			var makeDust : boolean = true;
			var makeHole : boolean = true;
			var bulletHolePropertyScript : bulletHoleProperty =  hit.transform.root.GetComponent(bulletHoleProperty);
			var extraPrefab : GameObject;
			var holeSize : float = 1.0;
			var differentBulletMaterialArray : Material[];
			if (bulletHolePropertyScript != null){ //Bullet hole property.
				makeDust = bulletHolePropertyScript.dust;
				makeHole = bulletHolePropertyScript.hole;
				extraPrefab = bulletHolePropertyScript.extraPrefab;
				holeSize = bulletHolePropertyScript.sizeModifier;
				bulletMaterials = bulletHolePropertyScript.bulletMaterials;
			}
			if (extraPrefab != null){ //Extra prefab.
				Instantiate(extraPrefab,transform.position,transform.rotation);
			}
			if (makeDust){ //Dust.
				var newdustCloudGenerator : GameObject = Instantiate(dustPrefab,hit.point - transform.forward*0.1, Quaternion.identity);
				newdustCloudGenerator.GetComponent(dustCloudGenerator).velocity = hit.normal * (2 + Random.value*10);
			}
			if (makeHole){ //Bullet hole.
				var newBulletHole : GameObject = Instantiate(bulletHolePrefab, hit.point + hit.normal *0.01, Quaternion.identity);
				newBulletHole.transform.LookAt(newBulletHole.transform.position + hit.normal);
				newBulletHole.transform.parent = hit.collider.transform;
				var bulletHoleScript : bulletHole = newBulletHole.GetComponent(bulletHole);
				bulletHoleScript.size *= holeSize;
				if (bulletHolePropertyScript != null && bulletMaterials.Length > 0){
					bulletHoleScript.materials = bulletMaterials;
				}	
			}
			if(hit.rigidbody != null){ //Apply force.
				hit.rigidbody.AddForceAtPosition(velocity* 1.5, hit.point);
			}
			var healthScript : health = hit.transform.root.GetComponent(health); //Health property.
			if(healthScript != null){
				healthScript.health -= 20;
				healthScript.SetLastHitTime();
				var hitPointNoHeight : Vector3 = hit.point;//hit.point;
				hitPointNoHeight.y = hit.transform.position.y;
				var hitDirection : Vector3 = hitPointNoHeight - hit.transform.position;
				hitDirection.Normalize();
				hitDirection = hit.transform.root.InverseTransformDirection(hitDirection);
				healthScript.SetHitDirection(hitDirection);
				var recoilDirection : Vector3 = hit.transform.position - hitPointNoHeight;
				recoilDirection.Normalize();
				healthScript.SetrecoilDirecion(recoilDirection);
			}
		}
		if(triggerChildrenColliderScript != null){//Trigger children property. Disable children collider and enable root collider.
			mainColliderHit.enabled = true;
			for (var n = 0; n < childrenColliderList.Length; n++){
				childrenColliderList[n].enabled = false;
			}
		}
	}
	velocity.y -= gravity * Time.deltaTime;
	transform.position += velocity * Time.deltaTime;
	transform.LookAt(transform.position + velocity);
}

