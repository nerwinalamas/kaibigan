"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data, status } = useSession();
  const router = useRouter();
  
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
          className="w-80 h-12 lg:w-[400px] flex gap-5 hover:bg-opacity-20"
        >
          <Image 
            src="/google.png"
            alt="Google logo"
            width={30}
            height={30}
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
