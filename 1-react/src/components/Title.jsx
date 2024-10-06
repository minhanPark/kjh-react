import * as MyRouter from "../lib/MyRouter";

function Title({ children, backUrl }) {
  if (backUrl) {
    return (
      <>
        <MyRouter.Link to={backUrl} />
        <h1 style={{ paddingRight: 44 }}>{children}</h1>
      </>
    );
  }
  return <h1>{children}</h1>;
}

export default Title;
