import type { Schema, Struct } from '@strapi/strapi';

export interface ChallengeChallenge extends Struct.ComponentSchema {
  collectionName: 'components_challenge_challenges';
  info: {
    displayName: 'challenge';
    icon: 'bell';
  };
  attributes: {
    banner_image_url: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image_url: Schema.Attribute.String;
    props: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'challenge.challenge': ChallengeChallenge;
    }
  }
}
