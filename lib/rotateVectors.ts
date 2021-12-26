import {Vector3} from 'three';
import {GroupProps} from '@react-three/fiber';

// 六种转动方向向量
export const xLine = new Vector3(1, 0, 0);
export const xLineAd = new Vector3(-1, 0, 0);
export const yLine = new Vector3(0, 1, 0);
export const yLineAd = new Vector3(0, -1, 0);
export const zLine = new Vector3(0, 0, 1);
export const zLineAd = new Vector3(0, 0, -1);

// 求指定向量和最小夹角
export const getDirection = (meshGroup: GroupProps, targetVector: Vector3, normalVector: Vector3) => {
  const matrix = meshGroup.matrixWorld
  const center = new Vector3(0, 0, 0);
  const xPoint = new Vector3(1, 0, 0);
  const xPointAd = new Vector3(-1, 0, 0);
  const yPoint = new Vector3(0, 1, 0);
  const yPointAd = new Vector3(0, -1, 0);
  const zPoint = new Vector3(0, 0, 1);
  const zPointAd = new Vector3(0, 0, -1);
  if (matrix) {
    center.applyMatrix4(matrix);
    xPoint.applyMatrix4(matrix);
    xPointAd.applyMatrix4(matrix);
    yPoint.applyMatrix4(matrix);
    yPointAd.applyMatrix4(matrix);
    zPoint.applyMatrix4(matrix);
    zPointAd.applyMatrix4(matrix);

    const xAngle = targetVector.angleTo(xPoint.sub(center));
    const xAngleAd = targetVector.angleTo(xPointAd.sub(center));
    const yAngle = targetVector.angleTo(yPoint.sub(center));
    const yAngleAd = targetVector.angleTo(yPointAd.sub(center));
    const zAngle = targetVector.angleTo(zPoint.sub(center));
    const zAngleAd = targetVector.angleTo(zPointAd.sub(center));

    const minAngle = Math.min.apply(null, [xAngle, xAngleAd, yAngle, yAngleAd, zAngle, zAngleAd]);

    let direction
    
    switch (minAngle) {
      case xAngle:
        direction = 0;//向x轴正方向旋转90度（还要区分是绕z轴还是绕y轴）
        if (normalVector.equals(yLine)) {
          direction = direction + 0.1;//绕z轴顺时针
        } else if (normalVector.equals(yLineAd)) {
          direction = direction + 0.2;//绕z轴逆时针
        } else if (normalVector.equals(zLine)) {
          direction = direction + 0.3;//绕y轴逆时针
        } else {
          direction = direction + 0.4;//绕y轴顺时针
        }
        break;
      case xAngleAd:
        direction = 1;//向x轴反方向旋转90度
        if (normalVector.equals(yLine)) {
          direction = direction + 0.1;
        } else if (normalVector.equals(yLineAd)) {
          direction = direction + 0.2;
        } else if (normalVector.equals(zLine)) {
          direction = direction + 0.3;
        } else {
          direction = direction + 0.4;
        }
        break;
      case yAngle:
        direction = 2;//向y轴正方向旋转90度
        if (normalVector.equals(zLine)) {
          direction = direction + 0.1;
        } else if (normalVector.equals(zLineAd)) {
          direction = direction + 0.2;
        } else if (normalVector.equals(xLine)) {
          direction = direction + 0.3;
        } else {
          direction = direction + 0.4;
        }
        break;
      case yAngleAd:
        direction = 3;//向y轴反方向旋转90度
        if (normalVector.equals(zLine)) {
          direction = direction + 0.1;
        } else if (normalVector.equals(zLineAd)) {
          direction = direction + 0.2;
        } else if (normalVector.equals(xLine)) {
          direction = direction + 0.3;
        } else {
          direction = direction + 0.4;
        }
        break;
      case zAngle:
        direction = 4;//向z轴正方向旋转90度
        if (normalVector.equals(yLine)) {
          direction = direction + 0.1;
        } else if (normalVector.equals(yLineAd)) {
          direction = direction + 0.2;
        } else if (normalVector.equals(xLine)) {
          direction = direction + 0.3;
        } else {
          direction = direction + 0.4;
        }
        break;
      case zAngleAd:
        direction = 5;//向z轴反方向旋转90度
        if (normalVector.equals(yLine)) {
          direction = direction + 0.1;
        } else if (normalVector.equals(yLineAd)) {
          direction = direction + 0.2;
        } else if (normalVector.equals(xLine)) {
          direction = direction + 0.3;
        } else {
          direction = direction + 0.4;
        }
        break;
      default:
        break;
    }
    return direction
  } else {
    return null
  }
}