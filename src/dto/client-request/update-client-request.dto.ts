
import { RequestStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateClientRequestDto {

  @IsNotEmpty()
  status?: RequestStatus;
  
}