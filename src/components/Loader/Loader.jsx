
import { Rings } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => {
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


