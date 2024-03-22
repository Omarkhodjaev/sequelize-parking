import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Table({ modelName: 'parks' })
export class ParkEntity extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: true, type: DataType.STRING })
  location: string;

  @Column({
    field: 'empty_place_count',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  emptyPlaceCount: number;

  @BelongsToMany(() => UserEntity, () => ParkOwnersEntity)
  users: Array<UserEntity>;
}

@Table({ modelName: 'park_owners' })
export class ParkOwnersEntity extends Model {
  @ForeignKey(() => UserEntity)
  @Column({ field: 'user_id', allowNull: false })
  userId: number;

  @ForeignKey(() => ParkEntity)
  @Column({ field: 'park_id', allowNull: false })
  parkId: number;
}
