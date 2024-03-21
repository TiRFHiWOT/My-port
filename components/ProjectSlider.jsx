import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import ProjectCard from "./ProjectCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const ProjectSlider = () => {
  return (
    <div>
      <Swiper
        breakpoints={{
          340: {
            sliderPreView: 2,
            spaceBetween: 15,
          },
          700: {
            sliderPreView: 3,
            spaceBetween: 15,
          },
        }}
        FreeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[freeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {projectData.map((items) => {
          <SwiperSlide key={item.id}>
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
};

export default ProjectSlider;
