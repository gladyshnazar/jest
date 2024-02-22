export type ModalType =
  | "desktop-menu"
  | "mobile-menu"
  | "cart"
  | "authentication"
  | "filter"
  | "added-to-cart"
  | null;

export type ModalState = {
  current: ModalType;
};
