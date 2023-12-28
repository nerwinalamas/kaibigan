"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data, status } = useSession();
  const router = useRouter();

  console.log(data, status);
  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <p className="text-center">Loading ... </p>
      </div>
    );
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button
          onClick={() => signIn("google")}
          className="w-80 lg:w-[500px] bg-[#e13f2a] font-bold text-white hover:bg-red-400"
        >
          Google Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
