// utils/cropImage.js
export default async function getCroppedImg(imageSrc, crop) {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return canvas.toDataURL("image/jpeg");
  }
  
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
  