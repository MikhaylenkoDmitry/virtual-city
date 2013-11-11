/**
 * Created by icemore on 11/11/13.
 */

function addRectangleFace(geometry, pointsOffset, a, b, c, d)
{
    geometry.faces.push(new THREE.Face3(pointsOffset + a, pointsOffset + b, pointsOffset + c));
    geometry.faces.push(new THREE.Face3(pointsOffset + c, pointsOffset + d, pointsOffset + a));
}

function addTriangleFace(geometry, pointsOffset, a, b, c)
{
    geometry.faces.push(new THREE.Face3(pointsOffset + a, pointsOffset + b, pointsOffset + c));
}

function addCube(geometry, x, y, z, width, height, depth)
{
    var pointsOffset = geometry.vertices.length;

    // Vertices
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.vertices.push(new THREE.Vector3(x + width, y, z));
    geometry.vertices.push(new THREE.Vector3(x + width, y, z + depth));
    geometry.vertices.push(new THREE.Vector3(x, y, z + depth));
    geometry.vertices.push(new THREE.Vector3(x, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x + width, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x + width, y + height, z + depth));
    geometry.vertices.push(new THREE.Vector3(x, y + height, z + depth));

    // Faces
    addRectangleFace(geometry, pointsOffset, 0, 1, 2, 3);
    addRectangleFace(geometry, pointsOffset, 4, 7, 6, 5);
    addRectangleFace(geometry, pointsOffset, 6, 7, 3, 2);
    addRectangleFace(geometry, pointsOffset, 5, 1, 0, 4);
    addRectangleFace(geometry, pointsOffset, 5, 6, 2, 1);
    addRectangleFace(geometry, pointsOffset, 7, 4, 0, 3);
}

function addTriangularPrism(geometry, x, y, z, width, height, depth)
{
    var pointsOffset = geometry.vertices.length;

    // Vertices
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.vertices.push(new THREE.Vector3(x + width, y, z));
    geometry.vertices.push(new THREE.Vector3(x + width/2, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x, y, z + depth));
    geometry.vertices.push(new THREE.Vector3(x + width, y, z + depth));
    geometry.vertices.push(new THREE.Vector3(x + width/2, y + height, z + depth));

    // Faces
    addTriangleFace(geometry, pointsOffset, 2, 1, 0);
    addTriangleFace(geometry, pointsOffset, 5, 3, 4);
    addRectangleFace(geometry, pointsOffset, 2, 5, 4, 1);
    addRectangleFace(geometry, pointsOffset, 2, 0, 3, 5);
}
