"use client";

import TransactionTable from "@/app/(dashboard)/transactions/_components/TransactionTable";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";

function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-6 py-6 sm:py-8 px-4 sm:px-6 md:px-8">
          <div className="px-2 sm:px-4 flex items-center">
            <p className="text-2xl sm:text-3xl font-bold">
              Transactions history
            </p>
          </div>
          <div className="px-2 sm:px-4 w-full sm:w-auto flex justify-center sm:justify-end">
            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              onUpdate={(values) => {
                const { from, to } = values.range;
                // We update the date range only if both dates are set

                if (!from || !to) return;
                if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                  toast.error(
                    `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
                  );
                  return;
                }

                setDateRange({ from, to });
              }}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </>
  );
}

export default TransactionsPage;
