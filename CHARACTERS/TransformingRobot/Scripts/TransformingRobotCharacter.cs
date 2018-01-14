using UnityEngine;
using System.Collections;

public class TransformingRobotCharacter : MonoBehaviour {
	public Animator robotAnimator;
	public float robotSpeed=1f;
	public float tankSpeed=1f;
	public float tankRotateSpeed=1f;

	public float planeSpeed=1f;
	public float planeRotateSpeed=1f;

	public int robotMode=1;//0:robot,1:tank,2:plane
	Rigidbody robotRigidBody;



	// Use this for initialization
	void Start () {
		robotAnimator = GetComponent<Animator> ();
		robotAnimator.speed = robotSpeed;
		robotRigidBody = GetComponent<Rigidbody> ();
	}

	void Update(){

	}

	public void RobotModeChange(int aRobotMode){
		robotMode = aRobotMode;
		if (robotMode == 0) {
			transform.rotation=Quaternion.identity;
			robotAnimator.applyRootMotion=true;
			robotRigidBody.constraints=RigidbodyConstraints.FreezeRotation;
			robotRigidBody.useGravity=true;
		} else if (robotMode == 1) {
			transform.rotation=Quaternion.identity;
			robotAnimator.applyRootMotion=false;
			robotRigidBody.constraints=RigidbodyConstraints.FreezeRotationX;
			robotRigidBody.constraints=RigidbodyConstraints.FreezeRotationZ;
			robotRigidBody.useGravity=true;
		}else if(robotMode==2){
			robotAnimator.applyRootMotion=false;
			robotRigidBody.constraints=RigidbodyConstraints.None;
			robotRigidBody.useGravity=false;
		}

	}


	public void Robot(){
		RobotModeChange (0);
		robotAnimator.SetTrigger ("Robot");

	}

	public void Tank(){
		RobotModeChange (1);
		robotAnimator.SetTrigger ("Tank");

	}

	public void Plane(){
		RobotModeChange (2);
		robotAnimator.SetTrigger ("Plane");

	}

	public void Attack(){
		robotAnimator.SetTrigger ("Attack");
	}
	public void Punch(){
		robotAnimator.SetTrigger ("Punch");
	}

	public void Hit(){
		robotAnimator.SetTrigger ("Hit");
	}

	public void Move(float v,float h){
		robotAnimator.SetFloat ("Forward",v);
		robotAnimator.SetFloat ("Turn",h);
		if (robotMode == 1) {
			robotRigidBody.AddForce(v*transform.right*Time.deltaTime*tankSpeed,ForceMode.Force);
			robotRigidBody.AddTorque(h*transform.up*Time.deltaTime*tankRotateSpeed,ForceMode.Force);
		} else if (robotMode == 2) {	
			robotRigidBody.AddForce(transform.right*Time.deltaTime*planeSpeed);
			robotRigidBody.AddTorque(h*transform.up*Time.deltaTime*planeRotateSpeed,ForceMode.Force);
			robotRigidBody.AddTorque(v*transform.forward*Time.deltaTime*planeRotateSpeed,ForceMode.Force);
		}
	}
}
