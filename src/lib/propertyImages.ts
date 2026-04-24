type PropertyImageShape = {
  id?: string;
  images?: unknown;
  featuredImage?: unknown;
  mainImage?: unknown;
  image_url?: unknown;
};

function asCleanUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function getPropertyImageList(property: PropertyImageShape): string[] {
  const unique = new Set<string>();
  const ordered: string[] = [];

  const pushIfValid = (value: unknown) => {
    const url = asCleanUrl(value);
    if (url && !unique.has(url)) {
      unique.add(url);
      ordered.push(url);
    }
  };

  if (Array.isArray(property.images) && property.images.length > 0) {
    property.images.forEach(pushIfValid);
  } else {
    pushIfValid(property.featuredImage);
    pushIfValid(property.mainImage);
    pushIfValid(property.image_url);
  }

  if (ordered.length === 0) {
    pushIfValid(property.id ? `/images/${property.id}/main.jpg` : null);
  }

  return ordered;
}
