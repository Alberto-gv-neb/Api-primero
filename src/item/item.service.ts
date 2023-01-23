import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Model } from 'mongoose';
import { Item } from './entities/item.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemService {

  constructor( 
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>
  ){
  }

  async create(createItemDto: CreateItemDto) {
    createItemDto.name = createItemDto.name.toLocaleLowerCase();

    const item = await this.itemModel.create(createItemDto);

    return item;
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
