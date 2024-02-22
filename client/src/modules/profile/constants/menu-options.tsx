import { MenuType } from "..";

type ProfileMenuOptionsType = {
  title: string;
  icon: React.ReactNode;
  identifier: MenuType;
};
export const profileMenuOptions: ProfileMenuOptionsType[] = [
  {
    title: "My profile",
    icon: (
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
        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
        <circle cx='12' cy='7' r='4'></circle>
      </svg>
    ),
    identifier: "userProfile",
  },
  {
    title: "Orders",
    icon: (
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
        <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
        <line x1='3' y1='6' x2='21' y2='6'></line>
        <path d='M16 10a4 4 0 0 1-8 0'></path>
      </svg>
    ),
    identifier: "orders",
  },
  {
    title: "Change password",
    icon: (
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
        <path d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'></path>
      </svg>
    ),
    identifier: "changePassword",
  },
];
