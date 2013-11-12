/**
* Created by SketchTurner 12.11.13
**/

function generateCommonWall(scene, x1, z1, x2, z2, width, height)
{
	depth = Math.sqrt( (z2-z1)*(z2-z1) + (x2-x1)*(x2-x1) ); // dist between 2 points
	angle = Math.acos(Math.abs(z2-z1)/depth);
	wall_mesh = generateCommonWallMesh(x1, 0, z1, width, height, depth);
	
	var axis = new THREE.Vector3(0,1,0);
	var rad=0;
	rad+=angle;
	wall_mesh.rotateOnAxis(axis,rad);
	
	scene.add(wall_mesh);
}