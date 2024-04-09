import sqlite from "sqlite3";
import dayjs from "dayjs";

const db = new sqlite.Database("questions.sqlite", (err) => {
  if (err) throw err;
});

function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);

  this.getAnswers = () => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT answer.id, text, email, date, score FROM answer, user WHERE answer.questionId=? AND answer.authorID=user.id";

      db.all(sql, [this.id], (err, rows) => {
        if (err) reject(err);
        else {
          const answer = rows.map(
            (ans) =>
              new Answer(ans.id, ans.text, ans.email, ans.date, ans.score)
          );
          resolve(rows);
        }
      });
    });
  };
}

function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);
  this.score = score;
}
