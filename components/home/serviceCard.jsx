import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceCard({ imageSrc, title, description, link }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Image className="pb-3 pt-3" src={imageSrc} width={50} height={50} alt={`${title}-logo`} />

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>

      <Link href={link} className="pt-3 pb-3">
        <div className="pt-3 pb-3">
          <Button className="w-full">Setup {title} Auth</Button>
        </div>
      </Link>
    </div>
  );
}
