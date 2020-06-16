export default class Section { //отвечает за отрисовку элементов на странице
  constructor({
    items,
    renderer
  }, containerSelector) { //items — это массив данных, которые нужно добавить на страницу при инициализации класса
    //renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    //containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) { //принимает DOM-элемент и добавляет его в контейнер.
    this._container.append(element); //принимает параметр element и вставляет его в контейнер методом append
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() { //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this.clear();

    this._renderedItems.forEach(item => { //принимает DOM-элемент и добавляет его в контейнер.
      this._renderer(item);
    });
  }
}

/*
Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
*/