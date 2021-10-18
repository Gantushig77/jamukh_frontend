import React, { useState } from "react";
import { PLACE_HOLDER } from "../../constants/placeholder";

export default function ImgCore({ src = PLACE_HOLDER.noImage, placeHolder, className = "" }) {
  const [error, setError] = useState(false);
  return error ? (
    <img src={placeHolder ?? PLACE_HOLDER.badImage} className={className} alt="core" />
  ) : (
    <img
      src={src}
      onError={() => {
        setError(true);
      }}
      className={className}
      alt="core"
    />
  );
}
