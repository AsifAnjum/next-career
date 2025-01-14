import { blogCategories, jobCategories } from "@/lib/constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const Categories = () => {
  return (
    <section>
      <h2 className="section__title">Categories</h2>
      {/* job categories */}
      <div>
        <h3 className="text-center mb-6 font-bold text-4xl tracking-wider">
          JOB
        </h3>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {jobCategories.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-1 basis-[55%] sm:basis-1/2 md:basis-[28%] xl:basis-[17%] "
              >
                <div className="p-1">
                  <Card className="hover:shadow-sm duration-500  hover:border-b-indigo-600 hover:shadow-indigo-400">
                    <CardContent className="flex aspect-square items-center justify-center flex-col p-6 font-semibold text-xl">
                      {item.image}
                      <Link href={item.url} className="truncate">
                        {item.title}
                      </Link>
                      <small className="mt-2 text-sm hyphens-auto font-light text-slate-400 line-clamp-3">
                        {item.description}
                      </small>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="primaryOutline"
            className="disabled:border-slate-600"
          />
          <CarouselNext
            variant="primaryOutline"
            className="disabled:border-slate-600"
          />
        </Carousel>
      </div>
      {/* blog categories */}
      <div className="mt-10">
        <h3 className="text-center mb-6 font-bold text-4xl tracking-wider">
          Blog
        </h3>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {blogCategories.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-1 basis-[55%] sm:basis-1/2 md:basis-[28%] xl:basis-[17%]"
              >
                <div className="p-1">
                  <Card className="hover:shadow-sm duration-500  hover:border-b-indigo-600 hover:shadow-indigo-400">
                    <CardContent className="flex aspect-square items-center justify-center flex-col p-6 font-semibold text-xl">
                      {item.icon}
                      <Link href={item.url} className="truncate">
                        {item.title}
                      </Link>
                      <small className="mt-2 text-sm hyphens-auto font-light text-slate-400 line-clamp-3">
                        {item.description}
                      </small>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="primaryOutline"
            className="disabled:border-slate-600"
          />
          <CarouselNext
            variant="primaryOutline"
            className="disabled:border-slate-600"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
