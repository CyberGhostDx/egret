"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  TextField,
  FieldError,
  Card,
  Link,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const AdminLoginPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (!isPending && session?.user) {
      if ((session.user as any).role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [session, isPending, router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.danger(error.message || "Authentication failed");
        return;
      }
      toast.success("Login successful");
      router.replace("/admin/dashboard");
    } catch (err: any) {
      toast.danger(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 font-sans text-slate-800">
      <div className="z-20 w-full max-w-[400px]">
        <Card className="w-full rounded-[2rem] border-none bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-3xl">
          <Card.Header className="flex-col items-center gap-4 pt-2 pb-6 text-center">
            <div className="flex flex-col gap-2">
              <Card.Title className="text-2xl font-bold tracking-tight text-slate-900">
                Sign in with email
              </Card.Title>
            </div>
          </Card.Header>

          <Card.Content>
            <Form
              onSubmit={onSubmit}
              className="flex flex-col gap-4"
              validationBehavior="native"
            >
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Input
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full"
                />
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <TextField
                isRequired
                name="password"
                type={isVisible ? "text" : "password"}
                minLength={1}
                validate={(value) => {
                  if (value.length < 1) {
                    return "Please enter a password";
                  }
                  return null;
                }}
              >
                <div className="group relative w-full">
                  <Input
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full"
                  />
                  <button
                    className="absolute inset-y-0 right-3 z-10 flex w-5 items-center text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <MdVisibilityOff size={20} />
                    ) : (
                      <MdVisibility size={20} />
                    )}
                  </button>
                </div>
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>
              <Button
                type="submit"
                className="bg-primary w-full"
                isPending={isLoading}
              >
                login
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
