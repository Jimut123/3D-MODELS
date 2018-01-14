private var target : Vector3;
private var elbowTarget : Vector3;

function CalculateIK(){
	transform.LookAt(target, transform.position - elbowTarget);
	var upperArm : Transform = transform.Find("upperArm");
	var elbow : Transform = transform.Find("upperArm/elbow");
	var hand : Transform = transform.Find("upperArm/elbow/hand");
	var upperArmLength : float = Vector3.Distance(upperArm.position, elbow.position);
	var forearmLength : float = Vector3.Distance(elbow.position, hand.position);
	var armLength : float = upperArmLength + forearmLength;
	var hypotenuse : float = upperArmLength;
	var targetDistance : float = Vector3.Distance(upperArm.position, target);
	targetDistance = Mathf.Min(targetDistance, armLength - 0.0001); //Do not allow target distance be further away than the arm's length.
	var adjacent : float = targetDistance * (upperArmLength / armLength);
	var ikAngle : float = Mathf.Acos(adjacent/hypotenuse) * Mathf.Rad2Deg;
	upperArm.LookAt(target, transform.root.up);
	upperArm.localRotation.eulerAngles.x += ikAngle;
	elbow.LookAt(target, transform.root.up);
}