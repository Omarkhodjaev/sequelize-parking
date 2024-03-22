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

@Table({ modelName: 'users' })
export class UserEntity extends Model {
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
