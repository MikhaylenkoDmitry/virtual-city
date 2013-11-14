function dist2(v1, v2) {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
}

function addRoads(mesh, houseCoords) {
    var blockMaterial = materialFactory.getMaterialByName('block');
    var grassMaterial = materialFactory.getMaterialByName('grass');
    materials = [blockMaterial, grassMaterial];
    var resultMaterial = new THREE.MeshFaceMaterial(materials);
    mesh.geometry.needsUpdate = true;
    mesh.needsUpdate = true;
    for (face in mesh.geometry.faces) {
        mesh.geometry.faces[face].materialIndex = 1;
        vertex = mesh.geometry.vertices[(mesh.geometry.faces[face].a)];
        for (coord in houseCoords) {
            if (dist2(vertex, houseCoords[coord]) < houseCoords[coord].z) {
                mesh.geometry.faces[face].materialIndex = 0;
                break;
            }
        }
    }
    mesh.material = new THREE.MeshFaceMaterial(materials);
}