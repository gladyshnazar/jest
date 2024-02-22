import ModalProvider from "@/components/providers/ModalProvider";
import links from "@/constants/links";
import { useAppSelector } from "@/hooks/redux";
import useCollections from "@/hooks/use-collections";
import { selectModal } from "@/redux/modal/selectors";
import { Link } from "react-router-dom";

export default function DesktopMenu() {
  const modal = useAppSelector(selectModal);
  const { data: collections } = useCollections();

  if (modal !== "desktop-menu") return null;
  return (
    <ModalProvider position='left'>
      <div className='modal-content-desktop'>
        <div className='modal-content-desktop-header'>
          <h5>Categories</h5>
        </div>
        <ul className='modal-content-desktop-list'>
          {collections.map(category => (
            <li key={category._id}>
              <Link to={links.shop.category(category.slug)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ModalProvider>
  );
}
