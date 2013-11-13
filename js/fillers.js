function addFillersStuff(scene){
	//...
	var infPlaneGeometry = new THREE.Geometry();
	var z = -40;
	var x = 2500;
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

	var infPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
	infPlaneMaterial = materialFactory.getMaterialByName('infgrass');
	var infPlaneMesh = new THREE.Mesh(infPlaneGeometry, infPlaneMaterial);
	scene.add(infPlaneMesh);


	//add river
	//...
	/*
this.river_canvas.x_0 = 0;
this.river_canvas.y_0 = 0;
и так далее до x_3 и y_3
	*/
}