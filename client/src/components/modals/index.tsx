import MobileMenu from "@components/modals/MobileMenu";
import DesktopMenu from "@components/modals/DesktopMenu";
import Cart from "@components/modals/Cart";
import Authentication from "@components/modals/Authentication";
import { Fragment } from "react";

export default function Modals() {
  /* That file contents  only modals that can be triggered globally.
     Each route contains its own modals */
  return (
    <Fragment>
      <MobileMenu />
      <DesktopMenu />
      <Cart />
      <Authentication />
    </Fragment>
  );
}
