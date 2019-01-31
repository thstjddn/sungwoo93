var video = document.querySelector("#videoElement");
 
if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err) {
    console.log("Something went wrong!");
  });
}

public class WebCamBridgInterface {
    public void takePicture() {
        captureImage();
    }

    public void showPictures() {
        Intent intent = new Intent(LandingActivity.this, GalleryActivity.class);
        startActivityForResult(intent, Constants.REQ_GALLERY);
    }
}

function takePicture() {
    if(typeof AndroidDevice !== "undefined"){
      AndroidDevice.takePicture();
    }
  }

  function showPictures() {
    if(typeof AndroidDevice !== "undefined"){
      AndroidDevice.showPictures();
    }
  }

  function imageData(data){
    document.getElementById('displayImage').setAttribute( 'src', 'data:image/png;base64,'+data );
    if(typeof AndroidDevice !== "undefined"){
    }
  }
  
webView.addJavascriptInterface(new WebVCamBridgeInterface (), "AndroidDevice");
