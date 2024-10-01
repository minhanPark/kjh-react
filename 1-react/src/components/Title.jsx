function Title({ children, backUrl }) {
  if (backUrl) {
    return (
      <>
        <a href={backUrl}></a>
        <h1 style={{ paddingRight: 44 }}>{children}</h1>
      </>
    );
  }
  return <h1>{children}</h1>;
}

export default Title;
