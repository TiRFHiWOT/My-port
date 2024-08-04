import { motion } from "framer-motion";

const achievementList = [
  {
    metric: "Projects",
    Value: "100+",
  },
  {
    metric: "Clients",
    Value: "50+",
  },
  {
    metric: "Years",
    Value: "5+",
  },
];

const Achievement = () => {
  return (
    <div className=" absolute bottom-0 w-full h-fit py-6 lg:mb-6 sm:py-8 lg:px-16">
      <div className=" border border-[#3341557e] rounded-lg py-2 px-16 flex flex-row items-center justify-between">
        {achievementList.map((achievement, index) => {
          return (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 1 }}
              whileInView={{ y: 1, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center shadow-md items-center px-3 pb-2 pt-3 w-24 rounded rounded-t-3xl"
            >
              <h1 className=" text-white text-2xl lg:text-4xl font-bold">
                {achievement.Value}
              </h1>
              <p className=" text-slate-500 text-base">{achievement.metric}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievement;
