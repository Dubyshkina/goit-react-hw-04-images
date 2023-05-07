import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span>Search</span>
          </button>
          <input
            className={s.SearchForm_input}
            type="text"
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={e => this.setState({ input: e.target.value })}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes={
  onSubmit: PropTypes.func.isRequired,
}
export default Searchbar;
