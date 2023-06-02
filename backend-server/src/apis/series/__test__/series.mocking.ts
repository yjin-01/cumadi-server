export const Mock_Series_Category = {
  categoryId: '33143ac1-a295-45df-9c14-026cf392e245',
  name: '개발',
};

export const Mock_Series_Repository = {
  seriesDB: [
    {
      seriesId: '1',
      title: '시리즈1',
      introduction: '시리즈1소개',
      image: '이미지1',
      price: 1000,
      paid: true,
      category: Mock_Series_Category,
      user: { userId: '66b02ed8-a171-490a-9d03-6a5d1cc579cc' },
    },

    {
      seriesId: '2',
      title: '시리즈2',
      introduction: '시리즈2소개',
      image: '이미지2',
      price: 2000,
      paid: true,
      category: Mock_Series_Category,
      user: { userId: '66b02ed8-a171-490a-9d03-6a5d1cc579cc' },
      posts: [],
    },
  ],

  find() {
    return this.seriesDB;
  },

  findOne(where) {
    console.log('where', where);
    const series = this.seriesDB.filter((el) => {
      return el.seriesId === where.where.seriesId;
    });

    console.log('1111', series[0]);

    return series.length === 0 ? false : series[0];
  },

  async save(myData) {
    const { category, posts, ...rest } = myData;
    let index = 0;
    if (myData.seriesId) {
      this.seriesDB.forEach((el, idx) => {
        if (el.seriesId === myData.seriesId) {
          index = idx;
          category
            ? (this.seriesDB[idx] = { ...el, ...rest, category })
            : (this.seriesDB[idx] = { ...el, ...rest });
        }
      });

      return this.seriesDB[index];
    } else {
      myData.seriesId = '1';
      this.seriesDB.push({ ...myData });
      return this.seriesDB[this.seriesDB.length - 1];
    }
  },

  softDelete: jest.fn(() => {
    return { affected: true };
  }),
};

export const Mock_Series = {
  seriesId: '1',
  title: '시리즈1',
  introduction: '시리즈1소개',
  image: '이미지1',
  price: 1000,
  paid: true,
  category: Mock_Series_Category,
  user: { userId: '66b02ed8-a171-490a-9d03-6a5d1cc579cc' },
};

export const Mock_User = {
  userId: '66b02ed8-a171-490a-9d03-6a5d1cc579cc',
  email: 'b@b.com',
  password: 'qqqq',
  nickname: '지니',
  image: 'qwer',
  introduction: 'Hi',
  createdAt: new Date('2023-06-01'),
  updatedAt: new Date('2023-06-01'),
  deletedAt: null,
};

export const Mock_Post = {
  postId: '18d4cddf-acab-4b50-a831-44272da4185a',
  title: '포스트1',
  image: '포스트이미지1',
  description: '포스트1설명',
  content: '포스트1내용',
};
