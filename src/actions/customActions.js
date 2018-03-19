const convertDate = (() => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ]
  return (string) => {
    let d = new Date(string)
    if (d.getDate()) {
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    } else {
      return ''
    }
  }
})()

export {
  convertDate
}
