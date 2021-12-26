const textureFace = (rgbaColor: string) => {
  if (process.browser) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    //画一个宽高都是256的黑色正方形
    if (context) {
      context.fillStyle = 'rgba(0,0,0,1)';
      context.fillRect(0, 0, 256, 256);
      //在内部用某颜色的16px宽的线再画一个宽高为224的圆角正方形并用改颜色填充
      context.rect(16, 16, 224, 224);
      context.lineJoin = 'round';
      context.lineWidth = 16;
      context.fillStyle = rgbaColor;
      context.strokeStyle = rgbaColor;
      context.stroke();
      context.fill();
    }
    return canvas;
  } else {
    return null;
  }
}

export default textureFace
