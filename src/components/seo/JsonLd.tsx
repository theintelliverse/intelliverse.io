/**
 * Reusable JSON-LD Structured Data Server Component
 * 
 * Sanitizes input to omit null, undefined, or empty-string properties
 * so that no unverified or fabricated facts are emitted into schemas.
 */

interface JsonLdProps {
  schema: Record<string, any> | Array<Record<string, any>>;
}

function cleanEmptyFields(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
      .map(cleanEmptyFields)
      .filter((v) => v !== null && v !== undefined && v !== "");
  }
  if (obj !== null && typeof obj === "object") {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined || value === "") continue;
      const res = cleanEmptyFields(value);
      if (
        res !== null &&
        res !== undefined &&
        res !== "" &&
        !(typeof res === "object" && Object.keys(res).length === 0)
      ) {
        cleaned[key] = res;
      }
    }
    return cleaned;
  }
  return obj;
}

export default function JsonLd({ schema }: JsonLdProps) {
  if (!schema) return null;
  const cleaned = cleanEmptyFields(schema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleaned),
      }}
    />
  );
}
