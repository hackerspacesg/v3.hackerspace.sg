import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import AutoScroll from 'embla-carousel-auto-scroll';
import type { GetImageResult, ImageMetadata } from 'astro';

export interface CarouselSlide {
  title: string;
  default: ImageMetadata;
  img1x: GetImageResult;
  img2x: GetImageResult;
  img3x: GetImageResult;
}

interface CarouselComponentProps {
  slides: CarouselSlide[];
}

export default function CarouselComponent({ slides }: CarouselComponentProps) {
  return (
    <Carousel
      className="bg-zinc-50 py-4"
      opts={{
        loop: true,
      }}
      plugins={[
        AutoScroll({
          speed: 0.5,
          stopOnInteraction: true,
        }),
      ]}>
      <CarouselContent>
        {slides.map((slide: CarouselSlide, index: number) => (
          <CarouselItem key={index} className="mx-2 basis-auto p-0">
            <picture>
              <source
                srcSet={`${slide.img3x.src} 3x, ${slide.img2x.src} 2x`}
                type="image/webp"
              />
              <img
                src={slide.img1x.src}
                className="rounded-2xl border border-neutral-200 shadow-sm"
                alt={slide.title}
                title={slide.title}
                width={slide.img1x.attributes.width}
                height={slide.img1x.attributes.height}
              />
            </picture>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
