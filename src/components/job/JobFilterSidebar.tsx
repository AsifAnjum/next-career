"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Filter from "./Filter";

const JobFilterSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside className="w-1/4 hidden xl:block">
        <Filter />
      </aside>

      <aside className="xl:hidden">
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetTrigger asChild>
            <Button variant="primaryOutline">Filter</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Filter setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </aside>
    </>
  );
};

export default JobFilterSidebar;
