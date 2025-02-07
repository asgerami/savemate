"use client";

import CreateCategoryDialog from "@/app/(dashboard)/_components/CreateCategoryDialog";
import DeleteCategoryDialog from "@/app/(dashboard)/_components/DeleteCategoryDialog";
import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Catagory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

function page() {
  return (
    <>
      {/* HEADER */}
      <div className="border-b bg-gradient-to-r from-card to-card/80">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-12 px-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Manage Account
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Configure your account settings and transaction categories
            </p>
          </div>
        </div>
      </div>
      <div className="container max-w-7xl space-y-6 p-8">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Currency Settings</CardTitle>
            <CardDescription className="text-base">
              Set your default currency for all transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
}

export default page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/catagories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading} fullWidth={true}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              {type === "expense" ? (
                <TrendingDown className="h-14 w-14 rounded-xl bg-red-400/10 p-3 text-red-500" />
              ) : (
                <TrendingUp className="h-14 w-14 rounded-xl bg-emerald-400/10 p-3 text-emerald-500" />
              )}
              <div>
                <h2 className="text-2xl font-semibold">
                  {type === "income" ? "Income" : "Expense"} Categories
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your {type} categories
                </p>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 px-4 py-2 text-sm font-medium shadow-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create Category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-48 w-full flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium">
              No
              <span
                className={cn(
                  "mx-2 font-semibold",
                  type === "income" ? "text-emerald-500" : "text-red-500"
                )}
              >
                {type}
              </span>
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create a category to get started
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Catagory) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Catagory }) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
      <div className="flex flex-col items-center gap-3 p-6">
        <span
          className="text-4xl transition-transform group-hover:scale-110"
          role="img"
        >
          {category.icon}
        </span>
        <span className="font-medium">{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="flex w-full items-center justify-center gap-2 rounded-none border-t bg-card/50 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-500 hover:text-white"
            variant={"ghost"}
          >
            <TrashIcon className="h-4 w-4" />
            Remove
          </Button>
        }
      />
    </div>
  );
}
