using UnityEngine;
using System.Collections;

public class TransformingRobotCameraScript : MonoBehaviour {

	public GameObject target;
	public float turnSpeed=.2f;
	public float speed=3f;
	
	void FixedUpdate(){
		transform.position = Vector3.Lerp (transform.position,target.transform.position,Time.deltaTime*speed);
		transform.rotation = Quaternion.Lerp (transform.rotation,target.transform.rotation,Time.deltaTime*turnSpeed);
	}

}
