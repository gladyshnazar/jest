import { Route, Routes, useLocation } from "react-router-dom";

import Home from "@/modules/home";
import Shop from "@/modules/shop";
import Product from "@/modules/product";
import Profile from "@/modules/profile";
import NotFound from "@/components/NotFound";

import AnnouncementBar from "@/modules/home/components/AnnouncementBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Modals from "@components/modals";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { setModal } from "./redux/modal/reducer";

export default function Router() {
  const dispatch = useAppDispatch();

  const pathname = useLocation().pathname;
  const isHomePage = pathname === "/";
  const isProfilePage = pathname === "/profile";

  useEffect(() => {
    /* Closes modal (if opened) and scrolls to the top (due to react-router-dom specifics) */
    dispatch(setModal(null));
    window.scrollTo(0, 0);

    /* Changes the background to white color on profile page */
    document.body.classList.toggle("profile-background", isProfilePage);

    /* Makes <main> element more specific on profile page to apply additional styles */
    const mainElement = document.querySelector("main");
    mainElement!.classList.toggle("profile-page", isProfilePage);
  }, [pathname, dispatch]);

  return (
    <>
      {isHomePage && <AnnouncementBar />}
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop/:slug' element={<Shop />} />
          <Route path='/product/:slug' element={<Product />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Modals />
    </>
  );
}
