import Box from '@/components/atoms/box';
import Profile from '@/components/page/Profile';

type PageProps = {
  params: Promise<{
    uid: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { uid } = await params;
  return (
    <Box display="flex" justifyContent="center">
      <Profile uid={uid} />
    </Box>
  );
};

export default page;
