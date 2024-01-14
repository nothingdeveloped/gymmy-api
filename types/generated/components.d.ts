import type { Schema, Attribute } from '@strapi/strapi';

export interface ChallengeChallenge extends Schema.Component {
  collectionName: 'components_challenge_challenges';
  info: {
    displayName: 'challenge';
    icon: 'bell';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image_url: Attribute.String;
    banner_image_url: Attribute.String;
    props: Attribute.JSON;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'challenge.challenge': ChallengeChallenge;
    }
  }
}
