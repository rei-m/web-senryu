import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export type Props = {
  src: string;
  size?: number;
  cropSize?: number;
  onChange: (cropped: string) => void;
};

export type State = Crop;

const getCroppedImg = (
  image: HTMLImageElement,
  crop: Crop,
  fileName: string
) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width!;
  canvas.height = crop.height!;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    image,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    crop.width!,
    crop.height!
  );

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      // Exampleの通りなんだけど必要なのか謎
      (blob as any).name = fileName;
      const fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/jpeg');
  });
};

const CroppableSquareImage = ({ src, size = 300, onChange }: Props) => {
  const [state, setState] = useState<State>({
    unit: 'px',
    width: size,
    aspect: 1 / 1,
  });

  const urlHolder = useMemo<{ croppedImageUrl: string | null }>(
    () => ({
      croppedImageUrl: null,
    }),
    []
  );

  const imageRef = useRef<HTMLImageElement>();

  const handleImageLoaded = useCallback((image: HTMLImageElement) => {
    imageRef.current = image;
  }, []);

  const handleCropChange = useCallback((crop: Crop) => {
    setState(crop);
  }, []);

  const handleCropComplete = useCallback(
    async (crop: Crop) => {
      if (imageRef.current && crop.width && crop.height) {
        const croppedImageUrl = await getCroppedImg(
          imageRef.current,
          crop,
          'newFile.jpeg'
        );
        if (urlHolder.croppedImageUrl) {
          window.URL.revokeObjectURL(urlHolder.croppedImageUrl);
        }
        urlHolder.croppedImageUrl = croppedImageUrl;
        onChange(croppedImageUrl);
      }
    },
    [src, imageRef.current]
  );

  return (
    <ReactCrop
      src={src}
      crop={state}
      onImageLoaded={handleImageLoaded}
      onComplete={handleCropComplete}
      onChange={handleCropChange}
      style={{ width: size }}
      keepSelection={true}
    />
  );
};

export default CroppableSquareImage;
