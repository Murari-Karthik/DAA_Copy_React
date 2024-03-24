// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }

var refEdgeColor = "rgba(0, 0, 255, 0.5)"
var checkEdgeColor = "rgba(255, 0, 0, 0.5)"
var hullEdgeColor = "rgba(0, 255, 0, 0.5)"
var edges = []


/**
* Removes all edges from the canvas
*/
function clearHull(two) {
    if (edges.length == 0) { return }
    
    for (var i in edges) {
        two.remove(edges[i])
    }
}

/**
* Draws an edge onto the canvas
*/
function createEdge(two, color, v1, v2) {
    // console.log(v1.x);
    edge = two.makeLine(v1.x, v1.y, v2.x, v2.y)
    edge.linewidth = 3
    edge.stroke = color
    edge.scale = 0.0
    edges.push(edge)
    
    return edge
}

/**
* Determines if v1 -> v2 -> v3 is a left turn
*/    
function leftTurn(v1, v2, v3) {
    det = (v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x)
    return det < 0
}

/**
* Determines if v1 -> v2 -> v3 is a right turn
*/
function rightTurn(v1, v2, v3) {
    det = (v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x)
    return det > 0
}

function findLeftmostPoint(vertices) {
    leftMost = vertices[0]
    
    for (var i in vertices) {
        if (vertices[i].x < leftMost.x) { leftMost = vertices[i] }
    }
        
    return leftMost
}

function findRightmostPoint(vertices) {
    rightMost = vertices[0]
    
    for (var i in vertices) {
        if (vertices[i].x > rightMost.x) { rightMost = vertices[i] }
    }
        
    return rightMost
}

/**
* Sorts vertices into an array based on whether or not
* they form a right or left turn with line ab
*/
function sortVertices(vertices, a, b, turn) {
    v = []

    for (var i in vertices) {
        if (turn(a, b, vertices[i])) { v.push(vertices[i]) }
    }
        
    return v
}

/**
* Returns the distance from point v to the line
* going throughs points p1 and p2
*/
function lineDistance(p1, p2, v) {
    num = Math.abs(
        ((p2.y - p1.y) * v.x) - ((p2.x - p1.x) * v.y) + (p2.x * p1.y) - (p2.y * p1.x)
    )
    
    den = Math.sqrt(
        (p2.y - p1.y)**2 + (p2.x - p1.x)**2
    )
    
    return num / den
}

/**
* Colours all edges
*/
function colorEdges(color) {
    for (var i in edges) {
        edges[i].stroke = color
    }
}
var drawEdge = function(two, color, start, end) {
    var edge = two.makeLine(start.x, start.y, end.x, end.y);
    edge.stroke = color;
    edge.linewidth = 2; // Set the line width as needed
    edge.opacity = 0; // Set initial opacity to 0
    return edge;
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var animateEdge = function(edge) {
    var initialOpacity = edge.opacity;
    var opacityStep = 0.1; // Step by which opacity increases per frame
    var opacity = 0; // Initial opacity
    var animation = function() {
        if (opacity >= 1) {
            // Once opacity reaches 1, stop the animation
            cancelAnimationFrame(animation);
            // Optionally remove the previous edges
            if (edge.previousEdge) {
                edge.previousEdge.remove();
            }
            return;
        }
        opacity += opacityStep;
        edge.opacity = Math.min(opacity, 1); // Ensure opacity doesn't exceed 1
        two.update(); // Update the canvas
        requestAnimationFrame(animation); // Continue the animation
    };
    animation();
    edge.previousEdge = edge; // Store the previous edge
};

var drawEdge_hull = function(two, color, start, end) {
    var edge = two.makeLine(start.x, start.y, end.x, end.y);
    edge.stroke = color;
    edge.linewidth = 2; // Set the line width as needed
    return edge;
};

/**
* Gets the execution speed from the DOM
*/
function getSpeed() {
    speed = document.getElementById('speed').value
    return speed / 100
}
function anticlock(least_x, q, r)
{
    let val = (q.y - least_x.y) * (r.x - q.x)-
                  (q.x - least_x.x) * (r.y - q.y);
        
        if (val >= 0) return 0;
        else return 1; 
}
var rachu = {
    execute : async function(vertices, two) {
        pauseButton = document.getElementById("pause");
        pauseButton.disabled = false
        let n=vertices.length;
        // Clear the previous hull, if it exists
        clearHull(two)
        console.log("Entered Rachu");
        console.log(n);
        if (n < 3) return;
        let hull = [];
        console.log("No error till herelllll");
        let least = 0;
        for (let i = 1; i < n; i++)
            if (vertices[i].x < vertices[least].x)
                least = i;
                var drawEdgesBetweenPoints = function(two, color, vertices) {
                    // Remove previous edges if they exist
                    if (drawEdgesBetweenPoints.previousEdges) {
                        drawEdgesBetweenPoints.previousEdges.forEach(function(edge) {
                            edge.remove();
                        });
                    }}
                
                    // Initialize an array to store the newly created edges
                    drawEdgesBetweenPoints.previousEdges = [];
        let p = least, q;
        console.log("No error till here");
        do
        {
            hull.push(vertices[p]);

            q = (p + 1) % n;
               
            for (let i = 0; i < n; i++)
            {
                var start = vertices[p];
                var end = vertices[i ];
                var edge = drawEdge(two, refEdgeColor, start, end);
                animateEdge(edge);
                await sleep(500);
                    console.log("Changed lines");
               if (anticlock(vertices[p], vertices[i], vertices[q]))
                 q=i;
                    var p1=vertices[p];
                    var p2=vertices[q];
                 var edge = drawEdge_hull(two, hullEdgeColor, p1, p2);
            }
           
               
           
            p = q;
        } while (p != least);  

        // for (let temp of hull.values()){
        // //console.log("(" + temp.x + ", " +temp.y + ")")
        // }
        
        point_step(0)
    }
}
/**
* Gift Wrapping/Jarvis March convex hull algorithm.
* Written using pseudocode seen at https://en.wikipedia.org/wiki/Gift_wrapping_algorithm
*/
var giftWrap = {
    execute : function(vertices, two) {
        pauseButton = document.getElementById("pause");
        pauseButton.disabled = false
        
        // Clear the previous hull, if it exists
        clearHull(two)
        
        var hull = []
        var hullPoint = findLeftmostPoint(vertices)
        var endpoint = null
        
        function point_step(i) {
            // Executes the loop iteration fixed from a known point on the convex hull
            hull[i] = hullPoint
            
            // Base case - we have wrapped all the way around
            if (endpoint === hull[0]) { 
                pauseButton.disabled = true
                return
            }
            
            endpoint = vertices[0]
            
            // Create the reference edge
            edge = createEdge(two, refEdgeColor, hull[i], endpoint)
            
            two.bind('update', function(frameCount) {
                if (edge.scale < 0.9999) {
                 edge.scale=1;
                } else {
                    two.unbind('update')
                    iter_step(edge, 1, i)
                }
            }).play();
        }
        
        function iter_step(edge, j, i) {
            // Base  case - go back to point step
            if (j == vertices.length) {
                hullPoint = endpoint
                edge.stroke = hullEdgeColor
                point_step(i + 1)
                
                return
            }
            
            // Iterates over all vertices, trying to find the next known convex hull point
            vertex = vertices[j]
            
            // Create the candidate edge
            edge2 = createEdge(two, checkEdgeColor, hull[i], vertex)
            
            two.bind('update', function(frameCount) {
                if (edge2.scale < 0.9999) {
                    var t = (1 - edge2.scale) * getSpeed();
                    edge2.scale += t;
                } else {
                    two.unbind('update')
                    if ((endpoint === hullPoint) || (leftTurn(hullPoint, endpoint, vertex))) {
                        // Point is to the left of reference line
                        endpoint = vertex
                        two.remove(edge)
                        edge2.stroke = refEdgeColor
                        iter_step(edge2, j + 1, i)
                    } else {
                        // Point is to the right of or colinear to the reference line
                        two.remove(edge2)
                        iter_step(edge, j + 1, i)
                    }
                }
            }).play();
        }
        
        point_step(0)
    }
}

document.querySelector('.play-btn').addEventListener('click', function() {
    this.classList.toggle('paused');
    // Toggle between "Play" and "Pause" text
    if (this.classList.contains('paused')) {
        this.querySelector('span').innerText = 'Pause';
    } else {
        this.querySelector('span').innerText = 'Play';
    }
});
