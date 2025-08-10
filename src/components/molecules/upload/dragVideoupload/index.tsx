import Box, { IBox } from '@/components/atoms/box';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import React, { memo, useState } from 'react';
import styles from '../dragVideoupload/dragVideoUpload.module.css';
import ImageDeleteIcon from '@/components/atoms/icons/services/image-delete-icon';
import UploadVideoIcon from '@/components/atoms/icons/uploadVideoIcon';
import { useTranslations } from 'next-intl';

interface IDragVideoUpload extends IBox {
  props?: any;
  setVideoImages?: any;
  videoImages?: any;
  maxLimit?: number;
  viewVideoImages?: any;
  handleDelete: (key: any, type: string) => void;
}

const validateVideo: any = (file: File | undefined) => {
  if (!file) {
    return [false, 'No file provided'];
  }

  if (!file.type.startsWith('video/')) {
    console.error();
    return [false, 'Invalid file type. Please provide a video file.'];
  }

  // Check video duration (in seconds)
  const maxDuration = 10;
  const minDuration = 1;
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);

  return new Promise((resolve) => {
    video.onloadedmetadata = function () {
      const duration = Math.round(video.duration);
      if (duration < minDuration || duration > maxDuration) {
        resolve([false, `Invalid video duration. Must be between ${minDuration} and ${maxDuration} seconds.`]);
      } else {
        const maxSize = 5;
        if (file.size > maxSize * 1024 * 1024) {
          resolve([false, `Invalid video size. Must be less than ${maxSize} MB.`]);
        } else {
          resolve([true]);
        }
      }
    };

    video.onerror = function () {
      resolve([false, 'Error loading video.']);
    };
  });
};

interface ViewVideoCardProps {
  videoImages?: any;
  viewVideoImages?: any;
  handleDelete?: (key: any, type: string) => void;
}

export const ViewVideoCard = ({ viewVideoImages = [], videoImages = [], handleDelete }: ViewVideoCardProps) => (
  <Box className={styles.uploadImagesContainer}>
    {viewVideoImages?.map((image: any, key: number) => {
      return (
        <Box key={key} className={styles.relative}>
          <Box className={styles.relative}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {typeof image !== 'string' ? (
              <video className={styles.image} autoPlay controls muted>
                <source src={image} />
              </video>
            ) : (
              <video src={image} className={styles.image} autoPlay controls muted />
            )}
          </Box>
          <Box className={styles.imageKey}>{key + 1}</Box>
          {handleDelete && (
            <Box
              className={styles.deleteImage}
              onClick={() => {
                handleDelete(key, 'View');
              }}
            >
              <ImageDeleteIcon />
            </Box>
          )}
        </Box>
      );
    })}
    {videoImages?.map((image: any, key: number) => {
      return (
        <Box key={key} className={styles.relative}>
          <Box className={styles.relative}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <video src={URL.createObjectURL(image)} className={styles.image} autoPlay controls muted />
          </Box>
          <Box className={styles.imageKey}>{viewVideoImages.length + key + 1}</Box>
          {handleDelete && (
            <Box
              className={styles.deleteImage}
              onClick={() => {
                handleDelete(key, 'Image');
              }}
            >
              <ImageDeleteIcon />
            </Box>
          )}
        </Box>
      );
    })}
  </Box>
);
const DragVideoUpload = ({
  props,
  viewVideoImages,
  setVideoImages,
  videoImages,
  maxLimit,
  handleDelete,
}: IDragVideoUpload) => {
  const t = useTranslations('profile');

  const [highlighted, setHighlighted] = useState(false);

  const handleFiles = async (files: FileList | any) => {
    const allowedTypes = ['video/mp4', 'image/mov'];

    if (files && files.length > 0) {
      const videos = [];
      for (let i = 0; i < files.length; i++) {
        if (viewVideoImages.length + videoImages.length + i > (maxLimit || 2)) {
          break;
        }
        const file = files[i];
        if (allowedTypes.includes(file.type)) {
          const [isVaild, message] = await validateVideo(file);
          if (isVaild) {
            videos.push(file);
          } else {
            console.log('Video uploading error: ', message);
          }
        } else {
          console.log('Error');
        }
      }
      setVideoImages([...videoImages, ...videos]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setHighlighted(true);
    } else if (e.type === 'dragleave') {
      setHighlighted(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlighted(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <>
      <Box id="drop-area" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
        {viewVideoImages.length + videoImages.length < (maxLimit || 2) && (
          <Box
            p="24px 0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={highlighted ? '1px dashed red' : '1px dashed #CCC'}
            borderRadius={3}
            minWidth={311}
            maxWidth="552px"
            gap="10px"
            {...props}
          >
            <Input
              type="file"
              id="fileElemVideo"
              inputProps={{ accept: 'video/mp4, video/mov', multiple: true }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target) {
                  handleFiles(e.target.files);
                }
              }}
              sx={{ display: 'none' }}
            />
            <label htmlFor="fileElemVideo">
              <Box display="flex" flexDirection="column" gap="10px" alignItems="center" className={styles.displayBox}>
                <UploadVideoIcon />
                <Typography variant="body2" className="upload-text">
                  {t('mediaUploadStep.uploadVideoHeader')}
                </Typography>
                <Typography variant="caption" component="span">
                  {t('mediaUploadStep.videoSupportedFormat')}
                </Typography>
              </Box>
            </label>
          </Box>
        )}
        <ViewVideoCard viewVideoImages={viewVideoImages} videoImages={videoImages} handleDelete={handleDelete} />
      </Box>
    </>
  );
};

export default memo(DragVideoUpload);
