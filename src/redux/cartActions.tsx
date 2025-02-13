// /redux/cartActions.ts

import { CartItem } from '../types/cartTypes';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number; // ID of the item to remove
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction;

export const addToCart = (item: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: number): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});