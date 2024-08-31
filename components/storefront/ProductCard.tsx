import { $Enums } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface props {
    item: {
        id: string;
        name: string;
        description: string;
        status?: $Enums.ProductStatus;
        price: number;
        images: string[];
        category?: $Enums.Category;
        isFeatured?: boolean;
        createdAt?: Date;
    }
}

export function ProductCard({ item }: props) {
    return (
        <div className="rounded:lg mb-5">
            <Carousel>
                <CarouselContent className="flex justify-evenly items-center">
                    {
                        item.images.map((image, idx) => (
                            <CarouselItem key={idx}>
                                <div className="relative h-[330px]">
                                    <Image src={image} alt="image" fill
                                        className="object-cover object-center w-full h-full rounded-lg"
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                {
                    item.images.length > 1 ?
                        (
                            <>
                                <CarouselPrevious className="ml-16" />
                                <CarouselNext className="mr-16" />
                            </>
                        ) :
                        (
                            <></>
                        )
                }
            </Carousel>
            <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold text-xl">{item.name}</h1>
                <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-11 ring-inset ring-primary/10">
                    ${item.price}
                </h3>
            </div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {item.description}
            </p>
            <Button asChild className="w-full mt-5 ">
                <Link href={`/product/${item.id}`}>
                    Learn More!
                </Link>
            </Button>
        </div>
    )
}