import Chip from "@/public/images/Chip";
import Lemonade from "@/public/images/Lemonade";
import Image from "next/image";

export const categories = [
  { name: "all", icon: <span>All</span> },
  {
    name: "cook",
    icon: (
      <Image width={52} height={52} src="/images/breakfast.svg" alt="식품" />
    ),
  },
  {
    name: "icecream",
    icon: (
      <Image
        width={52}
        height={52}
        src="/images/icecream.svg"
        alt="아이스크림"
      />
    ),
  },
  {
    name: "snack",
    icon: <Chip />,
  },
  {
    name: "juice",
    icon: <Lemonade />,
  },
  {
    name: "soap",
    icon: (
      <Image width={52} height={52} src="/images/soap.svg" alt="목욕용품" />
    ),
  },
  {
    name: "tissue",
    icon: (
      <Image width={52} height={52} src="/images/tissue.svg" alt="생필품" />
    ),
  },
  {
    name: "candy",
    icon: <Image width={52} height={52} src="/images/candy.svg" alt="사탕" />,
  },
  {
    name: "etc",
    icon: <span>기타</span>,
  },
];
export const events = ["all", "onePlus", "twoPlus", "etc"];
