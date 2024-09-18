import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchAbout, saveAbout } from "@/store/slice/aboutAdminSlice";
import AboutForm from "./form";
import Spinner from "@/components/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";

const AboutAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { about, loading, error } = useSelector(
    (state: RootState) => state.about
  );

  const [aboutData, setAboutData] = useState<{
    description: string;
    image: string;
    cv: string;
  }>({
    description: "",
    image: "",
    cv: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    if (showInputs) {
      dispatch(fetchAbout()).catch((err) => {
        toast.error("Failed to fetch About data");
      });
    }
  }, [dispatch, showInputs]);

  useEffect(() => {
    if (about) {
      setAboutData({
        description: about.description,
        image: about.image,
        cv: about.cv,
      });
    }
  }, [about]);

  const handleChange = (field: string, value: string) => {
    setAboutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (image: File) => {
    setImageFile(image);
  };

  const handleCvChange = (cvFile: File) => {
    setCvFile(cvFile);
  };

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, `about/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (image: File | null, cvFile: File | null) => {
    setIsUpdating(true);
    const storage = getStorage();
    let imageUrl = aboutData.image;
    let cvUrl = aboutData.cv;

    try {
      if (image) {
        const imageRef = ref(storage, `about/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (cvFile) {
        const cvRef = ref(storage, `about/${cvFile.name}`);
        const snapshot = await uploadBytes(cvRef, cvFile);
        cvUrl = await getDownloadURL(snapshot.ref);
      }

      const updatedAboutData = {
        ...aboutData,
        image: imageUrl,
        cv: cvUrl, // Save CV URL
      };

      await dispatch(saveAbout(updatedAboutData));
      toast.success("About information updated successfully");
    } catch (err) {
      toast.error("Failed to update about information");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">About Info</h2>
        {!showInputs && (
          <button
            onClick={() => setShowInputs(true)}
            className={`py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition ${
              showInputs ? "bg-blue-600" : ""
            }`}
          >
            Show About Info
          </button>
        )}
      </div>
      {showInputs ? (
        loading ? (
          <Spinner />
        ) : (
          <AboutForm
            aboutData={aboutData}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleCvChange={handleCvChange}
            handleSubmit={handleSubmit}
            isUpdating={isUpdating}
          />
        )
      ) : null}
      {error && <p className="text-red-500">{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default AboutAdmin;
