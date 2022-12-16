export const forumModels = (
  sequelize: {
    define: (
      arg0: string,
      arg1: {
        title: { type: any };
        author: { type: any };
        updateTime: { type: any };
        body: { type: any };
        comments: { type: any; defaultValue: never[] };
      },
      arg2: { timestamps: boolean }
    ) => any;
  },
  Sequelize: { STRING: any; ARRAY: (arg0: any) => any; JSON: any }
) => {
  const Forum = sequelize.define(
    'forum',
    {
      title: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      updateTime: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
      },
    },
    {
      timestamps: false,
    }
  );

  return Forum;
};
