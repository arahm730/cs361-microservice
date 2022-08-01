const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const data = require("./data/course_year_aggregate.json")

app.use(cors())
const fiveYearData = data.filter(
  (entry) => 2018 <= parseInt(entry.year) && parseInt(entry.year) <= 2022
);

const courses = [];

//fills up courses array with data
fiveYearData.forEach((entry) => {
  let id = entry.course.id;
  let seen = false;
  let index = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]["course"] === id) {
      seen = true;
      index = i;
    }
  }
  if (seen) {
    let difEntry = { year: entry.year, difficulty: entry.aggregate.mean };
    courses[index]["difficulties"].push(difEntry);
  } else {
    let element = {};
    element["course"] = id;
    let difEntry = { year: entry.year, difficulty: entry.aggregate.mean };
    element["difficulties"] = [difEntry];
    courses.push(element);
  }
});

//calculates the statistics for every course
const calculateStats = (arr) => {
  let years = [];
  let allDifficulties = [];

  for (let i = 0; i < arr.length; i++) {
    years.push(parseInt(arr[i].year));
    allDifficulties.push(parseFloat(arr[i].difficulty));
  }

  const average = (array) =>
    (array.reduce((a, b) => a + b) / array.length).toFixed(2);

  let dict = {};
  for (let number = 0; number < years.length; number++) {
    dict[allDifficulties[number]] = years[number];
  }

  const averageDifficulty = average(allDifficulties);
  const lowestDifficulty = Math.min(...allDifficulties).toFixed(2);
  const lowestDifficultYear = dict[Math.min(...allDifficulties)];
  const highestDifficulty = Math.max(...allDifficulties).toFixed(2);
  const highestDifficultyYear = dict[Math.max(...allDifficulties)];

  return {
    averageDifficulty: averageDifficulty.toString(),
    lowestDifficulty: lowestDifficulty.toString(),
    lowestDifficultYear: lowestDifficultYear.toString(),
    highestDifficulty: highestDifficulty.toString(),
    highestDifficultyYear: highestDifficultyYear.toString(),
  };
};

let allCourseStatistics = [];
//fills up the allCourseStatistics array with data
courses.forEach((entry) => {
  let element = {};
  element["course"] = entry.course;
  let courseStats = calculateStats(entry.difficulties);
  element["statistics"] = [courseStats];
  allCourseStatistics.push(element);
});


app.get("/stats", (req, res) => {
  const courseId = req.query.id;
  if (courseId === undefined) {
    res.status(200).json({ allCourseStatistics });
    console.log({ allCourseStatistics });
  } else {
    const courseInfo = allCourseStatistics.find((e) => e.course === courseId);
    if (courseInfo !== undefined) {
      const courseStatistics = courseInfo.statistics[0];
      res.status(200).json(courseStatistics);
      console.log(courseStatistics);
    } else {
      res
        .status(404)
        .json({ Error: "Not found. Please enter a valid course id" });
    }
  }
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
