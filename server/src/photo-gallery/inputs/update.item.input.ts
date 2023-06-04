import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGalleryItemInput {
    
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  params?: string;

  @Field({ nullable: true })
  tag: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  index?: number;
}
