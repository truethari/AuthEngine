import ServiceCard from "@/components/home/serviceCard";

export default function Home() {
  return (
    <div style={{ marginTop: "100px" }}>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 p-5 pt-0">
        <ServiceCard
          imageSrc="/images/services/google-logo-9808.png"
          title="Google"
          description="The Google APIs Explorer is a tool available on most REST API method documentation pages that lets you try Google API methods without writing code."
          link="/google"
        />
      </div>
    </div>
  );
}
