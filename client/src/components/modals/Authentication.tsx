import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import ModalProvider from "@/components/providers/ModalProvider";
import InputError from "@components/form/InputError";
import FormMessage from "@components/form/FormMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setModal } from "@/redux/modal/reducer";
import { selectModal } from "@/redux/modal/selectors";
import links from "@/constants/links";
import useUser from "@/hooks/use-user";

export type AuthenticationFormType = {
  name?: string;
  email: string;
  password: string;
};

function Authentication() {
  const dispatch = useAppDispatch();
  const { signIn, signUp } = useUser();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState<"sign-up" | "sign-in">(
    "sign-in"
  );

  const modal = useAppSelector(selectModal);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthenticationFormType>();

  const switchForm = (form: "sign-up" | "sign-in") => {
    setCurrentForm(form);
    setError(null);
    setMessage(null);
    reset(); // Reset form fields when switching forms
  };

  const redirectAfterSignIn = () => {
    setTimeout(() => {
      if (!pathname.startsWith("/product")) {
        navigate(links.profile);
      }
      dispatch(setModal(null));
      setMessage(null);
    }, 1000);
  };

  const onSubmit: SubmitHandler<AuthenticationFormType> = async data => {
    let response;
    try {
      if (currentForm === "sign-in") {
        response = await signIn(data);
        redirectAfterSignIn();
      } else if (currentForm === "sign-up") {
        response = await signUp(data);
      }

      setError(null);
      setMessage(response?.message);
      reset();
    } catch (error: any) {
      setError(error.response.data.error);
      setMessage(null);
      reset();
    }
  };

  if (modal !== "authentication") return null;
  return (
    <ModalProvider position='center'>
      <div className='modal-content-authentication'>
        <div className='modal-content-inner'>
          <h2>{currentForm === "sign-in" ? "Sign in" : "Sign up"}</h2>
          <FormMessage error={error} message={message} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentForm === "sign-up" && (
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                name='name'
                id='name'
                type='text'
                placeholder='Full Name'
              />
            )}
            {currentForm === "sign-up" && (
              <InputError error={errors.name?.message || null} />
            )}
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              name='email'
              id='email'
              type='email'
              placeholder='Email'
            />
            <InputError error={errors.email?.message || null} />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters long",
                },
              })}
              name='password'
              type='password'
              placeholder='Password'
            />
            <InputError error={errors.password?.message || null} />
            <button
              name='submit'
              type='submit'
              className='red'
              disabled={isSubmitting}
            >
              {currentForm === "sign-in" ? "Log in" : "Create an account"}
            </button>
          </form>
          <button
            onClick={() =>
              currentForm === "sign-in"
                ? switchForm("sign-up")
                : switchForm("sign-in")
            }
            type='button'
            disabled={isSubmitting}
          >
            {currentForm === "sign-in" ? "Create an account" : "Log in"}
          </button>
        </div>
      </div>
    </ModalProvider>
  );
}

export default Authentication;
