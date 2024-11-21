"use client";

import { getCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';

export const fetchAffiliates = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(accessToken && { Authorization: 'Bearer ' + accessToken })
    }
  });

  if (response.status === 401) {
    await signOut();
  }

  return response;
}