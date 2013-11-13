/**
* Created by ScetchTurner 13/11/13
**/

function generateCastleObject3d(x, y, z, width, height, depth)
{
	var group = new THREE.Object3D();

	var tower_distance = 4*depth;
	var down_left_tower = generateTowerMesh(x, y, z, width, height, depth);
	group.add(down_left_tower);
	var down_right_tower = generateTowerMesh(x, y, z+tower_distance, width, height, depth);
	group.add(down_right_tower);
	var up_left_tower = generateTowerMesh(x+tower_distance, y, z, width, height, depth);
	group.add(up_left_tower);
	var up_right_tower = generateTowerMesh(x+tower_distance, y, z+tower_distance, width, height, depth);
	group.add(up_right_tower);

	var WALL_WIDTH_RATIO = 3; 
	var WALL_HEIGHT_RATIO = 3/4;
	//down wall 1
	var down_wall1 = generateCommonWallMesh(x+width/2-width/(2*WALL_WIDTH_RATIO),
											 y,
											 z+width, 
											 width/WALL_WIDTH_RATIO, 
											 height*WALL_HEIGHT_RATIO, 
											 (depth*3)/4);
	group.add(down_wall1);

	//down wall 2
	var down_wall2 = generateCommonWallMesh(x+width/2-width/(2*WALL_WIDTH_RATIO),
											 y,
											 z+(3*depth)+width/4, 
											 width/WALL_WIDTH_RATIO, 
											 height*WALL_HEIGHT_RATIO, 
											 (depth*3)/4);
	group.add(down_wall2);

	//up wall 1
	var up_wall1 = generateCommonWallMesh(x+depth*4+width/(WALL_WIDTH_RATIO),
											 y,
											 z+width, 
											 width/WALL_WIDTH_RATIO, 
											 height*WALL_HEIGHT_RATIO, 
											 (depth*3)/4);
	group.add(up_wall1);

	//up wall 2
	var up_wall2 = generateCommonWallMesh(x+depth*4+width/(WALL_WIDTH_RATIO),
											 y,
											 z+(3*depth)+width/4, 
											 width/WALL_WIDTH_RATIO, 
											 height*WALL_HEIGHT_RATIO, 
											 (depth*3)/4);
	group.add(up_wall2);

	//left wall
	var left_wall = generateCommonWallMesh(x-(2*width)/WALL_WIDTH_RATIO,
											 y,
											 z+width, 
											 width/WALL_WIDTH_RATIO, 
											 height*WALL_HEIGHT_RATIO, 
											 depth*3);
	left_wall.rotation.y += Math.PI/2;
	group.add(left_wall);

	//right wall
	var right_wall = generateCommonWallMesh(x-depth*3-width-2*width/WALL_WIDTH_RATIO,
											 y,
											 z+width, 
											 width/WALL_WIDTH_RATIO, 
											 height*WALL_HEIGHT_RATIO, 
											 depth*3);
	right_wall.rotation.y += Math.PI/2;
	group.add(right_wall);


	var DEPTH_SCALE = 1.5;
	var WIDTH_SCALE = 1.5;
	var HEIGHT_SCALE = 1.5;

	var center_up_tower = generateTowerMesh(x, y, z+width+(depth*3)/4,  WIDTH_SCALE*width, HEIGHT_SCALE*height, DEPTH_SCALE*depth);	
	group.add(center_up_tower);

	var center_down_tower = generateTowerMesh(x+tower_distance, y, z+width+(depth*3)/4, WIDTH_SCALE*width, HEIGHT_SCALE*height, DEPTH_SCALE*depth);	
	group.add(center_down_tower);

	var center_up_tower_upper = generateTowerMesh(x+DEPTH_SCALE*depth/4,
													 y+HEIGHT_SCALE*height, 
													 z+width+DEPTH_SCALE*depth/2+WIDTH_SCALE*width/4, 
													 WIDTH_SCALE*width/2, 
													 HEIGHT_SCALE*height/2+height/2, 
													 DEPTH_SCALE*depth/2);
	group.add(center_up_tower_upper);

	return group;
} 