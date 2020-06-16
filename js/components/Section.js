//items - это массив данных, которые нужно добавить на страницу при инициализации класса.
//renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
//containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.

export default class Section {//получает разметку через функцию-колбэк и вставляет её в контейнер.
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {// принимает DOM-элемент и добавляет его в контейнер.
    this._container.append(element);
  }
}