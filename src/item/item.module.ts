import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, itemSchema } from './entities/item.entity';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [
    MongooseModule.forFeature([{
      name: Item.name,
      schema: itemSchema,
    }])
  ]
})
export class ItemModule {}
