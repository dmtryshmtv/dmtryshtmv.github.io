var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 100;
ctx.createImageData(canvas.width, canvas.height);
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imageData.data;
var indices = [];
var DIRECTIONS = [[0,1],[0,-1],[1,0],[-1,0]];
start = [canvas.width/2, canvas.height/2]
indices.push(start);
previous_direction = [0,1];

function draw_white() {
    for (var i = 0; i < canvas.height; i += 1) {
        for (var j = 0; j < canvas.width; j += 1) {
            data[i*canvas.height*4 + j*4] = 255;
            data[i*canvas.height*4 + j*4 + 1] = 255;
            data[i*canvas.height*4 + j*4 + 2] = 255;
            data[i*canvas.height*4 + j*4 + 3] = 255;
            }
    }
    ctx.putImageData(imageData, 0, 0);
}

function choose(choices, previous_direction) {
    var index = Math.floor(Math.random() * choices.length);
    while (choices[index][0] == previous_direction[0] && choices[index][1] == previous_direction[1]) {
        index = Math.floor(Math.random() * choices.length);
    }
    return choices[index]
}

function add(point, direction) {
    return [point[0] + direction[0], point[1] + direction[1]];
}

function draw_random_walk() {
    for (var k = 0; k < indices.length; k += 1) {
        var x = indices[k][0];
        var y = indices[k][1];
        data[x*canvas.height*4 + y*4] = 0;      // red
        data[x*canvas.height*4 + y*4 + 1] = 0;      // green
        data[x*canvas.height*4 + y*4 + 2] = 0;      // blue
        data[x*canvas.height*4 + y*4 + 3] = 255;      // alpha
    }
    ctx.putImageData(imageData, 0, 0);
}

function update_draw_random_walk() {
    direction = choose(DIRECTIONS, previous_direction);
    previous_direction = direction;
    current_position = indices[indices.length - 1];
    indices.push(add(current_position, direction));
    draw_random_walk(indices,data);
    if (current_position[0] == canvas.width ||
        current_position[0] == 0 ||
        current_position[1] == canvas.height ||
        current_position[1] == 0) {
       restart_random_walk()
    }
}

function restart_random_walk() {
    start = [canvas.width/2,canvas.height/2]
    indices = [start];
    draw_white();
}

draw_white();
draw_random_walk();

setInterval(update_draw_random_walk,10);
