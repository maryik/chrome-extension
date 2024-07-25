document.addEventListener('DOMContentLoaded', function () {
    var buttonElement = document.querySelector('.weather-city-button');
    if (!buttonElement) {
        console.error('Кнопка с классом "weather-city-button" не найдена');
        return;
    }
    buttonElement.addEventListener('click', function () {
        var selectElement = document.getElementById('citySelect');
        var selectedCity = selectElement.options[selectElement.selectedIndex].value; //получение выбранного города
        chrome.storage.sync.set({ selectedCity: selectedCity }, function () {
        });
        var existingCityBlock = document.querySelector('.city-result');
        if (existingCityBlock) {
            existingCityBlock.remove();
        }
        var cityBlock = document.createElement('div'); //создание блока для отображения выбранного города
        cityBlock.innerText = 'Выбранный город: ' + selectedCity;
        document.body.appendChild(cityBlock); //добавление блока в документ
    });
});
