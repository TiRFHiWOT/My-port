"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEducation } from "@/store/slice/educationSlice";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

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
    <div className="text-gray-300 p-6">
      {loading ? (
        <div className="flex justify-center items-center absolute inset-0">
          <RotatingLines width="60" strokeColor="#60a5fa" />
        </div>
      ) : education.length === 0 ? (
        <div className="text-center py-4">No education available.</div>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-4"
        >
          {education.map((item) => (
            <motion.li
              key={item.id}
              className="shadow-md hover:shadow-xl overflow-hidden border border-gray-700 bg-gray-800 rounded-xl flex flex-row transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <div className=" text-white mb-1 flex flex-col w-9/12 py-3 ps-6">
                <span className="text-xl font-semibold w-fit tracking-wider border-b-2 border-cyan-400 border-s-2 shadow-xl rounded-lg pb-1 px-2 mb-1">
                  {item.name}
                </span>
                <span className="text-gray-400 text-lg">
                  @{item.institution}
                </span>
              </div>

              <div className="flex justify-between items-center w-3/12 h-full text-gray-500 bg-slate-900">
                <span className="mx-auto">{item.year}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default EducationListClient;
