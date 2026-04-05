"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { ArrowRight, KeyRound, Loader2, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

import { loginAction } from "@/actions/auth/login";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginInput, LoginSchema } from "@/validation/login";

export function LoginForm({
  tenantSlug,
  clinicName,
  logoUrl,
}: {
  tenantSlug: string;
  clinicName?: string;
  logoUrl?: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: LoginInput) => {
    setIsLoading(true);
    try {
      const result = await loginAction(values, tenantSlug);
      if (!result.success || !result.data) throw new Error(result.message);

      useAuthStore.getState().setAuth(result.data);
      toast.success("تم تسجيل الدخول بنجاح");
      router.push(`/${tenantSlug}/dashboard`);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message || "خطأ في الدخول");
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col duration-700">
      <button
        onClick={() => router.push(`/${tenantSlug}`)}
        type="button"
        className="text-muted-foreground hover:text-foreground mb-10 flex items-center gap-2 self-start text-sm font-bold transition-colors"
      >
        <ArrowRight className="size-4" />
        <span>العودة للرئيسية</span>
      </button>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2 text-center lg:text-right">
          <div className="mb-4 flex justify-center lg:hidden">
            {logoUrl ? (
              <ClinicImage
                src={logoUrl}
                alt="Logo"
                width={48}
                height={48}
                className="rounded-lg object-contain p-1 shadow-sm"
                fallbackType="logo"
              />
            ) : (
              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold">
                {clinicName?.charAt(0) || tenantSlug.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-foreground text-2xl font-black tracking-tight sm:text-3xl">
            تسجيل الدخول
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            مرحباً بك في {clinicName || "النظام"}، أدخل بياناتك للمتابعة.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              {/* حقل اسم المستخدم */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      اسم المستخدم
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserRound className="text-muted-foreground absolute top-2.5 right-3 h-4 w-4" />
                        <Input
                          placeholder="example123"
                          className="bg-muted/20 border-border/50 focus-visible:ring-primary/20 h-11 pr-10 pl-3 text-left"
                          dir="ltr"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-bold" />
                  </FormItem>
                )}
              />

              {/* حقل كلمة المرور */}
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
                          className="bg-muted/20 border-border/50 focus-visible:ring-primary/20 h-11 pr-10 pl-3 text-left"
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

            {/* زرار الدخول */}
            <Button
              type="submit"
              className="w-full"
              size={"lg"}
              variant={"gradient"}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  جاري التحقق...
                </>
              ) : (
                "دخول"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
