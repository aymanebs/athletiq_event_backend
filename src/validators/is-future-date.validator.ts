import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDate implements ValidatorConstraintInterface {
    
  validate(value: Date, args: ValidationArguments) {
    return value > new Date();  
  }

  defaultMessage(args: ValidationArguments) {
    return 'Event date must be in the future';
  }
}
