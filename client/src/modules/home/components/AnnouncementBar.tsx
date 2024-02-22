import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/configs/fortawesome-config";

export default function AnnouncementBar() {
  return (
    <section className='announcement-bar-section'>
      <FontAwesomeIcon className='icon' icon='truck' />
      <span className='announcement-bar-text'>
        Free shipping on purchases over $190.00
      </span>
    </section>
  );
}
