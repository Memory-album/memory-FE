import Link from 'next/link';
import PhotoArrangement from './_components/PhotoArrangement';

const Collection = () => {
  const collections = [
    {
      id: 1,
      title: '풍경',
      bgImages: [
        './images/1.png',
        './images/2.png',
        './images/3.png',
        './images/4.png',
        './images/5.png',
      ],
    },
    {
      id: 2,
      title: '가족',
      bgImages: [
        './images/3.png',
        './images/2.png',
        './images/1.png',
        './images/4.png',
      ],
    },
    {
      id: 3,
      title: '반려동물',
      bgImages: [
        './images/5.png',
        './images/3.png',
        './images/2.png',
        './images/4.png',
        './images/1.png',
      ],
    },
    {
      id: 4,
      title: '음식',
      bgImages: [
        './images/3.png',
        './images/2.png',
        './images/4.png',
        './images/5.png',
        './images/1.png',
      ],
    },
  ];

  return (
    <main className="ForGnbpaddingTop ForFnbmarginBottom">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/collection/${collection.title}`}>
          <PhotoArrangement
            id={collection.id}
            title={collection.title}
            bgImages={collection.bgImages}
          />
        </Link>
      ))}
    </main>
  );
};

export default Collection;
