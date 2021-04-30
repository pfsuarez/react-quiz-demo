import React, { ReactElement, ReactNode, useState } from "react";

const HeadingFC: React.FC<{ title: string }> = ({ title }) => <h1>{title}</h1>;

//Conventional Props
function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function HeadingWithContent({
  children,
}: {
  children: ReactNode;
}): ReactElement | null {
  return <h1>{children}</h1>;
}

//defaultProps
const defaultContainerProps = {
  heading: <strong>My Heading</strong>,
};

type containerProps = {
  children: ReactNode;
} & typeof defaultContainerProps;

function Container({ heading, children }: containerProps): ReactElement | null {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

//Functional Props
function TextWithNumber({
  header,
  children,
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, setstate] = useState<number>(1);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      {children(state)}
      <div>
        <button onClick={() => setstate(state + 1)}>Add</button>
      </div>
    </div>
  );
}

Container.defaultProps = defaultContainerProps;

//List
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

//Class component
class MyHeader extends React.Component<{title: ReactNode | string}> {
  render() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

const App = () => {
  return (
    <div>
      <Heading title="Hello There" />
      <HeadingWithContent>
        <strong>Hi!</strong>
      </HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number num is {num}</div>}
      </TextWithNumber>
      <List
        items={["t1", "JK5", "Test"]}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></List>
      <MyHeader title="Another header title"></MyHeader>
    </div>
  );
};

export default App;
