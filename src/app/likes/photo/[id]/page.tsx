import PhotoDetail from '@/components/photoDetail/PhotoDetail';

type PropType = {
  params: { id: string; photoId: string };
};

const LikesPhoto = ({ params }: PropType) => {
  return <PhotoDetail params={params} />;
};

export default LikesPhoto;
