//доп. условия:

// var friends = [
//   {
//     name: "check",
//     age: 25
//   }
// ]
// var bestFriends = lib.query(
//   friends,
//   lib.select("age", "phone"),
// );
// В результате будет элемент с 1 полем age (поля phone не должно быть)


/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */


function query(collection) {
  let data = deepClone(collection);
  const actions = [].slice.call(arguments, 1, arguments.length);

  const filterOptions = actions.filter(item => {
		return item.hasOwnProperty('filterIn');
  });
  
  const selectOptions = actions.filter(item => {
		return item.hasOwnProperty('select');
  })

  filterOptions.forEach(item => {
    const { filterIn } = item;
    data = filter(data, filterIn);
  });

  selectOptions.forEach(item => {
    const { select } = item;
    data = selectArr(data, select);
  })
  
  return data;
}

function deepClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

function filter(arr, filterOptions) {
  const [filterName, filterItems] = filterOptions;
  
  return arr.filter(item => {
    if (item.hasOwnProperty(filterName)) {
      return filterItems.includes(item[filterName]);
    }

    return false;
  })
}

function selectArr(arr, selectOptionsArr) {
  let newArr = [];
  const selectOptions = [...selectOptionsArr];
  
  arr.forEach(item => {
    let obj = {};

    selectOptions.forEach(option => {
      if (item.hasOwnProperty(option)) {
        obj[option] = item[option];
      }
    })
    newArr.push(obj);
  })

  return newArr;
}

/**
 * @params {String[]}
 */
function select() {
  return {'select': arguments};
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  return ({'filterIn': arguments});
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

