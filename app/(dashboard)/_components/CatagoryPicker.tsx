"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { Catagory } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import CreateCategoryDialog from "./CreateCategoryDialog";
import React, { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

function CatagoryPicker({ type, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  // Get the queryClient instance
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const catagoriesQuery = useQuery({
    queryKey: ["catagories", type],
    queryFn: () =>
      fetch(`/api/catagories?type=${type}`).then((res) => res.json()),
  });

  const selectedCatagory = catagoriesQuery.data?.find(
    (catagory: Catagory) => catagory.name === value
  );

  const successCallback = useCallback(
    (catagory: Catagory) => {
      setValue(catagory.name);
      setOpen((prev) => !prev);
      // Invalidate the categories query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["catagories", type] });
    },
    [setValue, setOpen, queryClient, type]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCatagory ? (
            <CatagoryRow catagory={selectedCatagory} />
          ) : (
            <p className="text-muted-foreground">Select catagory</p>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search catagory" />
          <CreateCategoryDialog type={type} successCallback={successCallback} />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new catagory
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {catagoriesQuery.data &&
                catagoriesQuery.data.map((category: Catagory) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CatagoryRow catagory={category} />
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === category.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CatagoryPicker;

function CatagoryRow({ catagory }: { catagory: Catagory }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{catagory.icon}</span>
      <span>{catagory.name}</span>
    </div>
  );
}
