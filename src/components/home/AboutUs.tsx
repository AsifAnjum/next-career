const AboutUs = () => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="section__title">About Us</h2>
        <p className="text-lg  text-gray-300 mb-10">
          We are a team of passionate individuals dedicated to helping you find
          the perfect job opportunities and sharing insights through our curated
          blog content. Our mission is to connect talent with opportunities and
          inspire growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-[#0c0c20] rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
            <p className="mt-4 text-gray-400">
              To bridge the gap between talent and opportunity, enabling
              personal and professional growth for everyone.
            </p>
          </div>

          <div className="p-6 bg-[#202042]  rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white">Our Values</h3>
            <p className="mt-4  text-gray-400">
              Integrity, innovation, and inclusivity are at the core of
              everything we do, ensuring lasting impact.
            </p>
          </div>

          <div className="p-6 bg-[#17171f] rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white">
              Why Choose Us?
            </h3>
            <p className="mt-4 text-gray-400">
              With a user-first approach, we deliver seamless experiences to
              help you achieve your career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
