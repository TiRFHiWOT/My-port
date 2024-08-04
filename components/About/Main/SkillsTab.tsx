import dynamic from "next/dynamic";

const SkillsListClient = dynamic(() => import("./SkillsClient"), {
  ssr: false,
});

const SkillsTab = () => {
  return (
    <div>
      <SkillsListClient />
    </div>
  );
};

export default SkillsTab;
