import type { Schema, Struct } from '@strapi/strapi';

export interface AddressEndereco extends Struct.ComponentSchema {
  collectionName: 'components_address_enderecos';
  info: {
    displayName: 'Endere\u00E7o';
  };
  attributes: {
    bairro: Schema.Attribute.String & Schema.Attribute.Required;
    cidade: Schema.Attribute.String & Schema.Attribute.Required;
    complemento: Schema.Attribute.String;
    estado: Schema.Attribute.String & Schema.Attribute.Required;
    numero: Schema.Attribute.String & Schema.Attribute.Required;
    rua: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      'address.endereco': AddressEndereco;
      'variants.variant-material': VariantsVariantMaterial;
    }
  }
}
