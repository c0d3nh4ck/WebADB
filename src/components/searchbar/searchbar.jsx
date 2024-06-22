// Dummy data

import React from "react";

import "./searchbar.css";

export default class Search extends React.Component {
  state = {
    data: null,
    search: "",
    color: ""
  };

  // fetch data
  componentDidMount() {
    fetch("https://jonasjacek.github.io/colors/data.json")
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }
  // Search input
  onInput = (e) => this.setState({ [e.target.id]: e.target.value });
  // Select the wrapper and toggle class 'focus'
  onFocus = (e) => e.target.parentNode.parentNode.classList.add("focus");
  onBlur = (e) => e.target.parentNode.parentNode.classList.remove("focus");
  // Select item
  onClickItem = (item) =>
    this.setState({
      search: "",
      color: item
    });

  render() {
    let { data, search, color } = this.state;
    if (!data) {
      return <p>Loading</p>;
    }
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div>
        <div className="wrapper">
          <div className="search">
            <input
              id="search"
              type="search"
              value={this.state.search}
              placeholder="Search a color by name..."
              onChange={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              autocomplete="off"
            />
            <i class="fas fa-search"></i>
          </div>
          {search.length > 1 && filtered.length > 0 && (
            <ul className="list">
              {filtered.map((item) => (
                <li onClick={() => this.onClickItem(item)}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
        {color && (
          <p className="result">
            <b>Color:</b>
            {color.name}
            <span
              className="box"
              style={{ backgroundColor: color.hexString }}
            />
            {color.hexString}
          </p>
        )}
      </div>
    );
  }
}
