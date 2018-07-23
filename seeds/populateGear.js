
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gear').del()
    .then(function () {
      // Inserts seed entries
      // Dog Cat Fish Rat Rock
      return knex('gear').insert([
        {
          id: 1,
          status: "Available",
          trustframework: "One",
          name: 'Dyna Drill',
          description: 'A drill that can be used on concrete',
          photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg',
          user_id: 1
        },
        {
          id: 2,
          status: "Not Available",
          trustframework: "Two",
          name: 'Dehydrator',
          description: 'Dry your meat',
          photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg',
          user_id: 2
        },
        {
          id: 3,
          status: "Not Available",
          trustframework: "Three",
          name: 'Chainsaw',
          description: 'Cut your trees down',
          photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg',
          user_id: 3
        },
        {
          id: 4,
          status: "Not Available",
          trustframework: "One",
          name: 'Hole Saw',
          description: 'Cut holes in timber or concrete or anything',
          photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg',
          user_id: 4
        },
      ]);
    });
};
