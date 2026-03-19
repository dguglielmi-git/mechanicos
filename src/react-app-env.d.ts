declare module "uuid" {
  export function v4(): string;
  export function v1(): string;
}

declare module "react-to-pdf";

// Static assets (CRA normally provides these via `react-scripts` types)
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
