import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,){}
  async create(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.save(createFavoriteDto);
  }

  async findAll() {
    return await this.favoriteRepository.find();
  }

  async remove(id: string) {
    const media = await this.favoriteRepository.findOne({
      where: { id },
    });

    if (!media) {
      throw new Error(`Favorite with id ${id} not found`);
    }
    return await this.favoriteRepository.remove(media);
  }
}
