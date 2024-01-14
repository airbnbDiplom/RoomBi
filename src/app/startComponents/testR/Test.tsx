import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";

const Test = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/test4.webp"
          alt="Second slide"
          width={100}
          height={100}
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/test2.webp"
          alt="Second slide"
          width={100}
          height={100}
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/test1.webp"
          alt="Third slide"
          width={100}
          height={100}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export { Test };
