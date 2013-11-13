function addFillersStuff(scene){
	//ADD INF GRASS
	var infPlaneGeometry = new THREE.Geometry();
	var z = -40;
	var x = 6000;
	infPlaneGeometry.vertices.push(new THREE.Vector3(x, z, x));
	infPlaneGeometry.vertices.push(new THREE.Vector3(-x, z, x));
	infPlaneGeometry.vertices.push(new THREE.Vector3(-x, z, -x));
	infPlaneGeometry.vertices.push(new THREE.Vector3(x, z, -x));

	infPlaneGeometry.faces.push(new THREE.Face3(0, 2, 1));
	infPlaneGeometry.faces.push(new THREE.Face3(0, 3, 2));

    infPlaneGeometry.faceVertexUvs[0].push( [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(1, 0)
    ] );
    infPlaneGeometry.faceVertexUvs[0].push( [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1)
    ] );

	var infPlaneMaterial = materialFactory.getMaterialByName('infgrass');
	var infPlaneMesh = new THREE.Mesh(infPlaneGeometry, infPlaneMaterial);
	scene.add(infPlaneMesh);

	//add river
	var infRiver1Geometry = new THREE.Geometry();
	var addX = -469;
	var addY = 469;
	var width = 38;
	var length = 10;
	z1 = 0;
	infRiver1Geometry.vertices.push(new THREE.Vector3(addX+width,z1,addY+width));
	infRiver1Geometry.vertices.push(new THREE.Vector3(addX-width,z1,addY-width));
	infRiver1Geometry.vertices.push(new THREE.Vector3(addX + length*(this.river_canvas.x_0 - this.river_canvas.x_1) - width, z,addY + length*(-this.river_canvas.y_0 + this.river_canvas.y_1) - width ));
	infRiver1Geometry.vertices.push(new THREE.Vector3(addX + length*(this.river_canvas.x_0 - this.river_canvas.x_1) + width, z,addY + length*(-this.river_canvas.y_0 + this.river_canvas.y_1) + width ));
	infRiver1Geometry.faces.push(new THREE.Face3(0, 1, 2));
	infRiver1Geometry.faces.push(new THREE.Face3(0, 2, 3));

    infRiver1Geometry.faceVertexUvs[0].push( [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1)
    ] );
    infRiver1Geometry.faceVertexUvs[0].push( [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1)
    ] );
//3269A0
    var infRiver1Material = new THREE.MeshBasicMaterial({color:0x3279AB});
	//var infRiver1Material = materialFactory.getMaterialByName('infriver');
	var infRiver1Mesh = new THREE.Mesh(infRiver1Geometry, infRiver1Material);
	infRiver1Mesh.position.x = 0;
	infRiver1Mesh.position.y = 0;
	infRiver1Mesh.position.z = 0;
	scene.add(infRiver1Mesh);

//***************************************
	var infRiver2Geometry = new THREE.Geometry();
	var addX = 469;
	var addY = -469;
	var width = 38;
	var length = 10;
	z1 = 0;
	infRiver2Geometry.vertices.push(new THREE.Vector3(addX+width,z1,addY+width));
	infRiver2Geometry.vertices.push(new THREE.Vector3(addX-width,z1,addY-width));
	infRiver2Geometry.vertices.push(new THREE.Vector3(addX + length*(this.river_canvas.x_3 - this.river_canvas.x_2) - width, z,addY + length*(-this.river_canvas.y_3 + this.river_canvas.y_2) - width ));
	infRiver2Geometry.vertices.push(new THREE.Vector3(addX + length*(this.river_canvas.x_3 - this.river_canvas.x_2) + width, z,addY + length*(-this.river_canvas.y_3 + this.river_canvas.y_2) + width ));
	infRiver2Geometry.faces.push(new THREE.Face3(0, 2, 1));
	infRiver2Geometry.faces.push(new THREE.Face3(0, 3, 2));

    infRiver2Geometry.faceVertexUvs[0].push( [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1)
    ] );
    infRiver2Geometry.faceVertexUvs[0].push( [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1)
    ] );
    var infRiver2Material = new THREE.MeshBasicMaterial({color:0x3279AB});
	//var infRiver2Material = materialFactory.getMaterialByName('infriver');
	var infRiver2Mesh = new THREE.Mesh(infRiver2Geometry, infRiver2Material);
	infRiver2Mesh.position.x = 0;
	infRiver2Mesh.position.y = 0;
	infRiver2Mesh.position.z = 0;
	scene.add(infRiver2Mesh);
}