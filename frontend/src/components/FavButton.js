import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

export const FavButton = ({ slug, className = "" }) => {
  const { isFav, toggleFav } = useCart();
  const on = isFav(slug);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFav(slug);
      }}
      aria-label={on ? "Remove from favourites" : "Add to favourites"}
      className={`z-10 flex h-10 w-10 items-center justify-center text-[#EFE3CC] transition-transform duration-300 hover:scale-110 ${className}`}
      data-testid={`fav-button-${slug}`}
    >
      <Heart className={`h-5 w-5 drop-shadow ${on ? "fill-[#C87D53] text-[#C87D53]" : ""}`} strokeWidth={1.6} />
    </button>
  );
};
