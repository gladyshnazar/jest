import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/configs/fortawesome-config";
import useToggle from "@/hooks/use-toggle";
import useCollections from "@/hooks/use-collections";
import useUser from "@/hooks/use-user";
import Logo from "@components/Logo";
import { ModalTrigger } from "@/components/providers/ModalProvider";
import Search from "@components/search";
import links from "@/constants/links";
import useCart from "@/hooks/use-cart";

export default function Header() {
  const { data: collections } = useCollections();

  const { data: user } = useUser();

  const [isCatalogueActive, toggleCatalogue] = useToggle(false);

  const { cartSummary } = useCart();

  const pathname = useLocation().pathname;

  useEffect(() => {
    toggleCatalogue(false);
  }, [pathname]);

  return (
    <header className='header-section'>
      <div className='container'>
        <div className='header-inner'>
          <div className='header-menu-trigger desktop-hidden'>
            <ModalTrigger modal='mobile-menu'>
              <svg className='icon'>
                <use href='#svg-icon-bars'></use>
              </svg>
            </ModalTrigger>
          </div>
          <Logo />
          <ModalTrigger
            modal='desktop-menu'
            className='header-categories mobile-hidden-flex'
          >
            <FontAwesomeIcon className='icon' icon='caret-down' />
            Categories
          </ModalTrigger>
          <Search />
          <nav className='header-toolbar'>
            {user ? (
              <Link
                to={links.profile}
                className='header-toolbar-item header-toolbar-account'
              >
                <div className='header-toolbar-item-icon'>
                  <svg className='icon'>
                    <use href='#svg-icon-user'></use>
                  </svg>
                </div>
                <div className='header-toolbar-item-title mobile-hidden'>
                  Account
                </div>
              </Link>
            ) : (
              <ModalTrigger
                modal='authentication'
                className='header-toolbar-item header-toolbar-account'
              >
                <div className='header-toolbar-item-icon'>
                  <svg className='icon'>
                    <use href='#svg-icon-user'></use>
                  </svg>
                </div>
                <div className='header-toolbar-item-title mobile-hidden'>
                  Account
                </div>
              </ModalTrigger>
            )}
            <ModalTrigger
              modal='cart'
              className='header-toolbar-item header-toolbar-cart'
            >
              <div className='header-toolbar-item-icon'>
                {user && user.cart.length !== 0 && (
                  <div className='header-toolbar-item-counter'>
                    {cartSummary.totalProducts}
                  </div>
                )}
                <svg className='icon'>
                  <use href='#svg-icon-cart-shopping'></use>
                </svg>
              </div>
              <div className='header-toolbar-item-title mobile-hidden'>
                Cart
              </div>
            </ModalTrigger>
          </nav>
        </div>
      </div>
      <nav className='secondary-header-section mobile-hidden'>
        <div className='container'>
          <ul className='secondary-header-list'>
            <li>
              <Link to={links.home}>Home</Link>
            </li>
            <li>
              <Link to={links.shop.all}>Shop</Link>
            </li>
            <li className='catalogue-li'>
              <button onClick={() => toggleCatalogue()}>
                Catalogue
                <FontAwesomeIcon
                  className='icon'
                  icon={`${isCatalogueActive ? "caret-up" : "caret-down"}`}
                />
              </button>
              {isCatalogueActive && (
                <div className='catalogue-dropdown'>
                  <div className='container'>
                    <div className='catalogue-dropdown-inner'>
                      {collections.map((category, index) => {
                        if (index > 5) return null;
                        {
                          /* Only 6 categories are shown */
                        }
                        return (
                          <div
                            className='catalogue-dropdown-inner-block'
                            key={category._id}
                          >
                            <div className='catalogue-dropdown-inner-block-coverimage'>
                              <Link to={links.shop.category(category.slug)}>
                                <img
                                  src={category.imageUrl}
                                  alt={category.name}
                                />
                              </Link>
                            </div>
                            <h5 className='catalogue-dropdown-inner-block-category'>
                              <Link to={links.shop.category(category.slug)}>
                                {category.name}
                              </Link>
                            </h5>
                            <ul className='catalogue-dropdown-inner-block-subcategories'>
                              {category.subcategories.map(subcategory => (
                                <li key={subcategory._id}>
                                  <Link
                                    to={links.shop.category(subcategory.slug)}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
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
      </nav>
    </header>
  );
}
