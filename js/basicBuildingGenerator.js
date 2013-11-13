/**
 * Created by icemore on 11/11/13.
 */
function getCubeMesh(x, y, z, width, height, depth, material) {
    var geometry = new THREE.Geometry();

    addCube(geometry, x, y, z, width, height, depth);

    return new THREE.Mesh(geometry, material);
}

function getTriangularPrismMesh(x, y, z, width, height, depth, material) {
    var geometry = new THREE.Geometry();

    addTriangularPrism(geometry, x, y, z, width, height, depth);

    return new THREE.Mesh(geometry, material);
}

function generateBarnMesh(x, y, z, width, height, depth, roofHeightRatio, baseWidthRatio, floorsCount, isBase, baseMaterial, firstFloorMaterial, secondFloorMaterial) {
    var result = new Array();
    var floorHeight = height * (1 - roofHeightRatio) / floorsCount;

    if (isBase) {
        result.push(getCubeMesh(x + width * (1 - baseWidthRatio) / 2, y - 10, z, width * baseWidthRatio, 10, depth, baseMaterial));
    }

    // Floors
    for (var i = 0; i < floorsCount; i++) {
        var material;

        if (i == 0)
            material = firstFloorMaterial;
        else
            material = secondFloorMaterial;

        result.push(getCubeMesh(x + width * (1 - baseWidthRatio) / 2, y + i * floorHeight, z, width * baseWidthRatio, floorHeight, depth, material));
    }

    // Roof
    result.push(getTriangularPrismMesh(x, y + height * (1 - roofHeightRatio), z, width, height * roofHeightRatio, depth, secondFloorMaterial));

    return result;
}

function generateChimneyMesh(x, y, z, width, height, depth, material) {
    return getCubeMesh(x, y, z, width, height, depth, material);
}