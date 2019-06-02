const { src, dest, series, watch } = require('gulp');
const ts = require('gulp-typescript');
const { spawn } = require('child_process');

const tsProj = ts.createProject('tsconfig.json');

function build() {
    const result = tsProj.src().pipe(tsProj());
    return result.js.pipe(dest('dist'));
}

let nodeApp = null;

function reStart() {
    return new Promise((resolve) => {
        if(nodeApp) {
            nodeApp.kill();
        }
        const env = Object.create(process.env);
        env.NODE_ENV = 'local';
        nodeApp = spawn('node', ['./dist/app.js'],
            {
                stdio: 'inherit',
                env
            });
        nodeApp.on('close', (code) => {
            if(code === 8) {
                console.log('🤔Fix error then retry!')
            }
        });
        resolve();
    })
}

process.on('exit', () => {
    if(nodeApp) {
        nodeApp.kill();
    }
});

function watchChanges(cb) {
    watch(
        [
            './src/**/*.ts',
            './*.json'
        ],
        series(build, reStart)
    )
}

exports.default = series(build, reStart, watchChanges);
