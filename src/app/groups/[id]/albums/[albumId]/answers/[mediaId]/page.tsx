import { AnswerView } from './_components/answer-view';

type Props = {
  params: { id: string; albumId: string; mediaId: string };
};

const page = async ({ params }: Props) => {
  const { id: groupId, albumId, mediaId } = params;

  return <AnswerView groupId={groupId} albumId={albumId} mediaId={mediaId} />;
};

export default page;
