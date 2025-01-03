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
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import ImageUploader from "@/components/ImageUploader";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateJob } from "@/api/endpoints/job";
import { useEffect, useState } from "react";
import { GetCategories } from "@/api/endpoints/category";

interface Category {
  id: number;
  name: string;
}

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
  // images: z.array(z.instanceof(File)).min(1, {
  //   message: "At least one image must be uploaded.",
  // }),
  category: z.array(z.number()).min(1, {
    message: "At least one category must be selected.",
  }),
  payment: z.string().min(1, { message: "Payment must be selected." }),
});

export default function FormNew() {
  const [categories, setCategories] = useState<Category[]>([]);
  const t = useTranslations("NewWork");
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      // link: "",
      // images: [],
      category: [],
      payment: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const formData = new FormData();

    // formData.append("title", data.title);
    // formData.append("description", data.description);
    // formData.append("link", data.link);
    // data.images.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });
    formData.append("categoryIds", JSON.stringify(data.category));
    formData.append("payment", data.payment);
    formData.append("customerId", "3");

    console.log("FormData", formData);

    try {
      const response = await CreateJob(formData);
      console.log("response", response);
    } catch (error) {
      console.error("Error creating job:", error);
    }

    // Aqui você pode implementar a lógica para enviar os dados do formulário e as imagens para o servidor.

    // router.push("/pt/admin/dashboard/works/all");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await GetCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const itemsPayment = [
    {
      id: 1,
      label: "Parcelado",
      value: 1,
    },
    {
      id: 2,
      label: "Cartão de Crédito",
      value: 2,
    },
    {
      id: 3,
      label: "A vista",
      value: 3,
    },
    {
      id: 4,
      label: "Troca de serviços",
      value: 4,
    },
    {
      id: 5,
      label: "Presente",
      value: 5,
    },
  ] as const;

  return (
    <Card className="w-11/12 mb-4">
      <CardHeader>
        <CardTitle>{t("newWork")}</CardTitle>
        <CardDescription>{t("addWork")}</CardDescription>
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
              {categories.map((item) => (
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
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t("payment")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {itemsPayment.map((item) => (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={item.value.toString()} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="flex justify-center items-center ">
              <ImageUploader
                onChange={(files) => form.setValue("images", files)}
              />
            </div> */}

            {/* {form.formState.errors.images && (
              <p className="text-red-500">
                {form.formState.errors.images.message}
              </p>
            )} */}

            <Button type="submit">{t("submit")}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
