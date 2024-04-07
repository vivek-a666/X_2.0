import { type SchemaTypeDefinition } from 'sanity'
import post from './schemaTypes/post'
import comment from './schemaTypes/comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, comment],
}
