'use client'
import { Button } from "@/components/ui/button";
import {
  RegisterLink, 
  LoginLink
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <LoginLink>Login in</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Register</RegisterLink>
      </Button>
    </div>
  );
}
