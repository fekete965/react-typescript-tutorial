import { lazy, Suspense, useMemo } from "react";

type Props<TComponent extends React.ComponentType<any>> = {
  loader: () => Promise<{ default: TComponent }>;
} & React.ComponentProps<TComponent>;

/**
 * 1. This component is supposed to take a loader function that returns a
 * component, and render that component when it's loaded.
 *
 * But it's not typed correctly, and it's not generic enough.
 * Fix the typing errors, and make it generic enough to support any component.
 *
 * Hints:
 *
 * - You'll need to make this a generic component!
 * - React.ComponentProps will come in handy, as will React.ComponentType
 */
function LazyLoad<TComponent extends React.ComponentType<any>>({
  loader,
  ...props
}: Props<TComponent>) {
  const LazyComponent = useMemo(() => lazy(loader), [loader]);

  return (
    <Suspense fallback={"Loading..."}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

<>
  <LazyLoad loader={() => import("fake-external-component")} id="123" />

  <LazyLoad
    loader={() => import("fake-external-component")}
    // @ts-expect-error number is not assignable to string
    id={123}
  />

  {/* @ts-expect-error id is missing! */}
  <LazyLoad loader={() => import("fake-external-component")} />
</>;
