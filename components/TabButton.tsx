import { ReactNode } from "react";

interface Props {
  active: any;
  selectTab: any;
  children: any;
}
const TabButton = ({ active, selectTab, children }: Props) => {
  const buttonClasses = active
    ? "text-white border-b border-purple-500"
    : "text-gray-400";
  return (
    <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
      {children}
    </p>
  );
};

export default TabButton;
