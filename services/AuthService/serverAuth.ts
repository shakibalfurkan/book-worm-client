"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};
