const video = document.querySelector("#clip-video");
const masks = document.querySelectorAll(".mask-box");

function drawClipped(ctx, video, rect) {
  // Calculate aspect ratios
  const videoAspect = video.videoWidth / video.videoHeight;
  const canvasAspect = rect.width / rect.height;
  
  let sx, sy, sWidth, sHeight;
  
  if (videoAspect > canvasAspect) {
    // Video is wider - clip horizontally
    sHeight = video.videoHeight;
    sWidth = video.videoHeight * canvasAspect;
    sx = (video.videoWidth - sWidth) / 2;
    sy = 0;
  } else {
    // Video is taller - clip vertically
    sWidth = video.videoWidth;
    sHeight = video.videoWidth / canvasAspect;
    sx = 0;
    sy = (video.videoHeight - sHeight) / 2;
  }
  
  // Calculate the portion of the video to show based on mask position
  const scaleX = video.videoWidth / window.innerWidth;
  const scaleY = video.videoHeight / window.innerHeight;
  
  const sourceX = rect.left * scaleX;
  const sourceY = rect.top * scaleY;
  const sourceWidth = rect.width * scaleX;
  const sourceHeight = rect.height * scaleY;
  
  ctx.drawImage(
    video,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    rect.width,
    rect.height
  );
}

function draw() {
  masks.forEach((mask) => {
    const canvas = mask.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const rect = mask.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    drawClipped(ctx, video, rect);
  });

  requestAnimationFrame(draw);
}

video.addEventListener("loadeddata", ()=>{
  video.play();
  draw();
});

masks.forEach(mask=>{
  let isDragging = false;
  let offsetX, offsetY;

  mask.addEventListener("mousedown", e=>{
    isDragging = true;
    mask.style.cursor = "grabbing";
    offsetX = e.clientX - mask.offsetLeft;
    offsetY = e.clientY - mask.offsetTop;
  })

  document.addEventListener("mousemove", e=>{
    if (isDragging){
      mask.style.left = e.clientX - offsetX + "px";
      mask.style.top = e.clientY - offsetY + "px";
    }
  })

  document.addEventListener("mouseup", e=>{
    isDragging = false;
    mask.style.cursor = "grab";
  })

})
