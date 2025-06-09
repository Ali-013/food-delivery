export type MoodData = {
  [year: string]: {
    [month: string]: {
      [day: string]: number;
    };
  };
};
