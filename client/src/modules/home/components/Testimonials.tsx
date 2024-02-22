import SectionHeading from "@components/SectionHeading";

export default function Testimonials() {
  return (
    <section className='testimonials-section'>
      <div className='container'>
        <div className='testimonials-inner'>
          <SectionHeading>Recommended by professionals like you</SectionHeading>
          <div className='testomonials-grid'>
            <Testimonial
              imageUrl='/images/testimonials/1.webp'
              text='Orders are very easy and everything is at hand. It makes my life
        easier. I no longer have to contact more suppliers.'
              author='Maria del Socorro, Dentist'
            />
            <Testimonial
              imageUrl='/images/testimonials/2.webp'
              text='I love your service. Very good products, good service.'
              author='Juanita Chávez, Client'
            />{" "}
            <Testimonial
              imageUrl='/images/testimonials/3.webp'
              text='We registered on many pages but Jelt responded to us very efficiently. They were very attentive to us. They were super punctual with deliveries.'
              author='Andrea Suarez, Juan N. Corpas University'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type TestimonialProps = {
  imageUrl: string;
  text: string;
  author: string;
};

function Testimonial({ imageUrl, text, author }: TestimonialProps) {
  return (
    <div className='testimonial'>
      <div className='testimonial-media'>
        <img src={imageUrl} />
      </div>
      <p className='testimonial-text'>"{text}"</p>
      <div className='testimonial-author'>{author}</div>
    </div>
  );
}
