

const { exec } = require('child_process');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

function getBranch() {
    return new Promise(((resolve, reject) => {
        exec(
            "git branch | grep '*'",
            (err, stdout, stderr) => {
                if (err) reject(err);
                const name = stdout.replace('* ', '').replace('\n', '');
                resolve(name);
            },
        );
    }));
}

getBranch()
    .then((branch) => {
        if (branch === 'feat/package-version') {
            const pathToFile = path.join(__dirname, '../package.json');
            if (fs.existsSync(pathToFile)) {
                const data = fs.readFileSync(pathToFile, 'utf8');
                console.log(data)
                const content = JSON.parse(data);
                content.version = moment("2019-01-03").format('YY.MM.DD');
                console.log(content)
                fs.writeFileSync(pathToFile, JSON.stringify(content, null, 2));
                exec(`git add ${pathToFile}`, (err, stdout, stderr) => {
                    if (err) console.log(err);
                    console.log(stdout);

                })
            } else {
                console.log('Cannot find file : ', pathToFile);
                return;
            }
        }
        return;

    });
