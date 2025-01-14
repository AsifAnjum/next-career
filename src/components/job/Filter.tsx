"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  contract,
  fullTime,
  hybrid,
  internship,
  onSite,
  partTime,
  remote,
} from "@/lib/constant";

const Filter = ({ setOpen }: { setOpen?: (value: boolean) => void }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const [jobType, setJobType] = useState<string[]>(
    params.getAll("jobType") || []
  );
  const [experienceYear, setExperienceYear] = useState<string[]>(
    params.getAll("experience") || []
  );
  const [sort, setSort] = useState<string>(params.get("sort") || "");
  const [jobLocation, setJobLocation] = useState<string[]>(
    params.getAll("jobLocation") || []
  );
  const [search, setSearch] = useState<string>(params.get("search") || "");

  const handleJobTypeChange = (type: string) => {
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleExperienceYearChange = (level: string) => {
    setExperienceYear((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleJobLocationChange = (location: string) => {
    setJobLocation((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const handleSortBy = (value: string) => {
    setSort(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterApply = () => {
    // Apply

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (jobType.length > 0) {
      params.set("jobType", jobType.join(","));
    } else {
      params.delete("jobType");
    }

    if (experienceYear.length > 0) {
      params.set("experience", experienceYear.join(","));
    } else {
      params.delete("experience");
    }

    if (jobLocation.length > 0) {
      params.set("jobLocation", jobLocation.join(","));
    } else {
      params.delete("jobLocation");
    }

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Job title or keyword"
          className="mt-1 bg-input"
          value={search}
          onChange={handleSearchChange}
          aria-label="Search for jobs"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Job Type</h3>
        {[fullTime, partTime, contract, internship].map((type) => (
          <div key={type} className="flex items-center mb-2">
            <Checkbox
              id={`job-type-${type}`}
              checked={jobType.includes(type)}
              onCheckedChange={() => handleJobTypeChange(type)}
              aria-label={`Filter by ${type} job type`}
            />
            <Label
              htmlFor={`job-type-${type}`}
              className="ml-2 capitalize cursor-pointer"
            >
              {type}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Location</h3>
        {[remote, onSite, hybrid].map((location) => (
          <div key={location} className="flex items-center mb-2">
            <Checkbox
              id={`jobLocation-${location}`}
              checked={jobLocation.includes(location)}
              onCheckedChange={() => handleJobLocationChange(location)}
              aria-label={`Filter by ${location} location`}
            />
            <Label
              htmlFor={`jobLocation-${location}`}
              className="ml-2 capitalize cursor-pointer"
            >
              {location}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Experience Year</h3>
        {["0", "0-1", "1-2", "2-3", "3-5", "5+"].map((year) => (
          <div key={year} className="flex items-center mb-2">
            <Checkbox
              id={`experience-${year}`}
              checked={experienceYear.includes(year)}
              onCheckedChange={() => handleExperienceYearChange(year)}
              aria-label={`Filter by ${
                year === "0" ? "No Experience" : `${year} years`
              } experience`}
            />
            <Label
              htmlFor={`experience-${year}`}
              className="ml-2 cursor-pointer"
            >
              {year === "0" ? "No Experience" : `${year} years`}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <RadioGroup value={sort} onValueChange={handleSortBy}>
          {["salary(low)", "salary(high)", "deadline"].map((sortItem) => (
            <div className="flex items-center space-x-2" key={sortItem}>
              <RadioGroupItem
                // checked={salaryRange == range}
                value={sortItem}
                onClick={(e) =>
                  (e.target as HTMLTextAreaElement).value && setSort("")
                }
                id={sortItem}
                aria-label={`Sort by ${sortItem}`}
              />
              <Label htmlFor={sortItem} className="capitalize cursor-pointer">
                {sortItem}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button
        className="mr-2"
        onClick={() => {
          setOpen && setOpen(false);

          handleFilterApply();
        }}
        aria-label="Apply filters"
      >
        Apply Filters
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          setOpen && setOpen(false);
          setSearch("");
          setJobType([]);
          setExperienceYear([]);
          setJobLocation([]);
          setSort("");

          replace(pathname);
        }}
        aria-label="Clear filters"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filter;
