import { loginFormSchema, LoginFormType, loginResponseSchema } from "@/components/login-form/LoginForm";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect, RedirectType } from "next/navigation";
import { setCookie } from 'cookies-next';

const url = "http://localhost:3333"
export const login = async (formData: LoginFormType) => {
  const parsedData = loginFormSchema.safeParse(formData);

  if (!parsedData.success) {
    return {
      error: parsedData.error.message,
    };
  }

  if (parsedData.success) {
    try {
      const res = await fetch(url + '/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData.data),
      });

      if (res.status !== 200) {
        return { error: 'Invalid email or password' };
      }

      const resJson = await res.json();
      const parsedRes = loginResponseSchema.safeParse(resJson);

      if (res.status === 200 && parsedRes.success) {
        setCookie('accessToken', parsedRes.data.access_token);
        setCookie('refreshToken', parsedRes.data.refresh_token);

        redirect('/affiliates', RedirectType.replace);
      }

      if (parsedRes.error) {
        return { error: 'error' };
      }
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      console.log({ error });

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).message,
      };
    }
  }
};