import React, { useState, useEffect } from "react";

const ImageGallery = ({ images, thumbnail }) => {
  const [mainImage, setMainImage] = useState(thumbnail);

  useEffect(() => {
    setMainImage(thumbnail);
  }, [thumbnail]);

  const galleryImages = images && images.length > 0 ? images : [thumbnail];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4 relative group dark:bg-slate-800 dark:border-slate-700">
        <img
          src={mainImage}
          alt="Product Main"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {galleryImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 p-1 transition-all dark:bg-slate-800 ${
              mainImage === img
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-gray-300 dark:hover:border-slate-600"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
