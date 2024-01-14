"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import style from "./test.module.css";

interface CarouselItemData {
  src: string;
  altText: string;
  caption: string;
  key: number;
}

interface TestProps {
  // Якщо потрібно, додайте інші властивості компонента
}

const items: CarouselItemData[] = [
  {
    src: "/test1.webp",
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: "/test2.webp",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: "/test3.webp",
    altText: "Slide 3",
    caption: "кlide 3",
    key: 3,
  },
  {
    src: "/test4.webp",
    altText: "Slide 4",
    caption: "кlide 4",
    key: 4,
  },
  {
    src: "/test5.webp",
    altText: "Slide 5",
    caption: "кlide 5",
    key: 5,
  },
];

const Test: React.FC<TestProps> = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <Image src={item.src} alt={item.altText} width={300} height={250} />
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
      className={style.test}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export { Test };
