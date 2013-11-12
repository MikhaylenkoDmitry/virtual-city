/**
 * Created by icemore on 11/11/13.
 */

function getRandomIndexWithDistribution(distrib)
{
    var rand = Math.random();

    for(var i = 0; i < distrib.length; i++)
        if(distrib[i] >= rand)
            return i;

    return distrib.length - 1;
}

function getRandomNumber(min, max)
{
    return Math.random() * (max - min) + min;
}

function getHouseFloorsCount(subBuildingLevel)
{
    if(subBuildingLevel > 0)
        return 1;

    var distrib = [0.6, 0.9, 1];
    var result = getRandomIndexWithDistribution(distrib);

    return result + 1;
}

function getSubBuildingsCount(subBuildingLevel)
{
    var distrib;
    if(subBuildingLevel < 1)
        distrib = [0.5, 0.8, 1];
    else
        distrib = [0.8, 1];

    return getRandomIndexWithDistribution(distrib);
}

function getSubBuildingLevel()
{
    var distrib = [0.4, 0.6, 0.7, 1];
    return getRandomIndexWithDistribution(distrib);
}

function getHouseHeight(subBuildingLevel)
{
    return getRandomInt(10/(subBuildingLevel + 1), 25/(subBuildingLevel + 1));
}

function getHouseRoofRatio()
{
    return getRandomNumber(0.2, 0.7);
}

function getHouseBaseWidthRatio()
{
    return getRandomNumber(0.7, 1);
}

function getChimneyPosition()
{
    return getRandomNumber(0.2, 0.8);
}

function generateBuildingToArray(subBuildingLevel, x, y, z, width, depth, angle)
{
    var result = new Array();

    // Base building
    var height = getHouseHeight(subBuildingLevel);
    var roofRatio = getHouseRoofRatio();
    var floorsCount = getHouseFloorsCount(subBuildingLevel);
    var baseWidthRatio = getHouseBaseWidthRatio();
    var floorHeight = height * (1 - roofRatio) / floorsCount;

    var baseMaterial = materialFactory.getMaterialByName('houseBasement');
    var floorMaterial = materialFactory.getMaterialByName('houseFloor' + getRandomInt(1, 2));

    if(subBuildingLevel > 0)
        baseMaterial = floorMaterial;

    result.push.apply(result, generateBarnMesh(0, 0, 0, width, height, depth, roofRatio, baseWidthRatio, floorsCount, baseMaterial, floorMaterial));

    if(subBuildingLevel == 0)
    {
        result.push(generateChimneyMesh(width/4, floorHeight*floorsCount, depth*getChimneyPosition(), width/10, height*roofRatio, width/10, angle));
    }

    // SubBuildings
    if(subBuildingLevel < 2)
    {
        var subBuildingsCount = getSubBuildingsCount(subBuildingLevel);

        for(var i = 0; i < subBuildingsCount; i++)
        {
            var level = Math.min(getSubBuildingLevel(), floorsCount);

            result.push.apply(result, generateBuildingToArray(subBuildingLevel + 1, width, floorHeight*level, 0, depth/(subBuildingsCount+1), width, -Math.PI / 2 ));
        }
    }

    for(var i = 0; i < result.length; i++)
    {
        rotateObject(result[i], angle);
        moveObject(result[i], x, y, z);
    }

    return result;
}

function generateBuilding(scene, x, y, z, width, depth, angle)
{
    var array = generateBuildingToArray(0, x, y, z, width, depth, angle);

    for(var i = 0; i < array.length; i++)
        scene.add(array[i]);
}