objects=[];
status="";
function preload()
{
video = createVideo("video.mp4")
}

function setup()
{
canvas = createCanvas(500,300);
canvas.center();
video.size(300,300);
}

function draw()
{
image(video, 0,0,500,300);
if(status != "")
{
objectDetector.detect(video, gotResults);
for(i=0; i<objects.length;i++)
{
    document.getElementById("status").innerHTML="Status: Objects Detected";
    document.getElementById("object_length").innerHTML="The number of objects detected are"+objects.length;

    noFill();
    stroke("red");
    rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
    fill("red");
    percent = floor(objects[i].confindence * 100);
    text(objects[i].label+" "+percent+ "%", objects[i].x+15,objects[i].y+15);
    

}
}
}

function play()
{
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
console.log("Model is loaded");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResults(error,results)
{
if(error)
{
console.log(error);
}
else
{
console.log(results);
objects = results;
}
}