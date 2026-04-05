"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { ArrowRight, KeyRound, Loader2, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClinicImage } from "@/components/shared/clinic-image";

import { patientLoginAction } from "../../../../actions/auth/patientLogin";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { LoginInput, LoginSchema } from "@/validation/login";

export function PatientLoginForm({
  tenantSlug,
  clinicName,
  logoUrl,
}: {
  tenantSlug: string;
  clinicName?: string;
  logoUrl?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: LoginInput) => {
    setIsLoading(true);
    try {
      const result = await patientLoginAction(values, tenantSlug);
      if (!result.success || !result.data) throw new Error(result.message);

      usePatientAuthStore.getState().setPatientAuth(tenantSlug, result.data);

      toast.success("تم تسجيل الدخول بنجاح");
      window.location.href = `/${tenantSlug}/patient`;
    } catch (error) {
      if (error instanceof Error) toast.error(error.message || "خطأ في الدخول");
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col duration-700">
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground mb-10 flex h-auto items-center gap-2 self-start p-0 text-sm font-bold transition-colors hover:bg-transparent"
        asChild
      >
        <Link href={`/${tenantSlug}`}>
          <ArrowRight className="h-4 w-4" />
          <span>العودة للرئيسية</span>
        </Link>
      </Button>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2 text-center lg:text-right">
          <div className="mb-4 flex justify-center lg:hidden">
            {logoUrl ? (
              <ClinicImage
                src={logoUrl}
                alt="Logo"
                width={48}
                height={48}
                className="rounded-lg bg-white object-contain p-1 shadow-sm"
                fallbackType="logo"
              />
            ) : (
              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold">
                {clinicName?.charAt(0) || tenantSlug.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-foreground text-2xl font-black tracking-tight sm:text-3xl">
            بوابة المرضى
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            مرحباً بك في {clinicName || "العيادة"}، أدخل رقم هاتفك للمتابعة.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              {/* حقل اسم المستخدم / رقم الهاتف */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      اسم المستخدم أو رقم الهاتف
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserRound className="text-muted-foreground absolute top-2.5 right-3 h-4 w-4" />
                        <Input
                          placeholder="01xxxxxxxxx"
                          className="bg-muted/20 border-border/50 focus-visible:ring-primary/20 h-11 pr-9 pl-3 text-left"
                          dir="ltr"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="text-muted-foreground absolute top-2.5 right-3 h-4 w-4" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="bg-muted/20 border-border/50 focus-visible:ring-primary/20 h-11 pr-9 pl-3 text-left"
                          dir="ltr"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-bold" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              variant={"gradient"}
              size={"lg"}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
              تسجيل الدخول
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
