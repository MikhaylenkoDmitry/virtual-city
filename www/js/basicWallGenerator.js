/**
* Created by SketchTurner 12.11.13
**/

function generateCommonWallMesh(x, y, z, width, height, depth)
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

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

    return new THREE.Mesh( geometry, material );
}