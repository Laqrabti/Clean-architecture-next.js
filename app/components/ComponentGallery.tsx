// app/components/ComponentGallery.tsx
import React from 'react';

type ComponentType = "home" | "about";

const components: Record<ComponentType, () => JSX.Element> = {
  home: () => <h1>Home</h1>,
  about: () => <h1>About</h1>
};

export const ComponentGallery = ({ type }: { type: ComponentType }) => {
  const Component = components[type];
  return <Component />;
};