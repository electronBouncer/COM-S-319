//Define an object representing a rectangle
// (Area = width * height)
const rectangle = {
    type: 'rectangle',
    width: 5,
    height: 10
};

//Define an oject representing a circle
// (Area = pi * radius^2)
const circle = {
    type: 'circle',
    radius: 7
};

console.log("Finding the are of a rectangle");
function rectangleArea(width, height) {
    return width * height;
}
    const w = prompt("Enter width: ");
    const h = prompt("Enter height: ");
    console.log("Input data >", w, h);
    rectangle.width = w;
    rectangle.height = h;
    console.log("Set values>",rectangle.width, rectangle.height);
    console.log("Get values>",rectangle.width, rectangle.height); 
    console.log("Show output >", rectangleArea(rectangle.width, rectangle.height));
    console.log("The area of the square with width " + rectangle.width + " and height " + rectangle.height + " is " + rectangleArea(rectangle.width, rectangle.height));

    console.log("Finding the are of a rectangle");
    function circleArea(radius) {
        return Math.PI * radius * radius;
    }
    const r = prompt("Enter radius: ");
    console.log("Input data >", r);
    circle.radius = r;
    console.log("Set values>",circle.radius);
    console.log("Get values>",circle.radius);
    console.log("Show output >", circleArea(circle.radius));
    console.log("The area of the circle with radius " + circle.radius + " is " + circleArea(circle.radius));
