import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/routing";

export default function LoginCard() {
  const t = useTranslations("Login");

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[370px]">
        <CardHeader>
          <CardTitle className="text-center">{t("title")}</CardTitle>
          {/* <Link href="/about">{t('about')}</Link> */}
          <CardDescription className="text-center">
            {t("admin_area")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" placeholder={t("email")} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">{t("password")}</Label>
                <Input id="password" placeholder={t("password")} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">{t("cancel")}</Button>
          <Button>{t("login")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
