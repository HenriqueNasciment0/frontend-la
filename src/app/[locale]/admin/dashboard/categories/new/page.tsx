"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateCategory } from "@/api/endpoints/category";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(4).max(100),
  price: z.string(),
  description: z.string().min(4).max(200),
  workingMinutes: z.number(),
});

export default function NewCategory() {
  const t = useTranslations("NewCategory");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      workingMinutes: 0,
    },
  });

  function formatCurrency(value: string): string {
    const numericValue = parseFloat(value.replace(/\D/g, "")) / 100;
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const numericPrice = parseFloat(
      values.price.replace(/[R$\s.]/g, "").replace(",", ".")
    );

    CreateCategory({ ...values, price: numericPrice });
    form.reset();
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("nameLabel")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("description")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("descriptionLabel")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("price")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("priceLabel")}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(formatCurrency(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-end">
            <FormField
              control={form.control}
              name="workingMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("workingMinutes")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={t("workingMinutesLabel")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 {t("minutes")}</SelectItem>
                        <SelectItem value="60">1 {t("hour")}</SelectItem>
                        <SelectItem value="90">
                          1 {t("hour")} {t("and")} 30 {t("minutes")}
                        </SelectItem>
                        <SelectItem value="120">2 {t("hours")}</SelectItem>
                        <SelectItem value="180">3 {t("hours")}</SelectItem>
                        <SelectItem value="240">4 {t("hours")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-1/3">
              {t("submit")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
