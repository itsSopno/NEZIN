const video = document.querySelector("#clip-video");
const masks = document.querySelectorAll(".mask-box");



function drawClipped(ctx, video, rect) {
  // Calculate aspect ratios
  const videoAspect = video.videoWidth / video.videoHeight;
  const windowAspect = window.innerWidth / window.innerHeight;
  
  // Calculate how the video would be displayed to cover the entire window
  let displayWidth, displayHeight, displayX, displayY;
  
  if (videoAspect > windowAspect) {
    // Video is wider - fit to height, center horizontally
    displayHeight = window.innerHeight;
    displayWidth = displayHeight * videoAspect;
    displayX = (window.innerWidth - displayWidth) / 2;
    displayY = 0;
  } else {
    // Video is taller - fit to width, center vertically
    displayWidth = window.innerWidth;
    displayHeight = displayWidth / videoAspect;
    displayX = 0;
    displayY = (window.innerHeight - displayHeight) / 2;
  }
  
  // Calculate the scale factor between video dimensions and display dimensions
  const scaleX = video.videoWidth / displayWidth;
  const scaleY = video.videoHeight / displayHeight;
  
  // Calculate which portion of the video corresponds to the mask position
  const sourceX = (rect.left - displayX) * scaleX;
  const sourceY = (rect.top - displayY) * scaleY;
  const sourceWidth = rect.width * scaleX;
  const sourceHeight = rect.height * scaleY;
  
  // Draw the corresponding portion of the video to the canvas
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
