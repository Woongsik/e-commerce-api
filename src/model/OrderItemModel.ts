import mongoose, { Document, Schema } from 'mongoose';

import { OrderItem } from '../misc/types/Order';
import { ProductSchema } from './ProductModel';

export type OrderItemDocument = Document & OrderItem;

export const OrderItemSchema = new Schema({
  product: ProductSchema,
  quantity: {
    type: Number,
    default: 1
  }
}); 

export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);
