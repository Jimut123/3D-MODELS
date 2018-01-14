var target : Transform;
var elbowTarget : Transform;

private var inverseKinematicsScript : MonoBehaviour;

function Start(){
	inverseKinematicsScript = GetComponent(inverseKinematics);
}

function Update () {
	inverseKinematicsScript.target = target.position;
	inverseKinematicsScript.elbowTarget = elbowTarget.position;
	inverseKinematicsScript.CalculateIK();
}