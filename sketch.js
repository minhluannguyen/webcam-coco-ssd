let detector;
let detection;
let video;
let detectItems = [];

function preload() {
  detector = ml5.objectDetector("cocossd", onModelReady);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detection = detector.detect(video, gotResults);
}

function draw() {
  image(video, 0, 0);
  displayResult();
}

function onModelReady() {
  console.log("Model ready!!!");
  isLoaded = true;
  
}

function gotResults(error, data) {
  if (error) {
    console.error(error);
  }
  //console.log(data);
  if (data)
    detectItems = data;
  else
    detectItems = [];

  detector.detect(video, gotResults);
}

function displayResult() {
  for (let i = 0; i < detectItems.length; i++) {
    const element = detectItems[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(element.x, element.y, element.width, element.height);
  
    textSize(20);
    noStroke();
    let displayLabel = `${element.label} - ${Math.round(element.confidence * 100 * 100) / 100}%`;
    let w = textWidth(displayLabel);
    fill(50);
    rect(element.x + 10, element.y + 4, w, 18);
    fill(255);
    text(displayLabel, element.x + 10, element.y + 20);
  }
}
  