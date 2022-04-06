const { Pool } = require("pg");
const argv = process.argv.slice(2);

const cohort_name = argv[0];
const limit = argv[1];

const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "bootcampx",
});

pool.connect();

pool
	.query(
		`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort 
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${cohort_name}%'
LIMIT ${limit};
`
	)
	.then(res => {
		res.rows.forEach(user => {
			console.log(
				`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
			);
		});
	})
	.catch(err => console.error("query error", err.stack));
