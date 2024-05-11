import Image from "next/image";
import Link from "next/link";

const SocialNetwork: React.FC<{ src: string; href: string }> = ({
  src,
  href,
}) => {
  return (
    <Link href={href} style={{ marginLeft: "5px" }}>
      <Image src={src} width={20} height={20} alt="Picture of the author" />
    </Link>
  );
};

export { SocialNetwork };
