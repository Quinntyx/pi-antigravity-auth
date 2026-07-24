const UNSUPPORTED_SCHEMA_FIELDS = new Set([
  "$schema",
  "$id",
  "$comment",
  "$ref",
  "$defs",
  "definitions",
  "additionalProperties",
  "patternProperties",
  "unevaluatedProperties",
  "unevaluatedItems",
  "dependentRequired",
  "dependentSchemas",
  "propertyNames",
  "contentMediaType",
  "contentEncoding",
  "if",
  "then",
  "else",
  "not",
  "minContains",
  "maxContains",
]);

/** Convert JSON Schema/TypeBox output to the restricted protobuf Schema accepted by Gemini. */
export function toGeminiSchema(schema: any): any {
  if (!schema || typeof schema !== "object") return schema;
  if (Array.isArray(schema)) return schema.map(toGeminiSchema);

  const propertyNames = new Set(
    schema.properties && typeof schema.properties === "object"
      ? Object.keys(schema.properties)
      : [],
  );
  const out: any = {};

  for (const [key, value] of Object.entries(schema)) {
    if (UNSUPPORTED_SCHEMA_FIELDS.has(key) || key === "const") continue;

    if (key === "enum" && Array.isArray(value)) {
      // Gemini's protobuf Schema declares enum as string[]. Boolean/numeric
      // TypeBox literal unions are still validated against the original schema
      // by Pi, so omit constraints Gemini cannot represent.
      if (value.every((item) => typeof item === "string")) out.enum = value;
      continue;
    }

    if (key === "required" && Array.isArray(value)) {
      const required = value.filter(
        (item): item is string => typeof item === "string" && propertyNames.has(item),
      );
      if (required.length) out.required = required;
      continue;
    }

    out[key] = toGeminiSchema(value);
  }

  // Preserve string literal unions after removing the unsupported `const` key.
  if (typeof schema.const === "string" && !out.enum) out.enum = [schema.const];

  // Gemini requires an items schema for every array declaration.
  if (typeof out.type === "string" && out.type.toLowerCase() === "array" && !out.items) {
    out.items = { type: "string" };
  }

  return out;
}
