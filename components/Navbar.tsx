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
import { usePathname } from "next/navigation";
import NextLink from "next/link";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ];


  return (
    <Surface
      className="sticky top-0 z-50 w-full border-b border-divider bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <NextLink href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              EGRET
            </span>
          </NextLink>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NextLink
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-primary ${pathname === link.href ? "text-primary font-bold" : "text-muted-foreground font-medium"
                  }`}
              >
                {link.name}
              </NextLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center">
            <Tabs variant="primary" defaultSelectedKey="th" className="w-full max-w-md">
              <Tabs.ListContainer>
                <Tabs.List aria-label="Language selection"
                  className="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
                >
                  <Tabs.Tab
                    id="en"
                  >
                    EN
                    <Tabs.Indicator className="bg-primary" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="th"
                  >
                    ไทย
                    <Tabs.Indicator className="bg-primary" />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>

          <div className="flex items-center gap-2 shadow-none border-none">
            {user ? (
              <Dropdown>
                <Button variant="ghost" className="relative h-10 w-auto rounded-full p-0 flex items-center gap-2 px-2 border-none">
                  <span className="hidden lg:inline-block text-sm font-medium pr-1">
                    {user.name}
                  </span>
                  <Avatar className="h-8 w-8">
                    {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                    <Avatar.Fallback color="accent">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu className="min-w-48" onAction={(key) => key === "logout" && authClient.signOut()}>
                    <Dropdown.Item
                      id="logout"
                      className="text-danger"
                    >
                      <Label>Sign Out</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <NextLink href="/login">
                <Button size="sm" className="bg-primary hover:bg-[#1e4a57]">
                  Sign In
                </Button>
              </NextLink>
            )}

            <Disclosure className="md:hidden relative">
              {({ isExpanded }) => (
                <>
                  <Disclosure.Trigger
                    className="p-1 px-2 border border-transparent rounded-md  transition-colors flex items-center justify-center size-10"
                    aria-label="Toggle Menu"
                  >
                    {isExpanded ? (
                      <HiX className="h-6 w-6 text-primary" />
                    ) : (
                      <HiMenu className="h-6 w-6 text-primary" />
                    )}
                  </Disclosure.Trigger>
                  <Disclosure.Content className="absolute top-full right-0 mt-2 w-48 bg-background border border-divider rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="px-4 py-6 flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <NextLink
                          key={link.name}
                          href={link.href}
                          className={`text-lg font-medium py-2 transition-colors hover:text-primary ${pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
                            }`}
                        >
                          {link.name}
                        </NextLink>
                      ))}
                      <div className="pt-4 border-t border-divider flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Language</span>
                        <Tabs variant="primary" defaultSelectedKey="th" className="w-full max-w-sm">
                          <Tabs.ListContainer>
                            <Tabs.List aria-label="Language selection"
                              className="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
                            >
                              <Tabs.Tab
                                id="en"
                              >
                                EN
                                <Tabs.Indicator className="bg-primary" />
                              </Tabs.Tab>
                              <Tabs.Tab
                                id="th"
                              >
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
    </Surface >
  );
};

export default Navbar;