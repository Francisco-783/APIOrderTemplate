import { CreateOrderDTO } from "./create-order.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}