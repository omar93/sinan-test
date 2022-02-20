function postValidHamsterObj(isObj) {
    let error = "";
    if (!isObj.name) {
      error += "Parameter name cannot be null or empty string. \n";
    } else if (typeof isObj.name !== "string") {
      error += "Parameter name must be a string. \n";
    } else if (isObj.name === "") {
      error += "Parameter name cannot be an empty string. \n ";
    }

    if (!isObj.age) {
      error += "Parameter age cannot be null or an empty field. \n";
    } else if (typeof isObj.age !== "number") {
      error += "Parameter age must be a number. \n";
    } else if (isObj.age === "") {
      error += "Parameter age cannot be an empty field. \n";
    }

    if (!isObj.favFood) {
      error += "Parameter favFood cannot be null or an empty string. \n";
    } else if (typeof isObj.favFood !== "string") {
      error += "Parameter favFood must be a string. \n";
    } else if (isObj.favFood === "") {
      error += "Parameter favFood cannot be an empty string. \n";
    }

    if (!isObj.loves) {
      error += "Parameter loves cannot be null or an empty string. \n";
    } else if (typeof isObj.loves !== "string") {
      error += "Parameter loves must be a string. \n";
    } else if (isObj.loves === "") {
      error += "Parameter loves cannot be an empty string. \n";
    }

    if (!isObj.imgName) {
      error += "Parameter imgName cannot be null or an empty string. \n";
    } else if (typeof isObj.imgName !== "string") {
      error += "Parameter imgName must be a string. \n";
    } else if (isObj.imgName === "") {
      error += "Parameter imgName cannot be an empty string. \n";
    }

  return error;
}
function putValidHamsterObj(isObj) {
    let error = "";
    if (isObj.name !== undefined) {
        if (typeof isObj.name !== "string") {
        error += "Parameter name must be a string. \n";
        } else if (isObj.name === "") {
        error += "Parameter name cannot be an empty string. \n ";
        }
    }
    if (isObj.age !== undefined) {
        if (typeof isObj.age !== "number") {
        error += "Parameter age must be a number. \n";
        } else if (isObj.age === "") {
        error += "Parameter age cannot be an empty field. \n";
        }
    }

    if (isObj.favFood !== undefined) {
        if (typeof isObj.favFood !== "string") {
        error += "Parameter favFood must be a string. \n";
        } else if (isObj.favFood === "") {
        error += "Parameter favFood cannot be an empty string. \n";
        }
    }

    if (isObj.loves !== undefined) {
        if (typeof isObj.loves !== "string") {
        error += "Parameter loves must be a string. \n";
        } else if (isObj.loves === "") {
        error += "Parameter loves cannot be an empty string. \n";
        }
    }

    if (isObj.imgName !== undefined) {
        if (typeof isObj.imgName !== "string") {
        error += "Parameter imgName must be a string. \n";
        } else if (isObj.imgName === "") {
        error += "Parameter imgName cannot be an empty string. \n";
        }
    }

    if (isObj.wins !== undefined) {
        if (typeof isObj.wins !== "number") {
        error += "Parameter wins must be a number. \n";
        } else if (isObj.wins === "") {
        error += "Parameter wins cannot be an empty field. \n";
        }
    }
    if (isObj.defeats !== undefined) {
        if (typeof isObj.defeats !== "number") {
        error += "Parameter defeats must be a number. \n";
        } else if (isObj.defeats === "") {
        error += "Parameter defeats cannot be an empty field. \n";
        }
    }

    if (isObj.games !== undefined) {
        if (typeof isObj.games !== "number") {
        error += "Parameter games must be a number. \n";
        } else if (isObj.games === "") {
        error += "Parameter games cannot be an empty field. \n";
        }
    }

  return error;
}
module.exports.postValidHamsterObj = postValidHamsterObj;
module.exports.putValidHamsterObj = putValidHamsterObj;
