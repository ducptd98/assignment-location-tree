import { applyDecorators } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

export const ApiPaginateQuery = () => {
  return applyDecorators(
    ApiImplicitQuery({
      name: 'pageSize',
      type: Number,
      required: false,
    }),
    ApiImplicitQuery({
      name: 'pageIndex',
      type: Number,
      required: false,
    }),
    ApiImplicitQuery({
      name: 'sort',
      type: String,
      required: false,
    }),
    ApiImplicitQuery({
      name: 'sortDirection',
      type: String,
      required: false,
    }),
    ApiImplicitQuery({
      name: 'sortDirection',
      type: String,
      required: false,
    }),
    ApiImplicitQuery({
      name: 'keyword',
      type: String,
      required: false,
    }),
  );
};
