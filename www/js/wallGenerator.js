/**
* Created by SketchTurner 12.11.13
**/

function generateCommonWall(scene, x1, z1, x2, z2, width, height)
{
    var depth = Math.sqrt( (z2-z1)*(z2-z1) + (x2-x1)*(x2-x1) ); // dist between 2 points
    var rad = Math.acos(Math.abs(z2-z1)/depth);
    //var rad = Math.atan(Math.abs(z2-z1)/depth);

    var wall_mesh = generateCommonWallMesh(0, 0, 0, width, height, depth);

	var axis = new THREE.Vector3(0,1,0);
	wall_mesh.rotateOnAxis(axis, rad);
	wall_mesh.position.x = x1;
	wall_mesh.position.z = z1;
	scene.add(wall_mesh);
}