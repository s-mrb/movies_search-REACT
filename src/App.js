import React, { Component } from "react";
import "./App.css";
import MovieRow from "./MovieRow";
import $ from "jquery";

let KEY = process.env.REACT_APP_API_KEY;
let imgBasePath = "https://image.tmdb.org/t/p/w185";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.FetchData = this.FetchData.bind(this);
  }

  FetchData(event) {
    let query = event.target.value;
    const boundObj = this;
    boundObj.performSearch(query);
  }
  performSearch(query) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      KEY +
      "&query=" +
      query;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Data fetched successfully");

        const results = searchResults.results;
        var movieRows = [];
        results.forEach((movie) => {
          movie.poster_src = imgBasePath + movie.poster_path;
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });
        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data");
      },
    });
  }
  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="icon" width="50" src="green_app_icon.svg" />
              </td>
              <td></td>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input
          placeholder="Search any movie .."
          onChange={this.FetchData}
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
          }}
        />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
