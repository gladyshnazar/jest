import links from "@/constants/links";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to={links.home} className='website-logo'>
      <img src='/images/brand/logo2.svg' alt='Jest logo' />
    </Link>
  );
}
