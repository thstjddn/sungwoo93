  var errorCallback = function(e) {
    console.log('Rejected!', e);
  };

  // Not showing vendor prefixes.
  navigator.getUserMedia({video: true}, function(localMediaStream) {
    var video = document.querySelector('#VideoElement');

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
    };
  }, errorCallback);


  