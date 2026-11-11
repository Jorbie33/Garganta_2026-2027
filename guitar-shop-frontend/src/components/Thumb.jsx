const PRODUCT_IMAGES = {
  "alderstandardstratocaster": "/images/Alder Standard Stratocaster.jpg",
  "classicalnyloncedar": "/images/Classical Nylon Cedar.jpg",
  "dreadnoughtspruced28": "/images/Dreadnought Spruce D-28.jpg",
  "hollowbodyjazzarchtop": "/images/Hollow Body Jazz Archtop.jpg",
  "mahoganysinglecut": "/images/Mahogany Single Cut.jpg",
  "offsetsurfelectric": "/images/Offset Surf Electric.jpg",
  "parlortravelacoustic": "/images/Parlor Travel Acoustic.jpg",
  "shortscalebass": "/images/Short Scale Bass.jpg",
};

export default function Thumb({ product }) {
  const productImage = PRODUCT_IMAGES[product.name.toLowerCase().replace(/[^a-z0-9]/g, "")];

  return (
    <div className="thumb">
      <img src={productImage || product.thumbnail || "https://images.unsplash.com/photo-1550291652-6ea9114a47b1"} alt={product.name} />
    </div>
  );
}
