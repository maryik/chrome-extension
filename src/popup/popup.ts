document.addEventListener('DOMContentLoaded', () => {
    const buttonElement = document.querySelector('.weather-city-button');
  
    if (!buttonElement) {
      console.error('Кнопка с классом "weather-city-button" не найдена');
      return;
    }
  
    buttonElement.addEventListener('click', () => {
      const selectElement: HTMLSelectElement = document.getElementById('citySelect') as HTMLSelectElement;
      const selectedCity: string = selectElement.options[selectElement.selectedIndex].value; //получение выбранного города
    chrome.storage.sync.set({selectedCity: selectedCity}, function() { //тспользование chrome extension api для сохранения данных
    });

      const existingCityBlock = document.querySelector('.city-result');

      if (existingCityBlock) {
        existingCityBlock.remove();
      }
  
      const cityBlock: HTMLDivElement = document.createElement('div'); //создание блока для отображения выбранного города
      cityBlock.innerText = 'Выбранный город: ' + selectedCity;
  
      document.body.appendChild(cityBlock); //добавление блока в документ
    });
  });
  