import Link from "next/link";
import JsonLd from "./JsonLd";
import { siteConfig } from "@/content/site";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", url: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };

  return (
    <>
      <JsonLd schema={schema} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6">
        <ol
          className="flex flex-wrap items-center gap-2 text-xs font-mono"
          style={{ color: "var(--muted)" }}
        >
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {idx > 0 && <span style={{ color: "var(--hairline)" }}>/</span>}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-bold uppercase tracking-wider"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:underline transition uppercase tracking-wider"
                    style={{ color: "var(--blue-deep)" }}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
