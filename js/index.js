function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function drawBackgroundImage(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const img = document.getElementById('salt-bae');  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function getRandomImageSize(min, max, width, height) {
  const ratio = width / height;  // Used for aspect ratio
  width = getRandomInt(min, max);
  height = width / ratio;  
  return { width, height };
}

function drawSalt(src, canvas, ctx) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  image.src = src;
  
  // After the image has loaded, draw it to the canvas
   image.onload = function() {
    for (let i = 0; i < 8; i++) {
      const randomX = getRandomInt(10, canvas.width/2);
      const randomY = getRandomInt(canvas.height-300, canvas.height);
      const dimensions = getRandomImageSize(20, 100, image.width, image.height);
      ctx.drawImage(image, randomX, randomY, dimensions.width, dimensions.height);
    }
  }
 image.setAttribute('crossOrigin', 'anonymous'); 
  return image;
}

function updateImage(file, img){
  img.src = URL.createObjectURL(file);
}

function updateImageSrc(url, img){
  img.src = url;
}

function addLink() {
  var link = document.createElement('a');
  link.innerHTML = 'Download!';
  link.addEventListener('click', function(e) {
    link.href = canvas.toDataURL();
    link.download = "salt-bae.png";
  }, false); 
  link.className = "instruction";
  document.querySelectorAll('section')[1].appendChild(link);
}

onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  drawBackgroundImage(canvas, ctx);
  const saltImage = drawSalt('/images/voltage_emoji_icon_png_hwdaps.png', canvas, ctx);
const input = document.querySelector("input[type='file']");
  /*
   * Add event listener to the input to listen for changes to its selected
   * value, i.e when files are selected 
   */
  input.addEventListener('change', function() {
    drawBackgroundImage(canvas, ctx);
    updateImage(this.files[0], saltImage);
  });
  
  addLink();
  
  const imgs = document.querySelector('.image-options');
  imgs.addEventListener('click', function(e) {
    drawBackgroundImage(canvas, ctx);
    let target = e.target;
    updateImageSrc(target.src, saltImage);
  });
};