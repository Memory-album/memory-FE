import Link from 'next/link';
import { Item } from './item';
import { AddGroup } from './add-group';

export const GroupList = () => {
  const groups = [
    { id: 1, name: '내 앨범' },
    { id: 2, name: '미니언즈 모임', image: '/images/example2.png' },
    { id: 3, name: '1923년 동급생들' },
    { id: 31, name: '1923년 동급생들과 함께한 나들이' },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 justify-items-center">
      {groups.map((group, index) => (
        <Link key={index} href="#">
          <Item
            name={group.name}
            image={group.image}
            classNames="size-[148px] sm:size-[180px]"
          />
        </Link>
      ))}
      <AddGroup />
    </div>
  );
};
