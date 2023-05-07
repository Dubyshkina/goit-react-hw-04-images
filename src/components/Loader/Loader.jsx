import { Component } from 'react';
import { Rings } from 'react-loader-spinner';
import s from './Loader.module.css';

class Loader extends Component {

  render() {
    
    return (
      <div className={s.Loader}>
        <Rings
        height="100"
        width="100"
        color="blue"
        radius="6"
        visible={true}
        ariaLabel="rings-loading"
      />
      </div>
    );
  }
}

export default Loader;
