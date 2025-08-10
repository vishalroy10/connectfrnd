import Box, { IBox } from '@/components/atoms/box';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import React, { memo, useState } from 'react';
import styles from '../dragupload/dragUpload.module.css';
import ImageDeleteIcon from '@/components/atoms/icons/services/image-delete-icon';
import { Grid } from '@mui/material';
import UploadIcon from '@/components/atoms/icons/uploadIcon';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Image = any;
type SetImagesFunction = React.Dispatch<React.SetStateAction<Image[]>>;

interface IDragUpload extends IBox {
  setImage?: (arg: File | undefined) => void;
  setImages?: SetImagesFunction;
  icon?: React.ReactNode;
  isImageViewAuto?: boolean;
  name?: string;
  images?: any[];
  fromSteps?: boolean;
  multiple?: boolean;
  viewImages?: any;
  handleDelete?: any;
  maxLimit?: number;
  setViewImages?: any;
}

interface ViewImagesProps {
  images?: any[];
  viewImages?: any[];
  handleDelete?: any;
}

export const ViewImagesCard = ({ viewImages = [], images = [], handleDelete }: ViewImagesProps) => (
  <Box className={styles.uploadImagesContainer}>
    <Grid container spacing={2}>
      {viewImages?.map((image: any, key: number) => {
        return (
          <Grid key={key} item xs={4} md={2} lg={2}>
            <Box key={key} className={styles.relative}>
              <Box className={styles.relative}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image alt="img" src={image} className={styles.image} />
              </Box>
              <Box className={styles.imageKey}>{key + 1}</Box>
              {handleDelete && (
                <Box
                  className={styles.deleteImage}
                  onClick={() => {
                    handleDelete(key, 'view');
                  }}
                >
                  <ImageDeleteIcon />
                </Box>
              )}
            </Box>
          </Grid>
        );
      })}
      {images?.map((image: any, key: number) => {
        return (
          <Grid key={key} item xs={4} md={2} lg={2}>
            <Box key={key} className={styles.relative}>
              <Box className={styles.relative}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image alt="img" src={URL.createObjectURL(image)} className={styles.image} />
              </Box>
              <Box className={styles.imageKey}>{viewImages?.length + key + 1}</Box>
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
          </Grid>
        );
      })}
    </Grid>
  </Box>
);

const DragUpload = ({
  setImages,
  images = [],
  icon = <UploadIcon />,
  isImageViewAuto = true,
  name = 'fileId',
  fromSteps = false,
  multiple = false,
  viewImages,
  handleDelete = () => {},
  maxLimit,
  ...props
}: IDragUpload) => {
  const t = useTranslations('profile');

  const [highlighted, setHighlighted] = useState(false);

  const handleFiles = (files: FileList | any) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (isImageViewAuto) {
      const dropArea = document.getElementById('drop-area');

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.readAsDataURL(file);
        reader.onloadend = function () {
          const img = document.createElement('img');
          img.src = reader.result as string;
          img.className = 'image';
          img.width = 200;

          if (dropArea) {
            dropArea.appendChild(img);
          }
        };
      }
    }
    if (fromSteps) {
      const previews: any[] = [];
      const tempImages: any[] = [];
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          if (viewImages.length + images.length + i >= (maxLimit || 6)) {
            break;
          }
          const file = files[i];
          if (allowedTypes.includes(file.type)) {
            previews.push(URL.createObjectURL(file));
            tempImages.push(file);
          } else {
            console.error('File type not supported');
          }
        }

        if (setImages) setImages((prevImages) => [...prevImages, ...tempImages]);
      }
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
    if (e.dataTransfer.files && e.dataTransfer.files?.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <Box id="drop-area" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
      {images.length + viewImages?.length < (maxLimit || 6) && (
        <Box
          p="24px 0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={highlighted ? '1px dashed red' : '1px dashed #CCC'}
          borderRadius={3}
          minWidth={200}
          gap="10px"
          {...props}
        >
          <Input
            type="file"
            id={name}
            inputProps={{ accept: 'image/jpg, image/jpeg, image/png', multiple: multiple }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              if (e?.target?.files && e?.target?.files?.length > 0) {
                handleFiles(e.target.files);
              }
            }}
            sx={{ display: 'none' }}
          />
          <label htmlFor={name}>
            <Box display="flex" flexDirection="column" gap="10px" alignItems="center">
              {icon}
              <Typography variant="subtitle2" className="upload-text">
                {t('mediaUploadStep.uploadBoxHeader')}
              </Typography>
              <Typography variant="caption" component="span">
                {t('mediaUploadStep.imageSupportedFormat')}
              </Typography>
            </Box>
          </label>
        </Box>
      )}
      {fromSteps && <ViewImagesCard viewImages={viewImages} images={images} handleDelete={handleDelete} />}
    </Box>
  );
};

export default memo(DragUpload);
