//import React from "react";
import MyReact from "../lib/MyReact";

function NameField() {
  const [firstName, setFirstName] = MyReact.useState("사용자1");
  const [lastName, setLastName] = MyReact.useState("박");

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  return (
    <>
      <input type="text" value={firstName} onChange={handleChangeFirstName} />
      <input type="text" value={lastName} onChange={handleChangeLastName} />
    </>
  );
}
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { name: "사용자1" };
//   }

//   handleChange(e) {
//     this.setState({ name: e.target.value });
//   }

//   render() {
//     return (
//       <>
//         <select value={this.state.name} onChange={this.handleChange.bind(this)}>
//           <option value="사용자1">사용자1</option>
//           <option value="사용자2">사용자2</option>
//         </select>
//         <Contract name={this.state.name} />
//       </>
//     );
//   }
// }

// export default App;

export default () => <NameField />;
