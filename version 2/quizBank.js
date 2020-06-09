const quizBank = Object.create(null);

quizBank.questionBank = [
    {
        question: "The Plaka is the oldest quarter of which city?",
        options: ["Athens", "Prague", "Rome", "Vienna"],
        answer: 1,
        description: "Fun fact: Athens once had a wonderful civilisation."
    },
    {
        question: "What is an axolotl?",
        options: ["A nerve in the brain", "A multi-axled vehicle", 
        "A type of mortice lock", "A species of salamander"] ,
        answer: 4,
        description: "So what is salamander then :P"
    },
    {
        question: "The Panama Canal was officially "+
        "opened by which US president?",
        options: ["Calvin Coolidge", "Herbert Hoover",
        "Theodore Roosevelt", "Woodrow Wilson"],
        answer: 4,
        description: "France began work on the canal in 1881, but stopped "+
        "because of engineering problems and a high worker mortality rate. "+
        "The United States took over the project in 1904 and opened the canal "+
        "on August 15, 1914. "
    },
    {
        question: "What is a kudzu?",
        options: ["Antelope", "Bird", "Jewish settlement", "Climbing plant"],
        answer: 4,
        description: "Today, kudzu is used to treat alcoholism and to reduce " +
        "symptoms of alcohol hangover, including headache, " +
        "upset stomach, dizziness, and vomiting. ..."
    },
    {
        question: "After Adam, Eve, Cain and Abel who is the next person " +
        "mentioned in the Bible?",
        options: ["Enoch", "Jubal", "Lamech", "Zillah"],
        answer: 1,
        description: "He was of the Antediluvian period in the Hebrew Bible."
    }

];

export default Object.freeze(quizBank);