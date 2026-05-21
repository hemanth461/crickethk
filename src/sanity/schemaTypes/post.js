export default {
  name: 'post',
  title: 'News Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Used for news cards on the homepage (1-2 sentences).',
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Breaking News', value: 'Breaking News' },
          { title: 'IPL News', value: 'IPL' },
          { title: 'Squad Announcement', value: 'Squads' },
          { title: 'Trade Rumors', value: 'Rumors' },
          { title: 'General News', value: 'General' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    },
  ],
}
