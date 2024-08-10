import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <>
      <main style={{ padding: "3%", margin: "1%" }}>
        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to offer a wide selection of high-quality
            uniforms that meet the needs of both students and parents. We
            understand the importance of clothing that lasts, which is why we
            prioritize durability without compromising on style or
            affordability.
          </p>
        </section>
        <section>
          <h2>What Sets Us Apart</h2>
          <ul>
            <li>
              <strong>Affordability:</strong> We believe that quality uniforms
              shouldn't break the bank. That's why we strive to keep our prices
              affordable without sacrificing quality.
            </li>
            <li>
              <strong>Reliability:</strong> You can count on us to deliver
              uniforms that are reliable and built to last. From the classroom
              to the playground, our clothing is designed to withstand the
              rigors of daily wear.
            </li>
            <li>
              <strong>Variety:</strong> Whether you're looking for brand new
              apparel or budget-friendly second-hand options, we've got you
              covered. With a wide selection of styles and sizes, finding the
              perfect uniform has never been easier.
            </li>
          </ul>
        </section>
        <section>
          <h2>Our Commitment to You</h2>
          <p>
            At Nuriaa, we are committed to providing an exceptional shopping
            experience for our customers. From hassle-free browsing to prompt
            delivery, we strive to exceed your expectations every step of the
            way.
          </p>
        </section>
        <section>
          <h2>Get in Touch</h2>
          <p>
            Have questions or feedback? We'd love to hear from you! Feel free to{" "}
            <a href="/contact">contact us</a> with any inquiries or comments.
            Your satisfaction is our top priority.
            <br />
            <a href="/terms">
              {" "}
              Click here to view our Terms of Service
              <FontAwesomeIcon icon={faExclamationCircle} />
            </a>
            .
          </p>
        </section>
      </main>
      <footer>
        <p>
          Thank you for choosing Nuriaa for all your uniform needs. We look
          forward to serving you!
        </p>
      </footer>
    </>
  );
};

export default About;
