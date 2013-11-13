 /** 
 * Created by ScetchTurner 13/11/13
 */
 function giveMeTheTower(scene, x, y, z, width, depth, height, angle)
 {
 	var tower_mesh = generateTowerMesh(0, 0, 0, width, depth, height);

 	var axisY = new THREE.Vector3(0,1,0);
	tower_mesh.rotateOnAxis(axisY, angle);
	tower_mesh.position.x = x;
	tower_mesh.position.y = y;
	tower_mesh.position.z = z;
 	scene.add(tower_mesh);
 }