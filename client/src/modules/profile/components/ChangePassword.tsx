import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "./Heading";
import FormInput from "./form/FormInput";
import useEditPassword from "../hooks/use-edit-password";
import FormMessage from "@/components/form/FormMessage";
import SpinnerProvider from "@/components/providers/SpinnerProvider";

type ChangePasswordFormType = {
  newPassword: string;
  confirmedNewPassword: string;
};
export default function ChangePassword() {
  const { editPassword, data: message, error } = useEditPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordFormType>();
  const newPasswordWatcher = watch("newPassword");

  const onSubmit: SubmitHandler<ChangePasswordFormType> = async data => {
    await editPassword(data.confirmedNewPassword);
    reset();
  };

  return (
    <div className='change-password'>
      <Heading>Change your password</Heading>
      <div className='change-password-main'>
        <FormMessage error={error} message={message} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
            })}
            label='New password'
            error={errors.newPassword?.message || null}
            type='password'
          />
          <FormInput
            label='Confirm password'
            error={errors.confirmedNewPassword?.message || null}
            {...register("confirmedNewPassword", {
              required: "Confirm your new password",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
              validate: value =>
                value === newPasswordWatcher || "Passwords must match",
            })}
            type='password'
          />
          <SpinnerProvider isSpinning={isSubmitting}>
            <button
              type='submit'
              className='green @shadow'
              disabled={isSubmitting}
            >
              Accept
            </button>
          </SpinnerProvider>
        </form>
      </div>
    </div>
  );
}
