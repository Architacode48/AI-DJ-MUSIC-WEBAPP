function setup(){
    canvas=createCanvas(400,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

}
function draw(){
  image(video,0,0,400,350);
}