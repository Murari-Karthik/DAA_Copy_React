class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

function anticlock(least_x, q, r)
{
    let val = (q.y - least_x.y) * (r.x - q.x)-
                  (q.x - least_x.x) * (r.y - q.y);
        
        if (val >= 0) return 0;
        else return 1; 
}

function jarvis(points, n)
{
        if (n < 3) return;
        let hull = [];

        let least = 0;
        for (let i = 1; i < n; i++)
            if (points[i].x < points[least].x)
                least = i;
        
        let p = least, q;
        do
        {
            hull.push(points[p]);

            q = (p + 1) % n;
               
            for (let i = 0; i < n; i++)
            {

               if (anticlock(points[p], points[i], points[q]))
                   q = i;
            }
            p = q;
        } while (p != least);  

        for (let temp of hull.values()){
        console.log("(" + temp.x + ", " +temp.y + ")")
        }
}
let n = coordinates.length;
jarvis(coordinates, n);