/**
 * Created by icemore on 11/11/13.
 */


function generateBarnMesh(width, height, depth, roofHeightRatio, baseWidthRatio)
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    addCube(geometry, width * (1 - baseWidthRatio)/2, 0, 0, width * baseWidthRatio, height * (1 - roofHeightRatio), depth);
    addTriangularPrism(geometry, 0, height * (1 - roofHeightRatio), 0, width, height * roofHeightRatio, depth);

    return  new THREE.Mesh( geometry, material );
}