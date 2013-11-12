/**
 * Created by icemore on 11/11/13.
 */

function getCubeMesh(x, y, z, width, height, depth)
{
    var geometry = new THREE.Geometry();
    var material = materialFactory.getMaterialByName("sky_box");

    addCube(geometry, x, y, z, width, height, depth);

    return new THREE.Mesh(geometry, material);
}

function getTriangularPrismMesh(x, y, z, width, height, depth)
{
    var geometry = new THREE.Geometry();
    var material = materialFactory.getMaterialByName("sky_box");

    addTriangularPrism(geometry, x, y, z, width, height, depth);

    return new THREE.Mesh(geometry, material);
}

function generateBarnMesh(x, y, z, width, height, depth, roofHeightRatio, baseWidthRatio, floorsCount, angle, flag)
{
    var result = new Array();

    var floorHeight = height * (1 - roofHeightRatio) / floorsCount;

    // Floors
    for(var i = 0; i < floorsCount; i++)
    {
        result.push(getCubeMesh(x + width * (1 - baseWidthRatio)/2, y + i * floorHeight, z, width * baseWidthRatio, floorHeight, depth));
    }

    // Roof
    result.push(getTriangularPrismMesh(x, y + height * (1 - roofHeightRatio), z, width, height * roofHeightRatio, depth));

    return result;
}

function generateChimneyMesh(x, y, z, width, height, depth, angle)
{
    return getCubeMesh(x, y, z, width, height, depth);
}
