/**
* Created by ScetchTurner 13/11/13
* It's better to call this method with equal width, height and depth to save proportions
*/

function generateTowerMesh(x, y, z, width, height, depth)
{
	var geometry = new THREE.Geometry();
    //var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    var HEIGHT_RATIO = 7;

    //down wall
    addCube(geometry, x+width/5, y, z, width-2*width/5, height, width/5);
    //down wall platform
    addCube(geometry, x+width/5-width/10, y+height, z-width/10, width-width/5, height/HEIGHT_RATIO, width/5);
	scaleGeomUVForLastFaces(geometry,  1, 1/HEIGHT_RATIO, 12);

	//up wall    
	addCube(geometry, x+width/5, y, z+depth-width/5, width-2*width/5, height, width/5);
	//up wall platform 
	addCube(geometry, x+width/5-width/10, y+height, z+depth-width/5+width/10, width-width/5, height/HEIGHT_RATIO, width/5);
    scaleGeomUVForLastFaces(geometry,  1, 1/HEIGHT_RATIO, 12);

    //left wall
    addCube(geometry, x, y, z, width/5, height, depth);
    //left wall platform
    addCube(geometry, x-width/10, y+height, z-width/10, width/5, height/HEIGHT_RATIO, depth+width/5);
    scaleGeomUVForLastFaces(geometry,  1, 1/HEIGHT_RATIO, 12);

    //right wall
    addCube(geometry, x+width-width/5, y, z, width/5, height, depth);
    //right wall platform
    addCube(geometry, x+width-width/5+width/10, y+height, z-width/10, width/5, height/HEIGHT_RATIO, depth+width/5);
    scaleGeomUVForLastFaces(geometry,  1, 1/HEIGHT_RATIO, 12);

    //crenellations routine
    var crennelHeight = height/10;
    var crennelWidth = width/10;
    var crennelDepth = depth/8;

    var cntr1 = 18;
    for(var i=0; i<cntr1; i+=3){
		addCube(geometry, 
				x-width/10, 
				y+height+height/HEIGHT_RATIO, 
				z-width/10+i*width/14, 
				crennelWidth, 
				crennelHeight, 
				crennelDepth);
		scaleGeomUVForLastFaces(geometry, 1/14, 1/HEIGHT_RATIO, 12);

		addCube(geometry, 
				x-width/10+depth+width/10, 
				y+height+height/HEIGHT_RATIO, 
				z-width/10+i*width/14, 
				crennelWidth, 
				crennelHeight, 
				crennelDepth);
		scaleGeomUVForLastFaces(geometry, 1/14, 1/HEIGHT_RATIO, 12);
	}
 	var cntr2 = 9; 
    for(var i=0; i < cntr2; i+=3){
		addCube(geometry, 
				x-width/10+width/5+i*width/9, 
				y+height+height/HEIGHT_RATIO, 
				z+depth, 
				crennelDepth, 
				crennelHeight, 
				crennelWidth);
		scaleGeomUVForLastFaces(geometry, 1/9, 1/HEIGHT_RATIO, 12);

		addCube(geometry, 
				x-width/10+width/5+i*width/9, 
				y+height+height/HEIGHT_RATIO, 
				z-width/10, 
				crennelDepth, 
				crennelHeight, 
				crennelWidth);
		scaleGeomUVForLastFaces(geometry, 1/9, 1/HEIGHT_RATIO, 12);

	}

	var texture = materialFactory.getTextureByName('wall2');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(8, 8);
	var material = new THREE.MeshBasicMaterial({map: texture});

    return new THREE.Mesh(geometry, material);
}