type CustomComponentType = ({data}: {data: any}) => React.JSX.Element;

const registeredComponents = new Map<String, CustomComponentType>;

export function registerComponent(id: string, component: CustomComponentType) {
  console.log(id);
  console.log(component);
  console.log(registeredComponents);
  registeredComponents.set(id, component);
}

export function getComponent(c: {id: string, data: any}, key: number) {
  console.log(registeredComponents);
  const Component = registeredComponents.get(c.id);
  if (Component === undefined) return <div>component not found</div>;
  return <Component key={key} data={c.data}/>;
}
