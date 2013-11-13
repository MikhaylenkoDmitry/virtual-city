

function getSkyboxMesh()
{
	var textureCube = materialFactory.getTextureByName('sky_box');
	var materialCube = new THREE.MeshBasicMaterial({map: textureCube, side: THREE.BackSide});
	var geometryCube = new THREE.Geometry();
	addCube(geometryCube, -5000, -5000, -5000, 10000, 10000, 10000);
	skyboxMesh = new THREE.Mesh( geometryCube, materialCube );
	return skyboxMesh;
}