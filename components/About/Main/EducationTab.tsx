import dynamic from "next/dynamic";

const EducationListClient = dynamic(() => import("./EducationClient"), {
  ssr: false,
});

const EducationTab = () => {
  return (
    <div>
      <EducationListClient />
    </div>
  );
};

export default EducationTab;
