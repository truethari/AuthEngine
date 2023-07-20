import FormCard from "@/components/services/google/formCard";
import ContentCard from "@/components/services/google/contentCard";

export const metadata = {
  title: "Google | AuthEngine",
  description:
    "Secure and Seamless Authentication: Generate Google Tokens with Ease. Learn how to effortlessly generate and manage secure tokens for Google services with our streamlined token generation solution. Enhance your application's security and integration possibilities today.",
};

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
