import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Model, isValidObjectId } from 'mongoose';
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

    try {
    const item = await this.itemModel.create(createItemDto);
    return item;
    } catch (error){
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all item`;
  }

  async findOne(term: string) {
    let item: Item;
    
    if ( !isNaN(+term)) {
      item = await this.itemModel.findOne({ number: term });
    }
      if ( !item && isValidObjectId(term) ) {
        item = await this.itemModel.findById(term);
      }
      if (!item) {
        item = await this.itemModel.findOne({ name: term.toLowerCase().trim() });
      }
      if (!item) throw new NotFoundException(`Item with id, name o number "${ term }" not found `)

    return item
  }

  async update(term: string, updateItemDto: UpdateItemDto) {
    const item = await this.findOne( term );
    if ( updateItemDto.name ) 
      updateItemDto.name = updateItemDto.name.toLowerCase();

      try {
        await item.updateOne( updateItemDto);
    return {...item.toJSON(), ...updateItemDto};

      } catch (error) {
        this.handleExceptions(error);
      } 
  }

  async remove(id: string) {
    //const item = await this.findOne(id);
    //await item.deleteOne();
    const {deletedCount} = await this.itemModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Item with id "${id}" not found`);
      
    }

    return ;
  }

  private handleExceptions(error: any) {
    if (error.code ===11000) {

      throw new BadRequestException(`Item exists in db ${ JSON.stringify( error.keyValue ) }`)

    }
    console.log(error);
    throw new InternalServerErrorException(`Can create Item, check server logs`)
  }
}
