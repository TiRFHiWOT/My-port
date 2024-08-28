"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEducation } from "@/store/slice/educationSlice";
import { RotatingLines } from "react-loader-spinner";

interface RootState {
  education: EducationState;
}

interface EducationItem {
  id: string;
  name: string;
  institution: string;
  year: string;
}

interface EducationState {
  education: EducationItem[];
  loading: boolean;
  error: string | null;
}

const EducationListClient = () => {
  const dispatch = useDispatch();
  const { education, loading } = useSelector(
    (state: RootState) => state.education
  );

  useEffect(() => {
    dispatch(fetchEducation() as any);
  }, [dispatch]);

  return (
    <div className="text-gray-300">
      {loading ? (
        <div className="flex justify-center items-center h-[15rem]">
          <RotatingLines width="50" />
        </div>
      ) : education.length === 0 ? (
        <div className="text-center py-4">No education available.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-2">
          {education.map((item) => (
            <div
              key={item.id}
              className="shadow-lg hover:shadow-xl py-2 mr-1 px-5 border border-[#334155] bg-gray-800 rounded-xl flex flex-col"
            >
              <div className="text-xl font-semibold">{item.name}</div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-400">{item.institution}</div>
                <div className="text-gray-400">{item.year}</div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EducationListClient;
