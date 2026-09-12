import Image from "next/image";
import Link from "next/link";

export type CardBadgeTone = "red" | "green" | "orange";

export interface CardProps {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  price?: string;
  meta?: string;
  badge?: string;
  badgeTone?: CardBadgeTone;
  href?: string;
  className?: string;
}

const badgeToneClasses: Record<CardBadgeTone, string> = {
  red: "text-red",
  green: "text-green",
  orange: "text-orange",
};

export function Card({
  title,
  description,
  image,
  imageAlt,
  price,
  meta,
  badge,
  badgeTone = "red",
  href,
  className = "",
}: CardProps) {
  const content = (
    <article
      className={`group flex h-full flex-col overflow-hidden bg-light-100 ${className}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-light-200">
        {badge ? (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full bg-light-100 px-3 py-1.5 text-caption shadow-sm sm:left-4 sm:top-4 ${badgeToneClasses[badgeTone]}`}
          >
            {badge}
          </span>
        ) : null}
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-body-medium text-dark-900">{title}</h3>
          {price ? (
            <p className="text-body-medium shrink-0 text-dark-900">{price}</p>
          ) : null}
        </div>
        {description ? (
          <p className="text-body text-dark-700">{description}</p>
        ) : null}
        {meta ? <p className="text-body text-dark-500">{meta}</p> : null}
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}

export default Card;
