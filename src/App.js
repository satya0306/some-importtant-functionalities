import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Simple React curd Apps",
      act: 0,
      index: "",
      datas: [],
      loading: false
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }
  fSubmit = e => {
    e.preventDefault();
    console.log("try");

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    if (name && address) {
      if (this.state.act === 0) {
        //new
        let data = {
          name,
          address
        };
        datas.push(data);
      } else {
        let index = this.state.index;
        datas[index].name = name;
        datas[index].address = address;
      }
      //datas.push(data);
      this.setState({
        datas: datas,
        act: 0,
        loading: true
      });
      this.refs.myform.reset();
      this.refs.name.focus();
    }
  };
  fEdit = i => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.setState({
      act: 1,
      index: i
    });
    this.refs.name.focus();
  };
  fRemove = i => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });
    // if (datas === null) {
    //   this.setState({ loading: false });
    // }
    this.refs.myform.reset();
    this.refs.name.focus();
  };

  render() {
    let showData = [];
    if (this.state.loading) {
      showData = (
        <pre className="EnterData">
          {this.state.datas.map((data, i) => (
            <li key={i} className="myList">
              {i + 1} . {data.name} , {data.address}
              <button onClick={() => this.fEdit(i)} className="myListButton">
                Edit
              </button>
              <button onClick={() => this.fRemove(i)} className="myListButton">
                remove
              </button>
            </li>
          ))}
        </pre>
      );
    }
    return (
      <div>
        <form ref="myform" className="myForm">
          {" "}
          <input
            type="text"
            ref="name"
            placeholder="Your Name"
            className="formfield"
          />{" "}
          <input
            type="text"
            ref="address"
            placeholder="Your Information"
            className="formfield"
          />{" "}
          <button onClick={this.fSubmit} className="myButton">
            {" "}
            Submit
          </button>{" "}
        </form>
        {showData}
      </div>
    );
  }
}

export default App;
