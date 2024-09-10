import { PartialType } from '@nestjs/swagger';
import { PayMethodDto } from './create-pay_method.dto';

export class UpdatePayMethodDto extends PartialType(PayMethodDto) {}
