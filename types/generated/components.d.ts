import type { Schema, Struct } from '@strapi/strapi';

export interface VariantsVariantMaterial extends Struct.ComponentSchema {
  collectionName: 'components_variants_variant_materials';
  info: {
    displayName: 'variant.material';
    icon: 'apps';
  };
  attributes: {
    material: Schema.Attribute.String;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    sku: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'variants.variant-material': VariantsVariantMaterial;
    }
  }
}
