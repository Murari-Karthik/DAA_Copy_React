var padding = 10;
var radius = 2;
var two_params = { width: 900, height: 650 };
var two = null;
var vertices = [];
var algorithms = {
    "gift_wrap": giftWrap,
    "rachu" : rachu

}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// // pauseButton.innerText= "PaUsE";
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }

// Define an array to store coordinates
let coordinates = [];
/**
* Random function taken from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
* Adds randomly generated vertices to the canvas.
*/
function createVertices() {
    num = document.getElementById('num_vertices').value;
    executeButton = document.getElementById("execute");
    pauseButton = document.getElementById("pause");
    pauseButton.innerText = "PaUsE"
    
    if (num === "") { return }
    
    pauseButton.disabled = false
    executeButton.disabled = true
    
    // Unbind update event and clear canvas
    two.unbind('update', null)
    two.clear()
    vertices = []

    for (i = 0; i < num; i++) {
        var x = getRandomInt(padding, two_params.width - padding)
        var y = getRandomInt(padding, two_params.height - padding)
        var circle = two.makeCircle(x, y, radius);
        circle.fill = '#e8104d';
        circle.x = x
        circle.y = y
        vertices.push(circle)
        let point = new Point(x, y);
        coordinates.push(point);
    }
    console.log("Coordinates at index 6:", coordinates[6]); // Output: Point { x: 3, y: 3 }
console.log("X coordinate of coordinates at index 6:", coordinates[6].x); // Output: 3
console.log("Y coordinate of coordinates at index 6:", coordinates[6].y); 
console.log("size is : ", coordinates.length); 
// /////////////


// function anticlock(least_x, q, r)
// {
//     let val = (q.y - least_x.y) * (r.x - q.x)-
//                   (q.x - least_x.x) * (r.y - q.y);
        
//         if (val >= 0) return 0;
//         else return 1; 
// }
// let jmcoor=[];
// function jarvis(points, n)
// {
//         if (n < 3) return;
//         let hull = [];

//         let least = 0;
//         for (let i = 1; i < n; i++)
//             if (points[i].x < points[least].x)
//                 least = i;
        
//         let p = least, q;
//         do
//         {
//             hull.push(points[p]);

//             q = (p + 1) % n;
               
//             for (let i = 0; i < n; i++)
//             {

//                if (anticlock(points[p], points[i], points[q]))
//                    q = i;
//             }
//             p = q;
//         } while (p != least);  

//         for (let temp of hull.values()){
//             let point = new Point(temp.x, temp.y);
//             jmcoor.push(point);
//         console.log("(" + temp.x + ", " +temp.y + ")")
//         }
// }
// let n = coordinates.length;
// jarvis(coordinates, n);
// //////////////


    
    var group = two.makeGroup(...vertices);
    group.scale = 1;
    
    // Animate the creation of the vertices
    two.bind('update', function(frameCount) {
        if (group.scale < 0.9999) {
            var t = (1 - group.scale) * 0.375;
            group.scale += t;
        } else {
            two.unbind('update', null)
            executeButton.disabled = false
            pauseButton.disabled = true
        }
    }).play();
}

/**
* Trigger the algorithm animation.
*/
function execute() {
    // Reset the pause button just in case
    pauseButton = document.getElementById("pause")
    pauseButton.innerText = "PaUsE"
    
    // No point trying to find the convex hull of a single point
    if (vertices.length <= 1) { return }
    
    // Unbind the update event
    two.unbind('update', null)
    
    // Find & execute algorithm chosen in the DOM
    alg = document.getElementById('algorithm').value;
    algorithms[alg].execute(vertices, two)
}

/*
* Pause the animation.
*/
function pause() {
    pauseButton = document.getElementById("pause");
    
    // Someone may laugh at the ASCII chars used in these statements
    if (pauseButton.innerText === "PaUsE") {
        two.pause()
        pauseButton.innerText = "Play"
    } else {
        two.play()
        pauseButton.innerText = "PaUsE"
    }
}

// Create canvas once DOM has been loaded
document.addEventListener("DOMContentLoaded", function(event) { 
    // Place canvas on the page
   canvas = document.getElementById('canvas');
    two = new Two(two_params).appendTo(canvas);

    two.makeText("We will have our vertices here", two_params.width/1.8, two_params.height/2);

    // Render to the canvas
    two.update();
});

document.querySelector('.play-btn').addEventListener('click', function() {
    this.classList.toggle('paused');
    // Toggle between "Play" and "Pause" text
    if (this.classList.contains('paused')) {
        this.querySelector('span').innerText = 'Pause';
    } else {
        this.querySelector('span').innerText = 'Play';
    }
});

