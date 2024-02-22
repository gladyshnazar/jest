import useUser from "@/hooks/use-user";
import { MenuType } from "..";
import { profileMenuOptions } from "../constants/menu-options";
import { useSearchParams } from "react-router-dom";

export default function DesktopMenuList({ menu }: { menu: MenuType }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { signOut } = useUser();

  return (
    <ul className='profile-menu-desktop-list mobile-hidden'>
      {profileMenuOptions.map(option => (
        <li
          key={option.identifier}
          onClick={() => setSearchParams({ menu: option.identifier })}
          className={`profile-menu-desktop-list-item ${
            menu === option.identifier ? "current" : ""
          }`}
        >
          {option.icon}
          <span className='title'>{option.title}</span>
        </li>
      ))}
      <li onClick={signOut} className='profile-menu-desktop-list-item'>
        <svg
          className='icon'
          width='100%'
          height='100%'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
          <polyline points='16 17 21 12 16 7'></polyline>
          <line x1='21' y1='12' x2='9' y2='12'></line>
        </svg>
        <span className='title'>Sign out</span>
      </li>
    </ul>
  );
}
