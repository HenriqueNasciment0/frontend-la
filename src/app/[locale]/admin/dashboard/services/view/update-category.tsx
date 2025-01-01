import CurrencyInput from "@/components/currency-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { UpdateCategory } from "@/api/endpoints/category";
import { useCategoryStore } from "@/app/stores/category-store";

type Category = {
  id: number;
  name: string;
  price: number;
  description: string;
  workingMinutes: number;
};

const formSchema = z.object({
  name: z.string().min(4).max(100),
  price: z.string(),
  description: z.string().min(4).max(200),
  workingMinutes: z.string(),
});

export function DialogUpadte({
  showUpdate,
  setShowUpdate,
  selectedCategory,
}: {
  showUpdate: boolean;
  setShowUpdate: (show: boolean) => void;
  selectedCategory: Category | null;
}) {
  const t = useTranslations("NewCategory");

  const { setUpCategory } = useCategoryStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedCategory?.name,
      price:
        selectedCategory && selectedCategory.price !== undefined
          ? (selectedCategory.price * 100).toString()
          : "60",
      description: selectedCategory?.description,
      workingMinutes: selectedCategory?.workingMinutes.toString(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const numericPrice =
      parseFloat(values.price.replace(/[R$\s.]/g, "").replace(",", ".")) / 100;

    const data = {
      name: values.name,
      price: numericPrice,
      description: values.description,
      workingMinutes: Number(values.workingMinutes),
    };

    UpdateCategory((selectedCategory?.id || "").toString(), data);

    setShowUpdate(false);
    setUpCategory(true);
  }

  if (!showUpdate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog open={showUpdate} onOpenChange={setShowUpdate}>
        <DialogContent className="sm:max-w-1/2">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Faça alterações na categoria aqui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-md"
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
                        <Textarea
                          placeholder={t("descriptionLabel")}
                          {...field}
                        />
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
                        <CurrencyInput
                          id="price"
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingMinutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("workingMinutes")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("workingMinutesLabel")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Salvar alterações</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
