import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query:"",
  };

  onSubmit = query => {
    this.setState({ query });
  };
  render() {
    return(
    <>
      <Searchbar onSubmit={this.onSubmit} />
      <ImageGallery query={this.state.query} />
    </>);
  }
}
export default App;
