async function doesntExist(findCb) {
  try {
    await findCb()
  } catch (e) {
    return true
  }
}

module.exports = {
  doesntExist
}