import { MenuType } from "..";
import ChangePassword from "./ChangePassword";
import Orders from "./Orders";
import UserProfile from "./UserProfile";

export function Prompt({ menu }: { menu: MenuType }) {
  const Component = PromptComponents[menu];
  return <Component />;
}

type PromptComponentsType = {
  [key in MenuType]: React.ComponentType<any>;
};

const PromptComponents: PromptComponentsType = {
  userProfile: UserProfile,
  orders: Orders,
  changePassword: ChangePassword,
};
