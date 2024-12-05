import Image from 'next/image';
import Link from 'next/link';

const albums = () => {
  return (
    <div>
      <main className="w-full">
        <section className="flex flex-col mx-auto w-fit pt-[102px]">
          <Link href="/albums/123">
            <div className="w-fit mb-[31px] cursor-pointer">
              <p className="font-semibold text-[24px] w-fit">앨범</p>
              <div className="w-[359px] h-[260px] relative">
                <Image
                  src="/images/example.png"
                  alt="앨범"
                  fill={true}
                  style={{ objectFit: 'fill' }}
                  className="rounded-[10px]"
                />
              </div>
            </div>
          </Link>
          <div className="w-fit mb-[31px] cursor-pointer">
            <p className="font-semibold text-[24px] w-fit">앨범</p>
            <div className="w-[359px] h-[260px] relative">
              <Image
                src="/images/example.png"
                alt="앨범"
                fill={true}
                style={{ objectFit: 'fill' }}
                className="rounded-[10px]"
              />
            </div>
          </div>
          <div className="w-fit mb-[31px] cursor-pointer">
            <p className="font-semibold text-[24px] w-fit">앨범</p>
            <div className="w-[359px] h-[260px] relative">
              <Image
                src="/images/example.png"
                alt="앨범"
                fill={true}
                style={{ objectFit: 'fill' }}
                className="rounded-[10px]"
              />
            </div>
          </div>
          <div className="w-fit mb-[31px] cursor-pointer">
            <p className="font-semibold text-[24px] w-fit">앨범</p>
            <div className="w-[359px] h-[260px] relative">
              <Image
                src="/images/example.png"
                alt="앨범"
                fill={true}
                style={{ objectFit: 'fill' }}
                className="rounded-[10px]"
              />
            </div>
          </div>
          <div className="w-fit mb-[31px] cursor-pointer">
            <p className="font-semibold text-[24px] w-fit">앨범</p>
            <div className="w-[359px] h-[260px] relative">
              <Image
                src="/images/example.png"
                alt="앨범"
                fill={true}
                style={{ objectFit: 'fill' }}
                className="rounded-[10px]"
              />
            </div>
          </div>
          <div className="w-fit mb-[131px] cursor-pointer">
            <p className="font-semibold text-[24px] w-fit">앨범</p>
            <div className="w-[359px] h-[260px] relative">
              <Image
                src="/images/example.png"
                alt="앨범"
                fill={true}
                style={{ objectFit: 'fill' }}
                className="rounded-[10px]"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default albums;
