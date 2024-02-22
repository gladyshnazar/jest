import { setModal } from "@/redux/modal/reducer";
import { useDispatch } from "react-redux";

type ModalProviderProps = {
  children?: React.ReactNode;
  position: "left" | "right" | "center";
  showDefaultX?: boolean;
};

export default function ModalProvider({
  children,
  position,
  showDefaultX = false,
}: ModalProviderProps) {
  return (
    <>
      <div
        className={`modal ${
          position === "left"
            ? "left"
            : position === "right"
            ? "right"
            : position === "center"
            ? "center"
            : ""
        }`}
      >
        {showDefaultX && (
          <ModalClose className='modal-close desktop-hidden'>
            <svg className='icon'>
              <use href='#svg-icon-x'></use>
            </svg>
          </ModalClose>
        )}
        <div className='modal-content'>{children}</div>
      </div>
      <ModalClose className='modal-overlay'></ModalClose>
    </>
  );
}

type ModalTriggerProps = {
  children: React.ReactNode;
  modal:
    | "desktop-menu"
    | "mobile-menu"
    | "cart"
    | "authentication"
    | "filter"
    | "added-to-cart";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ModalTrigger({ children, modal, ...rest }: ModalTriggerProps) {
  const dispatch = useDispatch();

  function triggerModal() {
    dispatch(setModal(modal));
    document.body.style.overflow = "hidden";
  }

  return (
    <button onClick={triggerModal} {...rest}>
      {children}
    </button>
  );
}

type ModalCloseProps = {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ModalClose({ children, ...rest }: ModalCloseProps) {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setModal(null));
    document.body.style.overflow = "visible";
  }

  return (
    <button onClick={closeModal} {...rest}>
      {children}
    </button>
  );
}
