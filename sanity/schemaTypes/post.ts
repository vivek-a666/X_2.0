import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text in post',
      type: 'string',
    }),
    defineField({
      name: 'blockTweet',
      title: 'Block Tweet',
      description:'ADMIN Controls: Toggle if Post is deemed inappropriate',
      type: 'boolean',
    }),

    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Pic',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Post image',
      type: 'string',
    }),

  ] 
  }
  
)