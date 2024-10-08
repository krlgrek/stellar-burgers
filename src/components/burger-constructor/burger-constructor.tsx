import { FC, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  newBurgerOrder,
  clearOrder
} from '../../services/slices/newOrderSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userIsAuth = useSelector((state) => state.userData.isAuthChecked);
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const { orderRequest, order } = useSelector((state) => state.newOrder);
  const user = useSelector(selectUser);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = useCallback(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (constructorItems.bun && constructorItems.ingredients.length > 0) {
      const dataToOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(newBurgerOrder(dataToOrder)).then(() => {
        dispatch(clearConstructor());
      });
    }
  }, [userIsAuth, constructorItems, dispatch, navigate]);

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
