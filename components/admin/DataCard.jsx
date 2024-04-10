{
  /* <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-semibold tracking-wider text-slate-400">
              Testimonials
            </div>
            {Testimonial.map((testimonial) => (
              <div
                key={testimonial.id}
                className="my-2 p-3 flex flex-row justify-between bg-[#33415580] text-xs"
              >
                <div>
                  <div className="flex flex-row justify-between">
                    <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                      ID: {testimonial.id}
                    </h1>
                    <button
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="my-2">
                    <div className="flex flex-row justify-between my-1">
                      <h1>
                        <span className="text-sky-300">userName:</span>{" "}
                        {testimonial.userName}
                      </h1>
                      <div className="flex flex-row space-x-2">
                        <input
                          type="text"
                          className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                        />
                        <button
                          onClick={() => updateTestimonial(testimonial.id)}
                          className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                        >
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between my-1">
                      <h1>
                        <span className="text-sky-300">position:</span>{" "}
                        {testimonial.position}
                      </h1>
                      <div className="flex flex-row space-x-2">
                        <input
                          type="text"
                          className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                        />
                        <button
                          onClick={() => updateTestimonial(testimonial.id)}
                          className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                        >
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between my-1">
                      <h1>
                        <span className="text-sky-300">comment:</span>{" "}
                        {testimonial.Comment}
                      </h1>
                      <div className="flex flex-row space-x-2">
                        <input
                          type="text"
                          className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                        />
                        <button
                          onClick={() => updateTestimonial(testimonial.id)}
                          className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                        >
                          Update
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-sky-300">Image:</span>{" "}
                      {testimonial.image}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-2xl font-semibold tracking-wider text-slate-400">
              Skills
            </div>
            {Testimonial.map((Skill) => (
              <DataCard
                key={Skill.id}
                id={Skill.id}
                userName={Skill.userName}
                postion={Skill.position}
                comment={Skill.Comment}
                image={Skill.image}
                onClickDelete={Skill.deleteTestimonial}
              />
            ))}
          </div>
        </div> */
}
