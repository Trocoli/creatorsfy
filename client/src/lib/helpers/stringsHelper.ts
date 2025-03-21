export const toTitleCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
};

export const splitAndTitleCase = (
  value: string,
  splitToken: string,
  hardcodedExceptions?: Record<string, string>
) => {
  const hardcodedException = hardcodedExceptions?.[value];

  if (hardcodedException) {
    return hardcodedException;
  }

  if (!splitToken) {
    return toTitleCase(value);
  }

  return toTitleCase(value.split(splitToken).join(" "));
};

export function formatarValorEmReais(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
