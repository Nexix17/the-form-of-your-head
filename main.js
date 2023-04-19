function setup() 
{
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
}

function modelLoad ()
{
  console.log('Model Load');
}

function draw ()
{
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}

var previous_result='';

function gotResult ()
{
  if (error)
  {
    console.error(error);
  }
  else
  {
    if ((results[0].confidences>0.5)&&(previous_result !=results[0].label))
    {
      console.log(results);
      previous_result=results[0].label;
      var synth =window.speechSynthesis;
      speak_data="object detected is " + results[0].label;
      var utterThis =new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML=results[0].label;
      document.getElementById("result_object_accuracy").innerHTML=results[0].confidences.toFixed(3);
    }
  }
}