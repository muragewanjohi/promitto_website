const SECURITY_ALERT_PATTERNS = [
  'this website has been',
  'security breach',
  'compromised',
  'cannot be edited',
  'only the system',
  'staging server',
  'api keys',
  'admin panel: no authentication',
];

function toSafeText(value: unknown): string {
  return typeof value === 'string' ? value.toLowerCase() : '';
}

export function containsSecurityAlertText(value: unknown): boolean {
  const text = toSafeText(value);
  if (!text) return false;
  return SECURITY_ALERT_PATTERNS.some((pattern) => text.includes(pattern));
}

export function isPropertySafe(property: any): boolean {
  if (!property) return false;

  const fieldsToScan = [
    property.name,
    property.location,
    property.description,
    ...(Array.isArray(property.features) ? property.features : []),
  ];

  return !fieldsToScan.some((field) => containsSecurityAlertText(field));
}
