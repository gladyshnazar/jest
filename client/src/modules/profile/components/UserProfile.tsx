import Heading from "./Heading";
import InfoCard from "./InfoCard";
import useUser from "@/hooks/use-user";
import useToggle from "@/hooks/use-toggle";
import FormInput from "./form/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import FormMessage from "@/components/form/FormMessage";
import useEditProfile from "../hooks/use-edit-profile";
import SpinnerProvider from "@/components/providers/SpinnerProvider";

export default function UserProfile() {
  const { data: user } = useUser();
  const [isEditMode, toggleEditMode] = useToggle(false);

  if (!user) return null;
  if (isEditMode)
    return <EditUserProfile cancel={() => toggleEditMode(false)} />;
  return (
    <div className='user-profile'>
      <div className='user-profile-cards'>
        <div className='user-profile-card'>
          <div className='user-profile-card-title'>Total cost</div>
          <div className='user-profile-card-value'>
            {`$${user.orders
              .reduce((acc, cur) => (acc += cur.totalPrice), 0)
              .toString()}`}
          </div>
        </div>
        <div className='user-profile-card'>
          <div className='user-profile-card-title'>Orders</div>
          <div className='user-profile-card-value'>
            {user.orders.length.toString()}
          </div>
        </div>
      </div>
      <div className='user-profile-section info'>
        <Heading
          render={
            <button
              onClick={() => toggleEditMode(true)}
              className='heading-render-edit'
            >
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
                <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
              </svg>
              <span className='heading-render-edit-text'>Edit</span>
            </button>
          }
        >
          Profile information
        </Heading>
        <div className='user-profile-section-content'>
          <InfoCard label='First name' value={user.name.split(" ")[0]} />
          <InfoCard label='Last name' value={user.name.split(" ")[1]} />
          <InfoCard label='Client ID' value={user._id} />
          <InfoCard label='Account created' value={user.createdAt} />
        </div>
      </div>
      <div className='user-profile-section methods'>
        <Heading>Contact methods</Heading>
        <div className='user-profile-section-content'>
          <InfoCard label='Email' value={user.email} />
          <InfoCard label='Phone number' value='Not provided' />
        </div>
      </div>
      <div className='user-profile-section information'>
        <Heading>Other information</Heading>
        <div className='user-profile-section-content'>
          <InfoCard label='Accepts JEST Marketing' value='Yes' />
        </div>
      </div>
    </div>
  );
}

export type EditUserProfileFormType = {
  firstName: string;
  lastName: string;
};
function EditUserProfile({ cancel }: { cancel: () => void }) {
  const { data: user } = useUser();

  const { editProfile, data: message, error } = useEditProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserProfileFormType>({
    defaultValues: {
      firstName: user?.name.split(" ")[0] || "",
      lastName: user?.name.split(" ")[1] || "",
    },
  });

  const onSubmit: SubmitHandler<EditUserProfileFormType> = async data => {
    await editProfile(data);
  };

  return (
    <div className='user-edit-profile'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='user-edit-profile-form'
      >
        <FormMessage message={message} error={error} />
        <div className='user-edit-profile-form-inputs'>
          <FormInput
            {...register("firstName", { required: "Field is required" })}
            label='First name'
            error={errors.firstName?.message || null}
            type='text'
          />
          <FormInput
            {...register("lastName", { required: "Field is required" })}
            label='Last name'
            error={errors.lastName?.message || null}
            type='text'
          />
        </div>
        <div className='user-edit-profile-form-buttons'>
          <SpinnerProvider isSpinning={isSubmitting}>
            <button
              className='green @shadow'
              type='submit'
              disabled={isSubmitting}
            >
              Accept
            </button>
          </SpinnerProvider>
          <button onClick={cancel} type='button' disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
