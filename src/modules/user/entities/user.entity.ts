import { Optional } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import {
  ParkEntity,
  ParkOwnersEntity,
} from 'src/modules/park/entities/park.entity';

export interface IUserAttribute extends Model {
  id: number;
  fullName: string;
  password: string;
  phone: number;
}

type OptionalIUserAttribute = Optional<IUserAttribute, 'id'>;
@Table({ modelName: 'users' })
export class UserEntity extends Model<IUserAttribute, OptionalIUserAttribute> {
  @Column({ field: 'full_name', allowNull: false, type: DataType.STRING })
  fullName: string;

  @Column({ allowNull: false, unique: true, type: DataType.INTEGER })
  phone: number;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @HasMany(() => CarEntity)
  cars: Array<CarEntity>;

  @BelongsToMany(() => ParkEntity, () => ParkOwnersEntity)
  parks: Array<ParkEntity>;
}
