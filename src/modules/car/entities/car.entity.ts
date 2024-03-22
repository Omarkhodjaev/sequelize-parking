import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Table({ modelName: 'cars' })
export class CarEntity extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  model: string;

  @ForeignKey(() => UserEntity)
  @Column({ field: 'user_id', type: DataType.INTEGER, allowNull: false })
  userId: UserEntity;

  @BelongsTo(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;
}
