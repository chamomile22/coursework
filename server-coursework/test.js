function testArchDB(textInput) {
  return exec(`backup.bat "${textInput}"`).then(() => {
    console.log(`Success`);
  }).catch(error => {
    console.log(error.code, error.message)
  })
}