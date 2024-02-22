import links from "@/constants/links";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className='not-found-section'>
      <div className='container'>
        <div className='not-found-section-inner'>
          <h2>404</h2>
          <p>Page you're trying to access does not exist</p>
          <Link to={links.home}>Return to Home</Link>
        </div>
      </div>
    </section>
  );
}
