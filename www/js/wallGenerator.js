/**
* Created by SketchTurner 12.11.13
**/

function generateCommonWall(scene, x1, z1, x2, z2, height)
{
	depth = Math.sqrt( (z2-z1)*(z2-z1) + (x2-x1)*(x2-x1) ); // dist between 2 points
	width = Math.abs(x2-x1);
	angle = Math.asin(width/depth);
	wall_mesh = generateCommonWallMesh(x1,0,z1, width, height, depth);

	rotateObject(wall_mesh, angle);
	scene.add(wall_mesh);
}