import Image from "next/image";

interface IProductCart {
  event: "1+1" | "2+1" | "기타";
  price: number;
  name: string;
  img: string;
}

export default function ProductCard({
  event,
  price,
  name,
  img,
  ...rest
}: IProductCart & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className="flex flex-col items-center justify-center border border-gray-100 rounded-xl overflow-hidden text-ellipsis"
    >
      <span className="text-[10px]">{event}</span>
      <Image
        className="object-cover w-16 h-16"
        width={60}
        height={60}
        src={img}
        alt={name}
        unoptimized
      />
      <span className="text-[12px] w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-center">
        {name}
      </span>
      <span className="text-[12px] w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-center">
        {price.toLocaleString()}원
      </span>
    </div>
  );
}
