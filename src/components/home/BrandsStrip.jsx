import React from "react";

// We use direct high-quality SVG/PNG URLs for a professional look.
// In a real app, you would store these images in your src/assets folder.
const brandLogos = [
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg",
  },
  {
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "L'Oréal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg",
  },
  {
    name: "Rolex",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
];

const BrandsStrip = () => {
  return (
    <section className="py-10 border-y border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">
          Trusted by Top Brands
        </h3>

        {/* Responsive Grid / Flex Layout */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {brandLogos.map((brand, index) => (
            <div
              key={index}
              className="group flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-8 md:h-10 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsStrip;
