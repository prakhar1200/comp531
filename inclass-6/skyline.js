'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2;
	var grad = c.createLinearGradient(0,floor,0,canvas.height);
	grad.addColorStop(0, "green");
	grad.addColorStop(1, "black");
	c.fillStyle=grad;
	c.fillRect(0, floor, canvas.width, canvas.height);

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3;
	var windowHeight = 5, windowWidth = 3;

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'];
	var windowColors = ['yellow', 'black'];
    var buildings = [];
    var sun = {x:15, y:75};
    var carX = 0;
	//build a building
	var build = function() { 
		c.clearRect(0,0,canvas.width,canvas.height/2);
		buildings.forEach(function(bldg){
		    c.fillStyle = bldg.color;
			c.fillRect(bldg.x0, floor - bldg.height, bldg.width, bldg.height);
			c.fillStyle="yellow";
			for (var y = floor - floorSpacing; y > floor - bldg.height; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < bldg.width - windowWidth; x += windowSpacing + windowWidth) {
					c.fillStyle = windowColors[Math.floor(Math.random() * windowColors.length)];
					c.fillRect(bldg.x0 + x, y - windowHeight, windowWidth, windowHeight);
				}
			}
		});
	
		c.beginPath();
        c.arc(sun.x, sun.y, 15, 0, 2 * Math.PI,false);
        c.fillStyle='yellow';
        c.fill();
        c.stroke();
        c.fillStyle = 'Red';
        c.fillRect(carX,canvas.height/2-25,45,20);
        c.beginPath();
        c.arc(carX+10, canvas.height/2-5 , 5, 0, 2 * Math.PI, true);
        c.arc(carX+35, canvas.height/2-5 , 5, 0, 2 * Math.PI, true);
        c.fillStyle = "#696969";
        c.fill();
	}
	
	var addBuild = function() {
		buildings.push({
			x0 : Math.random()*canvas.width,
			width : (windowWidth+windowSpacing) * Math.floor(Math.random()*10),
			height : Math.random()*canvas.height/2,
        	color : blgColors[ Math.floor(Math.random()*blgColors.length)]
        });
        build();
	}
	
	var changeHeight = function(event){
    	var rect = canvas.getBoundingClientRect();
    	var clickX = event.clientX - rect.left;
    	var clickY = canvas.height/2 - (event.clientY - rect.top);
    	if(clickX > 0 && clickY > 0){
    		for(var i = buildings.length-1; i >= 0; i--) {
    			var bldg = buildings[i];
    			if(clickX >= bldg.x0 && clickX < (bldg.x0 + bldg.width) && clickY <= bldg.height) {
    				bldg.height += 20;	
    				build();
    				break;
    			}
    			
    		}
    	}
	}
	setInterval(function() {
		carX += 30;
		carX = carX % canvas.width;
	    sun.x += 10;
	    sun.x = sun.x % canvas.width;
	    sun.x <= canvas.width/2 ? sun.y-- : sun.y++;
	    build();
	}, 200);
	return {
		addBuild: addBuild,
		changeHeight:changeHeight
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"));
	document.getElementById("build").onclick = app.addBuild;
	document.querySelector("canvas").onclick = app.changeHeight;
}

