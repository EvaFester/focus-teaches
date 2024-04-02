import { CreateOrderDto } from "@/dto/order.dto";

type createdAt = string;
export type Row = [CreateOrderDto['name'], CreateOrderDto['phone'], createdAt];

