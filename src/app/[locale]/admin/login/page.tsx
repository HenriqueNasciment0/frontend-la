"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { useTranslations } from "next-intl";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Login } from "@/api/endpoints/auth";
import { AdminHeader } from "@/components/ui/AdminHeader";
import { Footer } from "@/components/ui/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "O formato do email está incorreto" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export default function LoginCard() {
  const t = useTranslations("Login");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await Login(email, password);

      if (response.status === 200) {
        router.push("/pt/admin/dashboard");
      }
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 401) {
        setLoading(false);
        setError(true);
      }
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(false);
    login(values.email, values.password);

    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex items-center flex-col gap-4 justify-center flex-1">
        {error && (
          <Alert variant="destructive" className="w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("error")}</AlertTitle>
            <AlertDescription>{t("invalid-credentials")}</AlertDescription>
          </Alert>
        )}
        <Card className="md:w-[400px] p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-center text-3xl font-bold">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-center text-sm text-gray-600">
              {t("admin_area")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t("email")}
                            {...field}
                            className={`${
                              fieldState.error ? "border-red-500" : ""
                            }`}
                          />
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-sm text-red-500 mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder={t("password")}
                              {...field}
                              className={`pr-10 ${
                                fieldState.error ? "border-red-500" : ""
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-sm text-red-500 mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <strong>{loading ? t("loading") : t("login")}</strong>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer t={t} />
    </div>
  );
}
