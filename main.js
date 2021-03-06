song1="";
song2="";
song1status="";
song2status="";
rwristX=0;
rwristY=0;
lwristX=0;
lwristY=0;
scoreRwrist=0;
scoreLwrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded(){
  console.log('posenet is initialized');
}
function draw(){
  image(video,0,0,600,500);
  fill("#FF0000");
  stroke("#FF0000");
  song1status=song1.isPlaying();
  song2status=song2.isPlaying();
  if(scoreRwrist>0.1){
   circle(rwristX,rwristY,20);
   song1.stop();
   if(song2status==false){
     song2.play();
     document.getElementById("speed").innerHTML="Count On Me.mp3";
   }
  }
  if(scoreLwrist>0.1){
    circle(lwristX,lwristY,20);
    song2.stop();
    if(song1status==false){
      song1.play();
      document.getElementById("speed").innerHTML="Mackenzie Ziegler - Breathe (Official Music Video).mp3";
    }
   }
}
function preload(){
  song1=loadSound("Mackenzie Ziegler - Breathe (Official Music Video).mp3");
  song2=loadSound("Count On Me.mp3");
}
function gotPoses(results){
  if(results.length>0){
    console.log(results);
    lwristX=results[0].pose.leftWrist.x;
    lwristY=results[0].pose.leftWrist.y;
    rwristX=results[0].pose.rightWrist.x;
    rwristY=results[0].pose.rightWrist.y;
    scoreRwrist=results[0].pose.keypoints[10].score;
    scoreLwrist=results[0].pose.keypoints[9].score;
    console.log("scoreRwrist= "+scoreRwrist+"scoreLwrist= "+scoreLwrist);
    console.log("leftWristX= "+lwristX+"leftWristY= "+lwristY);
    console.log("rightWristX= "+rwristX+"rightWristY= "+rwristY);
  }
}
function play(){
  song1.play();
  song2.play();
  song1.setVolume(1);
  song2.setVolume(1);
}
