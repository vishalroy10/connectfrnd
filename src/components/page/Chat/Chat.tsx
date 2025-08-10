'use client';
import React from 'react';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@/components/atoms/icons/arrowForwardIcon';
import ArrowBackwardIcon from '@/components/atoms/icons/arrowBackwardIcon';
import Box from '@/components/atoms/box';
import EmptyBoxIcon from '@/components/atoms/icons/emptyBoxIcon';
import FolderDocumentIcon from '@/components/atoms/icons/folderDocumentIcon';
import LoadingIcon from '@/components/atoms/icons/loading';
import ChatMessageIcon from '@/components/atoms/icons/chatMessageIcon';
import Tabs from '@/components/atoms/tabs';
import EmptyData from '@/components/molecules/EmptyData';
import useChatHook from './useChatHook';
import ChatBox from './components/ChatBox';
import styles from './chat.module.css';

interface IChat {
  onDrawerClose?: () => void;
}

const ChatDialog = ({ onDrawerClose }: IChat) => {
  const {
    isMobile,
    isTablet,
    tabsData,
    dataConversation,
    errorChat,
    loadingChat,
    errorArchive,
    dataArchive,
    loadingArchive,
    chatUUID,
    activeTab,
    setActiveTab,
    router,
  } = useChatHook();

  if (loadingChat || errorChat || loadingArchive || errorArchive) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          minWidth: isMobile ? '100%' : '600px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ justifyContent: 'center' }}>
          <LoadingIcon />
        </Box>
      </Box>
    );
  }

  if (!(dataConversation as any)?.size && !(dataArchive as any)?.size) {
    return (
      <Box
        sx={{
          height: '100%',
          width: isMobile ? '100%' : '600px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box className={styles.backArrowHeader}>
          <IconButton
            // className={styles.backArrowButton}
            onClick={() => (onDrawerClose ? onDrawerClose() : '')}
            sx={{
              transform: 'scaleX(-1)',
            }}
          >
            {isMobile || isTablet ? <ArrowBackwardIcon /> : <ArrowForwardIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: '1 0 0',
            display: 'flex',
            maxWidth: '600px',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <EmptyData icon={<EmptyBoxIcon />} msg="You have no messages yet" />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={styles.chatSection}>
      <Box className={styles.userListSection}>
        <Box className={styles.backArrowHeader}>
          <Box
            className={styles.backArrowButton}
            onClick={() => (onDrawerClose ? onDrawerClose() : (router as any)?.back())}
          >
            {isMobile || isTablet ? <ArrowBackwardIcon /> : <ArrowForwardIcon />}
          </Box>
        </Box>
        {dataConversation && (
          <Box className={styles.userList}>
            <Box>
              <Tabs
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                onTabChange={(e: number | undefined) => setActiveTab(e || 0)}
                tabBottomPadding={4}
                mainClass={'main_tabs'}
                tabsData={tabsData}
              />
            </Box>
          </Box>
        )}
      </Box>
      {!isMobile &&
        (activeTab ? (
          <Box className={styles.chatBoxSection}>
            <Box height="80%" width="100%" minWidth="600px" display="flex" justifyContent="center" alignItems="center">
              <EmptyData icon={<FolderDocumentIcon />} msg="To read a conversation,<br/>please first retrieve it" />
            </Box>
          </Box>
        ) : (
          dataConversation && (
            <Box className={styles.chatBoxSection}>
              {chatUUID ? (
                <ChatBox loading={loadingChat} />
              ) : (
                <Box
                  height="80%"
                  width="100%"
                  minWidth="600px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <EmptyData icon={<ChatMessageIcon />} msg="Please select a conversation <br/>to view messages" />
                </Box>
              )}
            </Box>
          )
        ))}

      {/* <ReactWindowList
            height={size?.height - 56}
            width={calculateSideBarWidth()}
            hasNextPage={dataHasNextPage}
            dataSize={dataConversation?.length as number}
            loadNextPage={() => loadNextPage()}
            component={Row}
            itemSize={73}
          /> */}

      {/* {selectedUser?.nickname && selectedUser?.uid && (
          <SendTipDialog chatRoomId={conversation!.id} open={open} onClose={() => setOpen(false)} />
        )}

        <RejectCancelDialog
          data={openRejectCancelDialog as CancelRejectProps | null}
          open={!!openRejectCancelDialog}
          onClose={() => setRejectCancelDialog(false)}
        />

        {openGovDialog && (
          <GovDialog
            open={openGovDialog}
            onClose={() => setGovDialog(false)}
            myUID={uid}
            verified={isVerified}
            rejectedReasonAfter={rejectedReasonAfter}
          />
        )} */}
    </Box>
  );
};

export default ChatDialog;
