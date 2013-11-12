/**
* Created by SketchTurner 12.11.13
**/

function generateCommonWallMesh(x, y, z, width, height, depth)
{
    var geometry = new THREE.Geometry();

    HEIGHT_RATIO = 8;
    LEDGE_RATIO = width/7;
    WIDTH_RATIO = 4;

    addCube(geometry, x, y, z, width, height, depth); //main parallelepiped

    addCube(geometry, x-LEDGE_RATIO, y+height, z, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth); // left platform
    scaleGeomUVForLastFaces(geometry,  1, 1/HEIGHT_RATIO, 12);

    //addTriangularWallLeftLedge(geometry, x-LEDGE_RATIO, y+height/2 ,z, LEDGE_RATIO, height/2 ,depth ); // left additional platform

    addCube(geometry, x+3*width/4+LEDGE_RATIO, y+height, z, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth); //right plarform
    scaleGeomUVForLastFaces(geometry, 1, 1/HEIGHT_RATIO, 12);

    //addTriangularWallRightLedge(geometry, x+width, y+height/2 ,z, LEDGE_RATIO, height/2 ,depth ); //right additional platform

    var crenellsCount = 13;
    for(i=0; i<crenellsCount; i+=3){
    	addCube(geometry, x-LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z + i*depth/crenellsCount, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/crenellsCount);
    	scaleGeomUVForLastFaces(geometry, 1/crenellsCount, 1/HEIGHT_RATIO, 12);

    	addCube(geometry, x+3*width/WIDTH_RATIO+LEDGE_RATIO, y+height+height/HEIGHT_RATIO, z+i*depth/crenellsCount, width/WIDTH_RATIO, height/HEIGHT_RATIO, depth/crenellsCount);
    	scaleGeomUVForLastFaces(geometry, 1/crenellsCount, 1/HEIGHT_RATIO, 12);
    }

	var texture = materialFactory.getTextureByName('wall2');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(8, 8);
	var material = new THREE.MeshBasicMaterial({map: texture});

    return new THREE.Mesh( geometry, material );
}