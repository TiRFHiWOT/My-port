import Testimonial from "./Output";

const TestimonialList = ({ testimonials, handleEdit, handleRemove }: any) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-400 mb-4">
      {testimonials.length > 0 ? "" : "No Testimonials Available"}
    </h3>

    {testimonials.length > 0
      ? testimonials.map((testimonial: any) => (
          <Testimonial
            key={testimonial.id}
            testimonial={testimonial}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        ))
      : ""}
  </div>
);

export default TestimonialList;
