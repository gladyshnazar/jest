import useUser from "@/hooks/use-user";
import React, { useEffect, useState } from "react";
import MobileMenuList from "./components/MobileMenuList";
import { Prompt } from "./components/Prompt";
import DesktopMenuList from "./components/DesktopMenuList";
import { useSearchParams } from "react-router-dom";
import SpinnerProvider from "@/components/providers/SpinnerProvider";

export type MenuType = "userProfile" | "orders" | "changePassword";
export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menu, setMenu] = useState<MenuType>("userProfile");

  const { data: user } = useUser();

  /* Synchronizes search params and state */
  useEffect(() => {
    if (searchParams.get("menu")) {
      const menu = searchParams.get("menu") as MenuType;
      setMenu(menu);
    }
  }, [searchParams]);

  return (
    <SpinnerProvider isSpinning={!user} hideContent>
      <React.Fragment>
        <aside>
          <div className='profile-user'>
            <h2 className='profile-user-name truncate'>{user?.name}</h2>
            <span className='profile-user-email truncate'>{user?.email}</span>
          </div>
          <nav className='profile-menu'>
            <MobileMenuList menu={menu} />
            <DesktopMenuList menu={menu} />
          </nav>
        </aside>
        <div className='profile-main'>
          <Prompt menu={menu} />
        </div>
      </React.Fragment>
    </SpinnerProvider>
  );
}
