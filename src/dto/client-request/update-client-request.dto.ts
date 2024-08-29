
import { RequestStatus } from '@prisma/client';

export class UpdateClientRequestDto {
  status?: RequestStatus;
}