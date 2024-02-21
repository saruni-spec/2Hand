import "../styles.css";
import Nav from "../components/Nav";

const Feed = () => {
  return (
    <>
      <Nav />
      <div className="fullDiv">Shop Now</div>
      <div className="fullDiv">
        Our mission is to provide students and parents with affordable, reliable
        uniform solutions, ensuring comfort, style, and durability throughout
        the school year
      </div>
      <div className="dualDiv">
        <div>female</div>
        <div>male</div>
      </div>
      <div className="grid">
        <div>sweaters</div>
        <div>shirts</div>
        <div>pants</div>
        <div>shorts</div>
        <div>skirts</div>
        <div>dresses</div>
      </div>
      <div>
        <div className="fullDiv">sports wear</div>
      </div>
      <div>
        <div className="fullDiv">shoes</div>
      </div>

      <div className="fullDiv">
        Explore our wide selection today and experience hassle-free shopping for
        all your uniform needs!" Whether you're seeking brand new apparel or
        budget-friendly second-hand options, we've got you covered
      </div>

      <div className="fullDiv">social media</div>
    </>
  );
};

export default Feed;
