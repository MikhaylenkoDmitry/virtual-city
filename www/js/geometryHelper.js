/**
 * Created by icemore on 11/11/13.
 */

function addUVForRectangleFace(geometry, faceId)
{
    var x = faceId % 4;
    var y = faceId / 4 | 0;

    geometry.faceVertexUvs[0].push( [
        new THREE.Vector2(1/4*(x+1), 1 - 1/3*(y)),
        new THREE.Vector2(1/4*x, 1 - 1/3*y),
        new THREE.Vector2(1/4*x, 1 - 1/3*(y+1))
    ] );

    geometry.faceVertexUvs[0].push( [
        new THREE.Vector2(1/4*x, 1 - 1/3*(y+1)),
        new THREE.Vector2(1/4*(x+1), 1 - 1/3*(y+1)),
        new THREE.Vector2(1/4*(x+1), 1 - 1/3*(y))
    ] );
}

function addUVForTriangleFace(geometry, faceId)
{
    var x = faceId % 4;
    var y = faceId / 4 | 0;

    geometry.faceVertexUvs[0].push([
        new THREE.Vector2(1/4*x + 1/8, 1-1/3*y),
        new THREE.Vector2(1/4*x, 1-1/3*(y+1)),
        new THREE.Vector2(1/4*(x+1), 1-1/3*(y+1))
    ]);
}

function addRectangleFace(geometry, pointsOffset, a, b, c, d, faceId)
{
    geometry.faces.push(new THREE.Face3(pointsOffset + a, pointsOffset + b, pointsOffset + c));
    geometry.faces.push(new THREE.Face3(pointsOffset + c, pointsOffset + d, pointsOffset + a));

    addUVForRectangleFace(geometry, faceId);
}

function addTriangleFace(geometry, pointsOffset, a, b, c, faceId)
{
    geometry.faces.push(new THREE.Face3(pointsOffset + a, pointsOffset + b, pointsOffset + c));
    addUVForTriangleFace(geometry, faceId);
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
    addRectangleFace(geometry, pointsOffset, 5, 4, 7, 6, 1);
    addRectangleFace(geometry, pointsOffset, 7, 4, 0, 3, 4);
    addRectangleFace(geometry, pointsOffset, 6, 7, 3, 2, 5);
    addRectangleFace(geometry, pointsOffset, 5, 6, 2, 1, 6);
    addRectangleFace(geometry, pointsOffset, 4, 5, 1, 0, 7);
    addRectangleFace(geometry, pointsOffset, 2, 3, 0, 1, 9);
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
    addRectangleFace(geometry, pointsOffset, 2, 5, 4, 1, 3);
    addRectangleFace(geometry, pointsOffset, 5, 2, 0, 3, 2);
    addRectangleFace(geometry, pointsOffset, 4, 3, 0, 1, 11);
    addTriangleFace(geometry, pointsOffset, 2, 1, 0, 0);
    addTriangleFace(geometry, pointsOffset, 5, 3, 4, 0);
}

function addTriangularWallLeftLedge(geometry, x, y, z, width, height, depth)
{
    var pointsOffset = geometry.vertices.length;

    // Vertices
    geometry.vertices.push(new THREE.Vector3(x+width, y, z));
    geometry.vertices.push(new THREE.Vector3(x+width, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x+width, y, z+depth));
    geometry.vertices.push(new THREE.Vector3(x+width, y + height, z+depth));
    geometry.vertices.push(new THREE.Vector3(x, y + height, z+depth));

    // Faces
    addTriangleFace(geometry, pointsOffset, 2, 1, 0);
    addTriangleFace(geometry, pointsOffset, 5, 3, 4);
    addRectangleFace(geometry, pointsOffset, 2, 5, 4, 1);
    addRectangleFace(geometry, pointsOffset, 2, 0, 3, 5);
    addRectangleFace(geometry, pointsOffset, 0, 1, 4, 3);
}

function addTriangularWallRightLedge(geometry, x, y, z, width, height, depth)
{
    var pointsOffset = geometry.vertices.length;

    // Vertices
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.vertices.push(new THREE.Vector3(x, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x+width, y + height, z));
    geometry.vertices.push(new THREE.Vector3(x, y, z+depth));
    geometry.vertices.push(new THREE.Vector3(x, y + height, z+depth));
    geometry.vertices.push(new THREE.Vector3(x+width, y + height, z+depth));

    // Faces
    addTriangleFace(geometry, pointsOffset, 2, 1, 0);
    addTriangleFace(geometry, pointsOffset, 5, 3, 4);
    //addRectangleFace(geometry, pointsOffset, 2, 5, 4, 1);
    //addRectangleFace(geometry, pointsOffset, 2, 0, 3, 5);
    //addRectangleFace(geometry, pointsOffset, 0, 1, 4, 3);
}

function addWall(geometry, x ,y, z, width, height, depth)
{
    HEIGHT_RATIO = 8; 
    LEDGE_RATIO = width/7;
    WIDTH_RATIO = 4;

    addCube(geometry, x, y, z, width, height, depth); //main parallelepiped

    addCube(geometry, x-LEDGE_RATIO, y+height, z, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth); // left platform
    addTriangularWallLeftLedge(geometry, x-LEDGE_RATIO, y+height/2 ,z, LEDGE_RATIO, height/2 ,depth ); // left additional platform 
    
    addCube(geometry, x+3*width/4+LEDGE_RATIO, y+height, z, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth); //right plarform    
    addTriangularWallRightLedge(geometry, x+width, y+height/2 ,z, LEDGE_RATIO, height/2 ,depth ); //right additional platform
    
    //crenellations
    //1 left_platform
    addCube(geometry, x-LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //2 left_platform
    addCube(geometry, x-LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z+3*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //3 left_platform
    addCube(geometry, x-LEDGE_RATIO, y+height+height/HEIGHT_RATIO,  z+6*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13);
    
    //4 left_platform
    addCube(geometry, x-LEDGE_RATIO, y+height+height/HEIGHT_RATIO,  z+9*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13);
    
    //5 left_platform
    addCube(geometry, x-LEDGE_RATIO, y+height+height/HEIGHT_RATIO,  z+12*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //6 right_platform
    addCube(geometry, x+3*width/WIDTH_RATIO+LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //7 right_platform
    addCube(geometry, x+3*width/WIDTH_RATIO+LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z+3*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //8 right_platform
    addCube(geometry, x+3*width/WIDTH_RATIO+LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z+6*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //9 right_platform
    addCube(geometry, x+3*width/WIDTH_RATIO+LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z+9*depth/13, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
    
    //10 right_platform
    addCube(geometry, x+3*width/WIDTH_RATIO+LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z+12*depth/13,  width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/13); 
}

function rotateObject(object, angle)
{
    var rotObjectMatrix = new THREE.Matrix4().makeRotationAxis((new THREE.Vector3(0, 1, 0)).normalize(), angle);

    object.geometry.applyMatrix(rotObjectMatrix);
}

function moveObject(object, x, y, z)
{
    var transMatrix = new THREE.Matrix4().makeTranslation(x, y, z);
    object.geometry.applyMatrix(transMatrix);
}