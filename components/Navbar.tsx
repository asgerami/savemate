"use client";
import React, { useState } from "react";
import Logo, { MobileLogo } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transcations", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <nav className="container flex items-center justify-between px-4 py-3">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="hover:bg-muted">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]" side={"left"}>
            <Logo />
            <div className="flex flex-col gap-2 pt-6">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallback={() => setIsOpen(false)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[60px] items-center">
          <MobileLogo />
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="hidden border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm md:block">
      <nav className="container flex items-center justify-between px-4 lg:px-8">
        <div className="flex h-[70px] items-center gap-x-6">
          <Logo />
          <div className="flex h-full items-center">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={clickCallback}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 h-0.5 w-[65%] -translate-x-1/2 rounded-full bg-foreground transition-all duration-200 ease-in-out md:block" />
      )}
    </div>
  );
}

export default Navbar;
