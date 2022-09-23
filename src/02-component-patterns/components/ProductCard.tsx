import { createContext } from 'react';
import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import {
  Product,
  ProductContextProps,
  onChangeArgs,
  InitialValues,
  ProductCardHandlers,
} from '../interfaces/interfaces';

export interface Props {
  product: Product;
  // children?: React.ReactElement | React.ReactElement[];
  children?: (args: ProductCardHandlers) => JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({
  children,
  product,
  className,
  style,
  onChange,
  value,
  initialValues,
}: Props) => {
  const { counter, maxCount, increaseBy, isMaxCountReached, reset } =
    useProduct({
      onChange,
      product,
      value,
      initialValues,
    });
  return (
    <Provider value={{ counter, increaseBy, maxCount, product }}>
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children &&
          children({
            count: counter,
            isMaxCountReached: isMaxCountReached,
            maxCount: initialValues?.maxCount,
            product,
            increaseBy,
            reset,
          })}
      </div>
    </Provider>
  );
};
