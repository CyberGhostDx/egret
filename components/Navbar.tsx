"use client";

import {
  Surface,
  Button,
  Avatar,
  Dropdown,
  Label,
  Disclosure,
  Tabs,
} from "@heroui/react";
import { HiMenu, HiX } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import NextLink from "next/link";
import { LuLogOut } from "react-icons/lu";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const [selectedLocale, setSelectedLocale] = useState(locale);

  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale]);

  const handleLocaleChange = (key: string) => {
    setSelectedLocale(key);
    router.replace(pathname, { locale: key });
  };

  const navLinks = [
    { name: t("Home"), href: "/" },
    { name: t("Courses"), href: "/courses" },
  ];

  return (
    <Surface className="border-divider bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary text-xl font-bold tracking-tight">
              EGRET
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-primary transition-colors ${
                  pathname === link.href
                    ? "text-primary font-bold"
                    : "text-muted-foreground font-medium"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center sm:flex">
            <Tabs
              variant="primary"
              selectedKey={selectedLocale}
              onSelectionChange={(key) => handleLocaleChange(key as string)}
              className="w-full max-w-md"
            >
              <Tabs.ListContainer>
                <Tabs.List
                  aria-label="Language selection"
                  className="*:data-[selected=true]:text-accent-foreground w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal"
                >
                  <Tabs.Tab id="en">
                    EN
                    <Tabs.Indicator className="bg-primary" />
                  </Tabs.Tab>
                  <Tabs.Tab id="th">
                    ไทย
                    <Tabs.Indicator className="bg-primary" />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>

          <div className="flex items-center gap-2 border-none shadow-none">
            {user ? (
              <Dropdown>
                <Dropdown.Trigger>
                  <div className="transition-duration-200 relative flex h-10 w-auto cursor-pointer items-center gap-2 rounded-full border-none p-0 px-2 transition-colors hover:bg-gray-200">
                    <span className="hidden pr-1 text-sm font-medium lg:inline-block">
                      {user.name}
                    </span>
                    <Avatar className="h-8 w-8">
                      {user.image && (
                        <Avatar.Image src={user.image} alt={user.name} />
                      )}
                      <Avatar.Fallback color="accent">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <Dropdown.Menu
                    className="min-w-48"
                    onAction={(key) => key === "logout" && authClient.signOut()}
                  >
                    <Dropdown.Item id="logout" className="text-danger">
                      <LuLogOut className="size-5" />
                      <Label className="text-danger">{t("SignOut")}</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <NextLink href="/login">
                <Button size="sm" className="bg-primary hover:bg-[#1e4a57]">
                  {t("SignIn")}
                </Button>
              </NextLink>
            )}

            <Disclosure className="relative md:hidden">
              {({ isExpanded }) => (
                <>
                  <Disclosure.Trigger>
                    <div
                      className="flex size-10 items-center justify-center rounded-md border border-transparent p-1 px-2 transition-colors"
                      aria-label="Toggle Menu"
                    >
                      {isExpanded ? (
                        <HiX className="text-primary h-6 w-6" />
                      ) : (
                        <HiMenu className="text-primary h-6 w-6" />
                      )}
                    </div>
                  </Disclosure.Trigger>
                  <Disclosure.Content className="bg-background border-divider animate-in fade-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border shadow-xl duration-200">
                    <div className="flex flex-col gap-4 px-4 py-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`hover:text-primary py-2 text-lg font-medium transition-colors ${
                            pathname === link.href
                              ? "text-primary font-bold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="border-divider flex items-center justify-between gap-2 border-t pt-4">
                        <span className="text-muted-foreground text-sm font-medium">
                          {t("Language")}
                        </span>
                        <Tabs
                          variant="primary"
                          selectedKey={selectedLocale}
                          onSelectionChange={(key) =>
                            handleLocaleChange(key as string)
                          }
                          className="w-full max-w-sm"
                        >
                          <Tabs.ListContainer>
                            <Tabs.List
                              aria-label="Language selection"
                              className="*:data-[selected=true]:text-accent-foreground w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal"
                            >
                              <Tabs.Tab id="en">
                                EN
                                <Tabs.Indicator className="bg-primary" />
                              </Tabs.Tab>
                              <Tabs.Tab id="th">
                                ไทย
                                <Tabs.Indicator className="bg-primary" />
                              </Tabs.Tab>
                            </Tabs.List>
                          </Tabs.ListContainer>
                        </Tabs>
                      </div>
                    </div>
                  </Disclosure.Content>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </Surface>
  );
};

export default Navbar;
