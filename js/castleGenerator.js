function giveMeTheCastle(scene, x, y, z, width, height, depth, angle) {

    var castle_group = generateCastleObject3d(0, 0, 0, width, height, depth);

    var axisY = new THREE.Vector3(0, 1, 0);

    castle_group.rotateOnAxis(axisY, angle);
    castle_group.position.x = x;
    castle_group.position.y = y;
    castle_group.position.z = z;

    scene.add(castle_group);
}