/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Box from '@/components/atoms/box';
import Button from '@/components/atoms/button';
import Typography from '@/components/atoms/typography';
import DragUpload from '@/components/molecules/upload/dragupload';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { TextareaAutosize } from '@mui/material';
import styles from '@/components/page/Profile/profile.module.css';
import { REPORT, reasonKey, senderKey, timeStampKey, uidKey, urlKey } from '@/keys/firestoreKeys';
import { db, storage } from '@/credentials/firebase';
import Toast from '@/components/molecules/toast';
import Dialog from '@/components/molecules/dialogs';
import UploadIconNew from '@/components/atoms/icons/uploadIconNew';

interface IReportDialog {
  reportModalOpen: boolean;
  reportBy: string | null | undefined;
  user: string | null | undefined;
  setReportModalOpen: (arg: boolean) => void;
}

const ReportDialog = ({ reportModalOpen, reportBy, user, setReportModalOpen, ...props }: IReportDialog) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string[]>([]);
  const [openToast, setToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [backViewImages, setBackViewImages] = useState<string[]>([]);
  const onReport = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!description || !reportBy || !user) return;

    const map: { [key: string]: any } = {
      [reasonKey]: description,
      [timeStampKey]: serverTimestamp(),
      [uidKey]: user,
      [senderKey]: reportBy,
    };

    
    // if (image) {
    //   const uploadImageRef = ref(storage, `${REPORT}/${reportBy}/${new Date().getTime()}-${image.name}`);

    //   const uploadTask = await uploadBytes(uploadImageRef, image);
    //   const url = (await getDownloadURL(uploadTask.ref)) as string;

    //   map[urlKey] = url;
    // }

    try {
      await addDoc(collection(db, REPORT), map);
      setLoading(false);
      setToast(true);
      setReportModalOpen(false);
    } catch (error) {
      console.log('report error ==> ', error);
    }
  };
  const handleDeleteImage = (key: number, type: string) => {
    if (type === 'Image') {
      setImage([]);
    } else {
      setBackViewImages([]);
    }
  };

  return (
    <>
      <Dialog
        sx={{
          '.MuiPaper-root': {
            borderRadius: '24px',
          },
          '.MuiDialogContent-root': {
            padding: '24px',
          },
          '.MuiDialogActions-root': {
            padding: '24px',
          },
        }}
        open={reportModalOpen}
        {...props}
        fullWidth
        footer={
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                p: '12px 20px',
                whiteSpace: 'nowrap',
                height: 48,
              }}
              onClick={() => setReportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!description}
              loading={loading}
              sx={{
                p: '12px 20px',
                whiteSpace: 'nowrap',
                height: 48,
              }}
              onClick={onReport}
            >
              Report
            </Button>
          </Box>
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography variant="h3" fontWeight={500} color="#1A1A1A" component={'span'}>
            Report User
          </Typography>
          <Typography color="#646464" variant="body1" component="span">
            We take your feedback seriously, please write a reason why you are reporting this profile
          </Typography>
          <Typography variant="subtitle2" fontWeight={500}>
            Report description
          </Typography>
          <TextareaAutosize
            placeholder="Enter description"
            className={styles.textArea}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="subtitle2" fontWeight={500}>
            Upload file
          </Typography>
          <DragUpload
            images={image}
            setImages={setImage}
            fromSteps={true}
            multiple={true}
            isImageViewAuto={false}
            viewImages={backViewImages}
            handleDelete={handleDeleteImage}
            maxLimit={1}
            setViewImages={setBackViewImages}
            icon={<UploadIconNew />}
          />
        </Box>
      </Dialog>
      <Toast alertMessage="Reported Successfully" onClose={() => setToast(false)} open={openToast} />
    </>
  );
};

export default ReportDialog;
