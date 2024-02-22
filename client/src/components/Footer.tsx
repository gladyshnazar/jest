import links from "@/constants/links";
import { Link } from "react-router-dom";
import { ModalTrigger } from "./providers/ModalProvider";
import useUser from "@/hooks/use-user";

export default function Footer() {
  const { data: user } = useUser();
  return (
    <footer className='footer-section'>
      <div className='container'>
        <div className='footer-inner'>
          <div className='footer-content'>
            <ul className='footer-content-menu' data-heading='About us'>
              <li>
                <Link to={links.shop.all}>Shop</Link>
              </li>
              <li>
                {user ? (
                  <Link to={links.profile}>Customer account</Link>
                ) : (
                  <ModalTrigger modal='authentication'>
                    Customer account
                  </ModalTrigger>
                )}
              </li>
              <li>
                <Link to={links.mail("recipient@example.com")}>Contact</Link>
              </li>
            </ul>
            <div className='footer-content-mission' data-heading='Our mission'>
              <p>
                Help you save time and money when acquiring your medical
                inventory, safely, so you can focus on what matters most: your
                business.
              </p>
            </div>
            <ul className='footer-content-socials' data-heading='Find us'>
              <li>
                <Link to='https://www.facebook.com/'>
                  <svg className='icon'>
                    <use href='#svg-icon-facebook'></use>
                  </svg>
                  Facebook
                </Link>
              </li>
              <li>
                <Link to='https://www.instagram.com/'>
                  <svg className='icon'>
                    <use href='#svg-icon-instagram'></use>
                  </svg>
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div className='footer-copyright'>
            &copy; 2024, Jest |{" "}
            <Link to='http://nazararman.com'>nazararman.com</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
