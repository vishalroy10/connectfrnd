import Box from '@/components/atoms/box';
import Button from '@/components/atoms/button';
import Typography from '@/components/atoms/typography';
import Dialog from '@/components/molecules/dialogs';
// import { lockChat } from '@/utility/CloudFunctionTrigger';
import React, { memo } from 'react';

interface IBlockUnblockChatDialog {
  isOpen: boolean;
  myBlock: boolean;
  onCloseHandler: () => void;
  blockClick?: () => void;
  handleClose: () => void;
}
const BlockUnblockDialog = ({
  isOpen,
  onCloseHandler,
  blockClick,
  handleClose,
  myBlock,
  ...props
}: IBlockUnblockChatDialog) => {
  
  const onHandleBlock = () => {
    blockClick?.();
    handleClose();
    onCloseHandler();
  };
  return (
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
      open={isOpen}
      fullWidth
      {...props}
      footer={
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <Button color="primary" variant="outlined" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={onHandleBlock}>
            {myBlock ? 'Unblock' : 'Block'}
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
          Block user
        </Typography>
        <Typography color="#646464" variant="body1" component="span">
          Are you sure that you want to block user
        </Typography>
      </Box>
    </Dialog>
  );
};

export default memo(BlockUnblockDialog);
