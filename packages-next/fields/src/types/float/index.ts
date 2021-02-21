import { Float } from '@keystonejs/fields';
import type { FieldType, BaseGeneratedListTypes, FieldDefaultValue } from '@keystone-next/types';
import { resolveView } from '../../resolve-view';
import type { FieldConfig } from '../../interfaces';

export type FloatFieldConfig<
  TGeneratedListTypes extends BaseGeneratedListTypes
> = FieldConfig<TGeneratedListTypes> & {
  isRequired?: boolean;
  isIndexed?: boolean;
  isUnique?: boolean;
  defaultValue?: FieldDefaultValue<string>;
};

export const float = <TGeneratedListTypes extends BaseGeneratedListTypes>(
  config: FloatFieldConfig<TGeneratedListTypes> = {}
): FieldType<TGeneratedListTypes> => ({
  type: Float,
  config,
  views: resolveView('float/views'),
});
