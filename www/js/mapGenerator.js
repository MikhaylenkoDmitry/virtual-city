
this.BUILDINGS_COUNT = 50;
this.width = 1000;
this.height = 1000;
this.segments = 128;
this.smoothingFactor  = 100;
this.river_canvas;

function getRandomInt(min, max)
{
    if (!max){
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

this.diamondSquare = function() {
        this.terrain = new Array();

        for(var i = 0; i <= this.segments; i++) {
            this.terrain[i] = new Array();
            for(var j = 0; j <= this.segments; j++) {
                this.terrain[i][j] = 0;//getRandomInt(-30,170);
            }
        }

		var size = this.segments+1;
		for(var length = this.segments; length >= 2; length = length /2) {
			var half = length/2;
			this.smoothingFactor /= 2;

			// generate the new square values
			for(var x = 0; x < this.segments; x += length) {
				for(var y = 0; y < this.segments; y += length) {
					var average = this.terrain[x][y]+ // top left
					this.terrain[x+length][y]+ // top right
					this.terrain[x][y+length]+ // lower left
					this.terrain[x+length][y+length]; // lower right
					average /= 4;
					average += 2*this.smoothingFactor*Math.random()-this.smoothingFactor;
                    try {
					this.terrain[x+half][y+half] = average;
					} catch(e){
					    alert(x+half);
					}
				}
			}

			// generate the diamond values
			for(var x = 0; x < this.segments; x += half) {
				for(var y = (x+half)%length; y < this.segments; y += length) {
					var average = this.terrain[(x-half+size)%size][y]+ // middle left
							this.terrain[(x+half-10)%size+10][y]+ // middle right
							this.terrain[x][(y+half)%size]+ // middle top
							this.terrain[x][(y-half+size)%size]; // middle bottom
					average /= 4;
					average += 2*this.smoothingFactor*Math.random()-this.smoothingFactor;

					this.terrain[x][y] = average;

					// values on the top and right edges
					if(x === 0)
						this.terrain[this.segments][y] = average;
					if(y === 0)
						this.terrain[x][this.segments] = average;
				}
			}
		}
		this.segments +=1
		return this.terrain;
	};





function generateMap() {

    //scene = new THREE.Scene();


    this.terrain = diamondSquare();

    this.geometry = new THREE.PlaneGeometry(
        this.width,
        this.height,
        this.segments,
        this.segments
    );
    for (var i = 0; i < this.geometry.vertices.length; ++i){
        i_x = (this.geometry.vertices[i].x+width/2|0)*(this.segments-1)/this.width|0;
        i_y = (this.geometry.vertices[i].y+width/2|0)*(this.segments-1)/this.width|0;
        this.geometry.vertices[i].setZ(this.terrain[i_x][i_y]);
    }
    /*
    var index = 0;
    for(var i = 0; i < this.segments; i++) {
        for(var j = 0; j < this.segments; j++) {
                this.geometry.vertices[index].setZ(this.terrain[i][j]);
                index++;
        }
    }
    */

    //this.texture = 'images/textures/grass.jpg';
    mesh = new THREE.Mesh( geometry, materialFactory.getMaterialByName('grass') );
    mesh_and_river = generateRiver(mesh);
    mesh_and_river[0].rotation.x -= 3.1415/2;
    mesh_and_river[1] = new THREE.Mesh( mesh_and_river[1], materialFactory.getMaterialByName('water'));
    mesh_and_river[1].rotation.x -= 3.1415/2;
    return mesh_and_river;
}


function vertex_index2image_index(a, map_mesh, image_width){
            ver_i = a;
            i_x = map_mesh.geometry.vertices[ver_i].x + this.width/2|0;
            i_y = map_mesh.geometry.vertices[ver_i].y + this.height/2|0;
            return index_a = (i_x + i_y * image_width) * 4;

}


function generateRiver(  map_mesh){
    this.river_canvas =  document.createElement("canvas");
    this.river_canvas.width = this.width;
    this.river_canvas.height = this.height;

    canvas = this.river_canvas.getContext("2d");
    canvas.strokeStyle = "red";
    canvas.lineWidth=this.width/10|0; //ширина реки
    canvas.beginPath();
    canvas.moveTo(0,0);
    canvas.bezierCurveTo(getRandomInt(100,1000),getRandomInt(100,1000),getRandomInt(100,1000),
        getRandomInt(100,1000),this.width,this.height);
    canvas.stroke();

    var geom = new THREE.Geometry();

    canvasImageData = canvas.getImageData(0, 0, this.width, this.height);

    //geom.vertices = map_mesh.geometry.vertices.slice(0);
    for (var i = 0; i< map_mesh.geometry.vertices.length; i++){
        k = map_mesh.geometry.vertices[i];
        var v = new THREE.Vector3( k.x, k.y, k.z );
        geom.vertices.push(v);
    }
    for (var i = 0; i < map_mesh.geometry.faces.length; i++){
        i_x = (map_mesh.geometry.faces[i].centroid.x + this.width/2)|0  ;
        i_y = (map_mesh.geometry.faces[i].centroid.y + this.width/2)|0  ;
        index = (i_x + i_y * canvasImageData.width) * 4;

        index_a = vertex_index2image_index(map_mesh.geometry.faces[i].a, map_mesh, canvasImageData.width);
        index_b = vertex_index2image_index(map_mesh.geometry.faces[i].b, map_mesh, canvasImageData.width);
        index_c = vertex_index2image_index(map_mesh.geometry.faces[i].c, map_mesh, canvasImageData.width);

        //if (canvasImageData.data[index] > 0 )        {
         //   geom.faces.push(map_mesh.geometry.faces[i]);
         //   geom.faceVertexUvs[0].push( [
         //   new THREE.Vector2(0,1),
         //   new THREE.Vector2(1,1),
         //   new THREE.Vector2(1,0)
         //   ] );
        if (canvasImageData.data[index_a] > 0 && canvasImageData.data[index_b] > 0 && canvasImageData.data[index_c] > 0){
                map_mesh.geometry.vertices[map_mesh.geometry.faces[i].c].setZ(-200);
        } //else {
            if (map_mesh.geometry.vertices[map_mesh.geometry.faces[i].a].z<-10 ||
                map_mesh.geometry.vertices[map_mesh.geometry.faces[i].b].z<-10 ||
                map_mesh.geometry.vertices[map_mesh.geometry.faces[i].c].z<-10 ||
                canvasImageData.data[index_a] > 0 || canvasImageData.data[index_b] > 0 || canvasImageData.data[index_c] > 0){
            //if (canvasImageData.data[index_a] > 0 || canvasImageData.data[index_b] > 0 || canvasImageData.data[index_c] > 0)
                geom.faces.push(map_mesh.geometry.faces[i]);
                geom.faceVertexUvs[0].push( [
                    new THREE.Vector2(0,1),
                    new THREE.Vector2(1,1),
                    new THREE.Vector2(1,0)
                ] );
            }
            //map_mesh.geometry.vertices[map_mesh.geometry.faces[i].b].setZ(-200);
        //}

    }



    //material = new THREE.MeshBasicMaterial( { color: 0x000033, wireframe: true  } );

    //var river_mesh = new THREE.Mesh( geom, material );

    map_mesh.geometry.dynamic = true;
    map_mesh.geometry.verticesNeedUpdate = true;
    return [map_mesh, geom];

}

function placeStuff(scene){
    canvas = this.river_canvas.getContext("2d");
    canvasImageData = canvas.getImageData(0, 0, this.width, this.height);

    for (var i = 0; i< this.BUILDINGS_COUNT; i++ ){
        var x = getRandomInt(0,this.width)-this.width/2;
        var y = getRandomInt(0,this.height) - this.height/2;
        var index = (x + y * canvasImageData.width) * 4;

        if (canvasImageData.data[index]>0){
            i-=0;
            continue;
        }  else{
        generateBuilding(scene, y, 0,x , 10, 10, Math.random()*Math.PI);
        }

    }
    var x= -this.width/2;
    var y = -this.width/2;
    for (; x < this.width/2; x += 20){
        generateCommonWall(scene, x, y, x+20, y, 20, 100);
    }
    for (; y < this.width/2; y += 20){
        generateCommonWall(scene, x, y, x+20, y, 10, 100);
    }
    for (; x > -this.width/2; x -= 20){
            generateCommonWall(scene, x, y, x+20, y, 10, 100);
    }
    for (; y >- this.width/2; y -= 20){
            generateCommonWall(scene, x, y, x+20, y, 10, 100);
        }
}
