import { FilterQuery, Model, SaveOptions, Types } from 'mongoose';
import { BaseDocument } from './base.schema';

export abstract class BaseRepository<TDocument extends BaseDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument | null> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: TDocument,
  ): Promise<TDocument | null> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    });

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    update: TDocument,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      upsert: true,
      new: true,
    });

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const documents = await this.model.find(filterQuery, {}, { lean: true });

    return documents;
  }
}
