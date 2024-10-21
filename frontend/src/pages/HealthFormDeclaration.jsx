import HealthFormDeclaration from "../components/HealthFormDeclaration";

export default function HealthFormDeclarationPage() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="lg:text-2xl md:text-lg sm:text-base font-semibold text-gray-800">
        Health Declaration Form
      </h2>

      <div className="md:w-2/3 sm:w-3/4">
        <HealthFormDeclaration />
      </div>
    </div>
  );
}
