export default {
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Player Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Batter', value: 'Batter' },
          { title: 'Bowler', value: 'Bowler' },
          { title: 'All-Rounder', value: 'All-Rounder' },
          { title: 'Wicketkeeper', value: 'Wicketkeeper' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'squad',
      title: 'Squad Type',
      type: 'string',
      options: {
        list: [
          { title: 'Test', value: 'Test' },
          { title: 'ODI', value: 'ODI' },
          { title: 'Both', value: 'Both' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'India', value: 'India' },
          { title: 'Afghanistan', value: 'Afghanistan' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Player Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tag',
      title: 'Designation Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Captain', value: 'captain' },
          { title: 'Vice-Captain', value: 'vice-captain' },
          { title: 'Wicketkeeper', value: 'wk' },
          { title: 'Regular Player', value: 'player' },
        ],
      },
      initialValue: 'player',
      validation: Rule => Rule.required(),
    },
    {
      name: 'stats',
      title: 'Player Stats',
      type: 'object',
      fields: [
        { name: 'matches', title: 'Matches Played', type: 'number' },
        { name: 'runs', title: 'Total Runs', type: 'number' },
        { name: 'wickets', title: 'Total Wickets', type: 'number' },
        { name: 'average', title: 'Batting / Bowling Avg', type: 'string' },
      ],
    },
  ],
}

