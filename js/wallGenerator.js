/**
 * Created by SketchTurner 12.11.13
 **/
function generateCommonWall(scene, x1, z1, x2, z2, width, height) {
    var depth = Math.sqrt((z2 - z1) * (z2 - z1) + (x2 - x1) * (x2 - x1)); // dist between 2 points
    var rad = Math.asin((x2 - x1) / depth);
    var rad_c = Math.acos((z2 - z1) / depth);
    if (rad < 0)
        rad = -rad_c;
    else
        rad = rad_c;

    var wall_mesh = generateCommonWallMesh(0, 0, 0, width, height, depth);

    //	var axis = new THREE.Vector3(0,1,0);
    //	wall_mesh.rotateOnAxis(axis, rad);
    //	wall_mesh.position.x = x1;
    //	wall_mesh.position.z = z1;

    rotateObject(wall_mesh, rad);
    moveObject(wall_mesh, x1, 0, z1);

    scene.add(wall_mesh);
}