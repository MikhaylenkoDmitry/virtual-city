

this.width = 1000;
this.height = 1000;
this.segments = 128;
this.smoothingFactor  = 64;

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

this.diamondSquare = function() {
        this.terrain = new Array();

        for(var i = 0; i <= this.segments; i++) {
            this.terrain[i] = new Array();
            for(var j = 0; j <= this.segments; j++) {
                this.terrain[i][j] = getRandomInt(-30,170);
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

    //camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera.position.z = 1000;

    //scene = new THREE.Scene();

    material = new THREE.MeshBasicMaterial( { color: 0x003300, wireframe: true  } );

    this.terrain = diamondSquare();

    this.geometry = new THREE.PlaneGeometry(
        this.width,
        this.height,
        this.segments,
        this.segments
    );
    //alert("asdf"+this.geometry.vertices);
    var index = 0;
    for(var i = 0; i < this.segments; i++) {
        for(var j = 0; j < this.segments; j++) {
                this.geometry.vertices[i*this.segments + j].setZ(this.terrain[i][j]);
                index++;

        }
    }

    //this.geometry.rotation.x = 3.1415/2;


    mesh = new THREE.Mesh( geometry, material );
    mesh = generateRiver(mesh);
    mesh.rotation.x = -3.1415/2;
    return mesh;
}





function generateRiver(  map_mesh){


    river_canvas =  document.createElement("canvas");

    river_canvas.width = this.segments;
    river_canvas.height = this.segments;
    canvas = river_canvas.getContext("2d");
    canvas.strokeStyle = "red";
    canvas.lineWidth=10;
    canvas.beginPath();
    canvas.moveTo(20,20);
    canvas.bezierCurveTo(10,getRandomInt(100,200),getRandomInt(100,this.segments),
        getRandomInt(20,this.segments),this.segments,this.segments);
    canvas.stroke();

    map_mesh.geometry.dynamic = true;
    for (var x = 0; x< this.segments; x++){
        for (var y = 0; y< this.segments; y++){
            if (canvas.getImageData(x, y, 1, 1).data[0]>0) {
                alert("asdf");
                map_mesh.geometry.vertices[x*this.segments+y].setZ(-100);
            }
        }
    }
  map_mesh.geometry.verticesNeedUpdate = true;
  return map_mesh;
}
