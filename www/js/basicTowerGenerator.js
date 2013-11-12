
function basicTowerMesh(x, y, z, width, height, depth)
{
	var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    addWall(geometry, x, y, z, width, height, depth);
    return new THREE.Mesh(geometry, material);
}