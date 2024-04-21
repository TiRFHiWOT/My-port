import { motion } from "framer-motion";

const PrivateCard = ({
  title,
  description,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  imgFive,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className="group border-2 lg:rounded-3xl md:rounded-2xl rounded-xl overflow-hidden border-[#33415579] text-white transform translate duration-300"
    >
      <div className="relative h-52 md:h-72 group">
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] z-40"
          style={{ background: `url(${imgOne})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[2s] z-30"
          style={{ background: `url(${imgTwo})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[4s] z-20"
          style={{ background: `url(${imgThree})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[6s] z-10"
          style={{ background: `url(${imgFour})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{ background: `url(${imgFive})`, backgroundSize: "cover" }}
        ></div>
      </div>
      <div className="bg-[#11161d] px-3 pb-3 pt-2 flex flex-row justify-between">
        <div>
          <h1 className="text-lg font-semibold mb-2 border-l-4 border-yellow-300 pl-2">
            {title}
          </h1>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <div className="hidden group-hover:flex text-cyan-400">
          <h1>PRIVATE</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivateCard;
