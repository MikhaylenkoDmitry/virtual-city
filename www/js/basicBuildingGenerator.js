/**
 * Created by icemore on 11/11/13.
 */

function generateBarnMesh(x, y, z, width, height, depth, roofHeightRatio, baseWidthRatio, floorsCount, angle, flag)
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial( { color: flag==0 ? 0xff0000 : 0x00ff00, wireframe: true } );

    var floorHeight = height * (1 - roofHeightRatio) / floorsCount;

    // Floors
    for(var i = 0; i < floorsCount; i++)
    {
        addCube(geometry, x + width * (1 - baseWidthRatio)/2, y + i * floorHeight, z, width * baseWidthRatio, floorHeight, depth);
    }

    // Roof
    addTriangularPrism(geometry, x, y + height * (1 - roofHeightRatio), z, width, height * roofHeightRatio, depth);

    var result = new THREE.Mesh( geometry, material );

    return result;
}

function generateChimneyMesh(x, y, z, width, height, depth, angle)
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    addCube(geometry, x, y, z, width, height, depth);

    var result = new THREE.Mesh(geometry, material);

    return result;
}
