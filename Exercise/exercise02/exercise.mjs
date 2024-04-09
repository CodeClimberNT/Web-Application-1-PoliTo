import dayjs from 'dayjs';

class Answer {
    constructor(res, username, date, score = 0) {
        this.res = res;
        this.username = username;
        this.score = score;
        this.date = dayjs(date);

        this.toString = () => {
            return `${this.username} replied '${this.res}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
          }
    }
}


class Question {
    constructor(question, username, date) {
        this.question = question;
        this.username = username;
        this.date = date;
        this.answers = [];

        // pass a fully-constructed Answer object
        this.add = (answer) => {
            this.answers.push(answer);
        };

        // returns all the Answers of a given person
        this.find = (username) => {
            /*
            let foundAns = [];
            for(const ans of this.answers){
                if(ans.username === username)
                    foundAns.push(ans);
            }
            return foundAns;
            */
            return this.answers.filter(ans => ans.username === username);
        };

        // returns an array of Answers after the given date
        this.afterDate = (date) => {
            return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
        };

        // returns an array of Answers, sorted by increasing date
        this.listByDate = () => {
            return [...this.answers].sort((a, b) => a.date.isAfter(b.date) ? 1 : -1);
        };

        // returns an array of Answers, sorted by decreasing score
        this.listByScore = () => {
            return [...this.answers].sort((a, b) => b.score - a.score);
        };
    }
}


const question = new Question('Is JS better than Python?', 'Luigi De Russis', '2024-02-27');
const firstAnswer = new Answer('Yes', 'Luca Mannella', date = '2024-02-28', -10);
const secondAnswer = new Answer('Not in a million year', 'Guido van Rossum', '2024-03-01', 5);
const thirdAnswer = new Answer('No', 'Albert Einstein', '2024-03-11');
const fourthAnswer = new Answer('Then, I don\'t know', 'Luca Mannella', '2024-03-10');

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);


const answersByLuca = question.find('Luca Mannella');
console.log(question);
console.log('\nAnswers by Luca: ' + answersByLuca);
console.log('\nBy date: ' + question.listByDate());
console.log('\nBy score: ' + question.listByScore());
console.log('\nAfter 2024-02-29: ' + question.afterDate('2024-02-29'));

c