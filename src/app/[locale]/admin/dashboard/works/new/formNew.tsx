"use strict";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  // link: z.string().min(1, {
  //   message: "Link must be at least 1 characters.",
  // }),
  images: z.array(z.instanceof(File)).min(1, {
    message: "At least one image must be uploaded.",
  }),
  category: z.array(z.number()).min(1, {
    message: "At least one category must be selected.",
  }),
});

export default function FormNew() {
  const t = useTranslations("NewWork");
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      // link: "",
      images: [],
      category: [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);

    // Aqui você pode implementar a lógica para enviar os dados do formulário e as imagens para o servidor.

    // router.push("/pt/admin/dashboard/works/all");
  };

  console.log(form.formState.errors);

  const items = [
    {
      id: 1,
      label: "Ensaio Fotográfico",
    },
    {
      id: 2,
      label: "Casamento",
    },
    {
      id: 3,
      label: "Ensaio Trash the Drass",
    },
    {
      id: 4,
      label: "Ensaio Corporativo",
    },
    {
      id: 5,
      label: "Ensaio Família",
    },
  ] as const;

  return (
    <Card className="w-11/12 mb-4">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("title")} {...field} />
                  </FormControl>
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
                    <Textarea placeholder={t("description")} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-4">
              <FormLabel>{t("category")}</FormLabel>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="category"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>

            <div className="flex justify-center items-center ">
              <ImageUploader
                onChange={(files) => form.setValue("images", files)}
              />
            </div>

            {form.formState.errors.images && (
              <p className="text-red-500">
                {form.formState.errors.images.message}
              </p>
            )}

            <Button type="submit">{t("submit")}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
