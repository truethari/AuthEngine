import FormCard from "@/components/drives/gdrive/formCard";
import ContentCard from "@/components/drives/gdrive/contentCard";

export default function GDrive() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex md:w-1/3 md:p-4 justify-center items-center md:min-h-screen p-2 md:ml-5">
        <FormCard />
      </div>
      <div className="flex md:w-2/3 md:p-4 justify-center items-center md:min-h-screen p-2 md:mr-5">
        <ContentCard />
      </div>
    </div>
  );
}
