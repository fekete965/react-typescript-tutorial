import { Router, useRouter } from "fake-external-lib";

type RouterType = {
  push: (path: string) => void;
};

export const withRouter = <TOuterProps extends { router: RouterType }>(
  Component: React.ComponentType<TOuterProps>
): React.ComponentType<Omit<TOuterProps, "router">> => {
  const NewComponent = (props: Omit<TOuterProps, "router">) => {
    const router = useRouter();

    return <Component {...(props as TOuterProps)} router={router} />;
  };

  NewComponent.displayName = `withRouter(${Component.displayName})`;

  return NewComponent;
};

const UnwrappedComponent = (props: { router: Router; id: string }) => {
  return null;
};

const WrappedComponent = withRouter(UnwrappedComponent);

<>
  {/* @ts-expect-error needs a router! */}
  <UnwrappedComponent id="123" />

  {/* Doesn't need a router passed in! */}
  <WrappedComponent id="123" />

  <WrappedComponent
    // @ts-expect-error id must be the correct property
    id={123}
  />
</>;
