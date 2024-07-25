import prisma from "@/lib/db";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

async function getData() {
    const resposne = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return resposne
}

export async function Hero() {

    const data = await getData()

    return (
        <Carousel>
            <CarouselContent>
                {data.map((item) => (
                    <CarouselItem key={item.id}>
                        <div className="relative h-[60vh] lg:h-[80vh]">
                            <Image src={item.image} alt="image" fill className="object-cover w-full h-full rounded-xl" />
                            <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform">
                                <h1 className="text-xl lg:text-4xl font-bold">{item.title}</h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {
                data.length > 1 ?
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
    )
}