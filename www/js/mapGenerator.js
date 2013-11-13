
this.BUILDINGS_COUNT = 500;
this.width = 1000;
this.height = 1000;
this.segments = 256;
this.smoothingFactor  = 80;
this.river_canvas;
this.high_map = new Array();

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
    for (var x = 0; x < this.width; x++){
        this.high_map[x] = new Array();
        for (var y =0; y < this.height; y++){
            this.high_map[x][y] = this.terrain[x*(this.segments-1)/this.width|0][y*(this.segments-1)/this.width|0]
        }
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

function xyindex(x, y, width){
       return (((x + width/2|0) + (-y + width/2|0) * width) *4);
}
function vertex_index2image_index(a, map_mesh){
            ver_i = a;
            i_x = map_mesh.geometry.vertices[ver_i].x;// + this.width/2|0;
            i_y = -map_mesh.geometry.vertices[ver_i].y;// + this.height/2|0;
            //return ((i_x + i_y * this.width) * 4)|0;
            return xyindex(i_x, i_y, this.width);

}


function generateRiver(  map_mesh){
    this.river_canvas =  document.createElement("canvas");
    this.river_canvas.width = this.width;
    this.river_canvas.height = this.height;

    canvas = this.river_canvas.getContext("2d");
    canvas.rect(0,0,this.width,this.height);
    canvas.fillStyle = "black";
    canvas.fill;
    this.river_canvas.river_width = this.width/10|0;
    this.river_canvas.x_0 = 0;
    this.river_canvas.y_0 = 0;
    this.river_canvas.x_1 = getRandomInt(100,this.width);
    this.river_canvas.y_1 = getRandomInt(100,this.width);
    this.river_canvas.x_2 = getRandomInt(100,this.width);
    this.river_canvas.y_2 = getRandomInt(100,this.width);
    this.river_canvas.x_3 = this.width;
    this.river_canvas.y_3 = this.width;
    canvas.lineWidth = this.river_canvas.river_width; //ширина реки
    canvas.strokeStyle = "rgb(255,0,0)";
    canvas.lineWidth += 20;
    canvas.beginPath();
    canvas.moveTo(0,0);
    canvas.bezierCurveTo(   this.river_canvas.x_1,this.river_canvas.y_1,
                                this.river_canvas.x_2,this.river_canvas.y_2,
                                this.river_canvas.x_3,this.river_canvas.y_3);
    canvas.stroke();
    canvas.strokeStyle = "rgb(255,255,0)";
    canvas.lineWidth -= 20;
    canvas.beginPath();
    canvas.moveTo(0,0);
    canvas.bezierCurveTo(   this.river_canvas.x_1,this.river_canvas.y_1,
                            this.river_canvas.x_2,this.river_canvas.y_2,
                            this.river_canvas.x_3,this.river_canvas.y_3);
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

        index = xyindex(map_mesh.geometry.faces[i].centroid.x, -map_mesh.geometry.faces[i].centroid.y, this.width)+1;

        index_a = vertex_index2image_index(map_mesh.geometry.faces[i].a, map_mesh)+1;
        index_b = vertex_index2image_index(map_mesh.geometry.faces[i].b, map_mesh)+1;
        index_c = vertex_index2image_index(map_mesh.geometry.faces[i].c, map_mesh)+1;

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
function placeCastle(castle_size, river_width){
    var r = this.width/2;
    var r2 = castle_size+river_width;
    var context =  this.river_canvas.getContext("2d");
    var img_data = context.getImageData(0, 0, this.width, this.width);
    var powers = new Array();
    for (var x = 0; x < this.width; x ++){
        powers[x] = new Array();
        for (var y = 0; y<this.width; y++){
            powers[x][y] = 0;
        }
    }
    function increase(powers, x, y, r,r2 ){
        var i = x - r/2;
        if (i<0) i =0;
        for ( ; i < x+r/2 && i < this.width; i++){
            var j = y -r/2;
            if (j<0) j=0;
            for (; j < y + r/2 && j < this.width; j++){
                if (Math.abs(x-i)+Math.abs(y-j) < r)
                    if (Math.abs(x-i)+Math.abs(y-j) < r2){
                       powers[i][j]-=10;
                    }else
                    powers[i][j]+=1;
            }
        }
    }
    for (var x = 0; x < this.width; x +=30){
        for (var y = 0; y < this.width; y+=30){
            if (img_data.data[xyindex(x-this.width/2,y-this.width/2,this.width)+1]>0){
                increase(powers,x,y,r,r2);
            }
        }
    }
    var max_x = 0;
    var max_y = 0;
    for (var x = 0; x < 1000; x +=1){
        for (var y = 0; y<1000; y+=1){
            if (powers[max_x][max_y] < powers[x][y]){
                max_x = x;
                max_y = y;
            }
        }
    }
    return [max_x-this.width/2, max_y-this.width/2];
}

function cityWall(X1, Y1, R){
    var context =  this.river_canvas.getContext("2d");
    var img_data = context.getImageData(0, 0, this.width, this.width);

   function placeWall(x1,y1){
        if (typeof this.cityWall.x2 === 'undefined'){
            this.cityWall.x2  = x1;
            this.cityWall.y2 = y1;
            this.cityWall.x_f  = x1;
            this.cityWall.y_f = y1;
            return;
        }
        x2 = this.cityWall.x2;
        y2 = this.cityWall.y2;
        if (x1>-this.width/2 && x1 < this.width/2  && y1>-this.width/2 && y1 < this.width/2 &&
            x2>-this.width/2 && x2 < this.width/2  && y2>-this.width/2 && y2 < this.width/2){
        if ((img_data.data[xyindex(x1,y1,this.width)]>0 || img_data.data[xyindex(x2,y2,this.width)]>0)) {}
        else
            generateCommonWall(scene, x1, y1,  x2 ,y2 , 20, 20);
        }

        this.cityWall.x2  = x1;
        this.cityWall.y2 = y1;
   }
   var x = 0;
   var y = R;
   var delta = 1 - 2 * R;
   var mltpl = 1;
   var error = 0;
   var p_x;
   var p_y;
   var frst = 0;
   for (var j = 0; j < 4 ; ++j){
            x = 0;
            y = R;
            delta = 1 - 2 * R;
            error = 0;
       while (y >= 0) {

            if (frst > 50){
                switch(j){
                case(0):placeWall(X1 - x*mltpl, Y1 + y*mltpl); break;
                case(1):placeWall(X1 - y*mltpl, Y1 - x*mltpl); break;
                case(2):placeWall(X1 + x*mltpl, Y1 - y*mltpl); break;
                case(3):placeWall(X1 + y*mltpl, Y1 + x*mltpl); break;
                }
                frst = 1;
                p_x = x;
                p_y = y;
            }
            frst ++;


           error = 2 * (delta + y) - 1;
           if ((delta < 0) && (error <= 0)){
               delta += 2 * ++x + 1;
               continue;
           }
           error = 2 * (delta - x) - 1;
           if ((delta > 0) && (error > 0)){
               delta += 1 - 2 * --y;
               continue;
           }
           x+=1;
           delta += 2 * (x - y);
           y-=1;
       }
   }
   placeWall(this.cityWall.x_f, this.cityWall.y_f);
}


function placeStuff(scene){

    canvas = this.river_canvas.getContext("2d");
    canvasImageData = canvas.getImageData(0, 0, this.width, this.height);
    //замок

    var zm_size = 40;
    zm = placeCastle(zm_size,this.river_canvas.river_width );
    var zm_x_0 = zm[0];
    var zm_y_0 = zm[1];
    var zm_angle = Math.random()*Math.PI;
    giveMeTheTower(scene,zm_x_0,0,zm_y_0,zm_size,zm_size*2,zm_size, zm_angle);

    //городская стена
    cityWall(zm_x_0, zm_y_0, 300);

    //giveMeTheTower(scene,zm_x_0, 0, zm_y_0 , zm_size, zm_size, zm_angle);
    //здания
    var min_h = 100;
    var max_h = -100;
    for (var i = 0; i< this.BUILDINGS_COUNT; i++ ){
        var x = getRandomInt(10,this.width-10)-this.width/2;
        var y = getRandomInt(10,this.height-10) - this.height/2;
        var index = xyindex(x,y, this.width);

        if (canvasImageData.data[index]>0){
            i-=1;
            continue;
        }  else{
            z =  this.high_map[x+this.width/2][-y+this.width/2];
            if (z > max_h) max_h = z;
            if (z< min_h) min_h = z;

            generateBuilding(scene, x,z,y , 10, 10, Math.random()*Math.PI);
        }

    }
    alert(min_h);
    alert(max_h);

    /*
    var x= -this.width/2;
    var y = -this.width/2;
    for (; x < this.width/2; x += 10){
       generateCommonWall(scene, x, y, x+10, y, 10, 20);

    }
    for (; y < this.width/2; y += 10){
       generateCommonWall(scene, x, y, x, y+10, 10, 20);
    }
    for (; x > -this.width/2; x -= 10){
            generateCommonWall(scene, x, y, x+10, y, 10, 20);
    }
    for (; y >- this.width/2; y -= 10){
        generateCommonWall(scene, x, y, x, y+10, 10, 20);
        }
    */
}
