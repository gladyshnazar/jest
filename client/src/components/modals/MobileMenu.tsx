import { Link } from "react-router-dom";
import ModalProvider, { ModalTrigger } from "../providers/ModalProvider";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import useCollections from "@/hooks/use-collections";
import { selectModal } from "@/redux/modal/selectors";
import links from "@/constants/links";
import useUser from "@/hooks/use-user";

type MenuCurrent = "main" | "categories" | "catalogue";

export default function MobileMenu() {
  const [menuCurrent, setMenuCurrent] = useState<MenuCurrent>("main");
  const { data: collections } = useCollections();
  const { data: user } = useUser();

  const modal = useAppSelector(selectModal);

  if (modal !== "mobile-menu") return null;
  return (
    <ModalProvider position='left' showDefaultX>
      <div className='modal-content-mobile'>
        {menuCurrent === "main" && (
          <div className='modal-content-mobile-main'>
            <ul className='modal-content-mobile-list'>
              <li>
                <Link to={links.home}>Home</Link>
              </li>
              <li>
                <Link to={links.shop.all}>Shop</Link>
              </li>
              <li>
                <button onClick={() => setMenuCurrent("categories")}>
                  Categories
                  <svg className='icon'>
                    <use href='#svg-icon-angle-right'></use>
                  </svg>
                </button>
              </li>
              <li>
                <button onClick={() => setMenuCurrent("catalogue")}>
                  Catalogue
                  <svg className='icon'>
                    <use href='#svg-icon-angle-right'></use>
                  </svg>
                </button>
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
          </div>
        )}
        {menuCurrent === "categories" && (
          <div className='modal-content-mobile-categories'>
            <div
              onClick={() => setMenuCurrent("main")}
              className='modal-content-mobile-navback'
            >
              <svg className='icon'>
                <use href='#svg-icon-arrow-left'></use>
              </svg>
              Menu
            </div>
            <h5 className='modal-content-mobile-title'>Categories</h5>
            <ul className='modal-content-mobile-list'>
              {collections.map(category => (
                <li key={category._id}>
                  <Link to={links.shop.category(category.slug)}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {menuCurrent === "catalogue" && (
          <div className='modal-content-mobile-categories'>
            <div
              onClick={() => setMenuCurrent("main")}
              className='modal-content-mobile-navback'
            >
              <svg className='icon'>
                <use href='#svg-icon-arrow-left'></use>
              </svg>
              Menu
            </div>
            <h5 className='modal-content-mobile-title'>Catalogue</h5>
            <div className='modal-content-mobile-catalogue-list'>
              {collections.map((category, index) => {
                if (index > 5) return null;
                {
                  /* Only 6 categories are shown */
                }
                return (
                  <details key={category._id}>
                    <summary>
                      {category.name}
                      <svg className='icon'>
                        <use href='#svg-icon-angle-down'></use>
                      </svg>
                    </summary>
                    <ul>
                      {category.subcategories.map(subcategory => (
                        <li key={subcategory._id}>
                          <Link to={links.shop.category(subcategory.slug)}>
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ModalProvider>
  );
}
