export default class Section { //отвечает за отрисовку элементов на странице
  constructor({ //объект с двумя свойствами
    items,
    renderer
  }, containerSelector) { //items — это массив данных, которые нужно добавить на страницу при инициализации класса
    //renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    //containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemPrepend(element) { //принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(element); //принимает параметр element и вставляет его в контейнер методом prepend
  }

  addItemAppend(element) {
    this._container.append(element);//принимает параметр element и вставляет его в контейнер методом append
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) { //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this.clear();
    items.forEach(item => { //принимает DOM-элемент и добавляет его в контейнер.
      this._renderer(item);
    });
  }
}

/*
export default class Section { //отвечает за отрисовку элементов на странице
  constructor({//объект с двумя свойствами
    renderer
  }, containerSelector) { //items — это массив данных, которые нужно добавить на страницу при инициализации класса
    //renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    //containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemPrepend(element) { //принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(element); //принимает параметр element и вставляет его в контейнер методом prepend
  }

  addItemAppend(element) { //принимает DOM-элемент и добавляет его в контейнер.
    this._container.append(element); //принимает параметр element и вставляет его в контейнер методом append
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items, userId) { //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this._clear();
    items.forEach(item => { //принимает DOM-элемент и добавляет его в контейнер.
      this._renderer(item, userId);
    });
  }
}
*/