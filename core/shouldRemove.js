const ansCheck = (ans) => {
    return (ans === 'Y' || ans === 'y');
};

const shouldRemove = async (logs) => {
    if (logs.length) {
        console.log('Logs a eliminar');
        console.log(logs);
        const readline = require('readline');
        const input = readline.createInterface(process.stdin, process.stdout);
        return new Promise((resolve, reject) => {
            input.question('Eliminar los logs [Y/N]? ', (ans) => {
                try {
                    resolve(ansCheck(ans));
                } catch (err) {
                    reject(err);
                } finally {
                    input.close();
                }
            });
        });
    }
};

module.exports = shouldRemove;
