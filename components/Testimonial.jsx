import TestimonialCard from "@/components/TestimonialCard";

const Testimonial = () => {
  const TestData = [
    {
      id: "1",
      userName: "@ Sara Lee",
      postion: "COO at ARX",
      comment: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, a
          corrupti ullam beatae ab saepe!
        </p>
      ),
      image: "/dd_dd.jpg",
    },
    {
      id: "2",
      userName: "@ Sara Lee",
      postion: "COO at ARX",
      comment: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, a
          corrupti ullam beatae ab saepe!
        </p>
      ),
      image: "/dd_dd.jpg",
    },
    {
      id: "3",
      userName: "@ Sara Lee",
      postion: "COO at ARX",
      comment: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, a
          corrupti ullam beatae ab saepe!
        </p>
      ),
      image: "/dd_dd.jpg",
    },
  ];

  return (
    <section>
      <div className="bg-slate-900 rounded-xl mx-8 lg:mx-24 lg:p-5 lg:my-24 bg-opacity-50">
        <p className=" text-lg md:text-xl pt-6 pb-2 tracking-wider text-gray-500 px-10">{`WHAT OTHER'S SAY`}</p>
        <h1 className="text-3xl lg:text-5xl  text-white md:text-5xl pb-6 font-bold tracking-wide px-10">
          Testimonials
        </h1>
        <div className="grid lg:grid-cols-3 gap-10 p-5 lg:p-10">
          {TestData.map((project) => (
            <TestimonialCard
              key={project.id}
              userName={project.userName}
              postion={project.postion}
              comment={project.comment}
              imgUrl={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
