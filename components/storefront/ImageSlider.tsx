'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface props {
    images: string[]
}

export function ImageSlider({ images }: props) {

    const [mainImage, setMainImage] = useState(0);
    function handleImage(idx: number) {
        let newIdx = idx + images.length
        newIdx = newIdx % images.length
        setMainImage(newIdx)
    }

    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <div className="relative overflow-hidden rounded-lg">
                <Image width={600} height={600} src={images[mainImage]} alt="image"
                    className="object-cover w-[600px] h-[600px]"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4 ">
                    <Button variant="ghost" size="icon" onClick={() => handleImage(mainImage - 1)}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleImage(mainImage + 1)}>
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {
                    images.map((item, idx) => (
                        <div key={idx} onClick={() => handleImage(idx)} className={cn(
                            idx == mainImage
                            ? "border-2 border-primary"
                            : "border border-gray-200",
                            "relative overflow-hidden  rounded-lg cursor-pointer"
                        )}>
                            <Image src={item} alt="image" width={100} height={100}
                                className="object-cover w-[100px] h-[100px]"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}