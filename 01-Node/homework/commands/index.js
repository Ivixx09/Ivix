var fs = require('fs');
  function ls () {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      })
      process.stdout.write("\nESCRIBE O TE MUERES >:V > ");
    });

}
function clear () {
  console.clear()
}
function echo ( data ) {
  const palabras = data.join(" ")
    process.stdout.write(palabras);
}
function cat (archivo)  {
    const lectura = fs.readFileSync(archivo[0], 'utf8')
    process.stdout.write(lectura);
}

const head = (archivo) => {
  fs.readFile(archivo[0], 'utf8', (err, lectura) => {
    if (err){
      throw new err;
    } else {
      const lecture = lectura.split('\n').splice(0, 5).join('\n')
      process.stdout.write(lecture);
    }
    process.stdout.write("\nESCRIBE O TE MUERES >:V > ")
  })
}
const tail = (archivo) => {
    const lectura = fs.readFileSync(archivo[0], 'utf8')
    const lecture = lectura.split('\n')
    final = lecture.pop()

      process.stdout.write(lecture.toString());
  process.stdout.write("\nESCRIBE O TE MUERES >:V > ")
}

// Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//   var cmd = data.toString().trim(); // remueve la nueva línea
//   if(cmd === 'date') {
//     process.stdout.write(Date());  
//   }
//   if(cmd === 'pwd') {
//     process.stdout.write(process.cwd());  
//   }
//   process.stdout.write('\nprompt > ');
// });


module.exports = {
  pwd: () => {process.stdout.write(process.cwd());},
  date: () => {process.stdout.write(Date());},
  ls,
  clear,
  echo,
  cat,
  head,
  tail
}