// Compiled by elm-test-rs from templates/BenchmarkRunner.elm
const { Elm } = require("./Runner.elm.js");

// Start the Elm app
const flags = { 
    report: "{{ report }}",
};
const app = Elm.BenchmarkRunner.init({ flags: flags });

function show_result(result) {

    switch (result.tag) {
        case "single": {
            console.log(result.name);
            console.log(result.pretty);
            break;
        }

        case "series": {
            console.log(result.name);
            console.log(result.pretty);
            break;
        }

        case "group": {
            console.log(result.name);
            result.group.forEach(show_result);
            break;
        }

        default: {
            break;
        }
    }
}

app.ports.emit.subscribe(function(v) {
    switch (v.type) {
        case 'start':
            process.stderr.write(v.data + '\n');
            process.stderr.write('\x1B[?25l');
            break;

        case 'running':
            process.stderr.write(v.data);
            break;

        case 'done':
            process.stderr.write(v.msg);
            process.stderr.write('\x1B[?25h\n\n');

            if (flags.report === "json") {
                console.log(JSON.stringify(v.data));
            } else {
            show_result(v.data);
            }

            process.exit(0);
    }
});
