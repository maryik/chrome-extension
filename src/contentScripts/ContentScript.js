"use strict";

function addIconToNews() {
    var iconTemplate = document.createElement('img'); //содание иконки
    iconTemplate.src = chrome.runtime.getURL("src/contentScripts/weather.png"); //использование chrom extension api для создания полного url
    iconTemplate.style.width = '48px';
    iconTemplate.style.height = '48px';
    iconTemplate.style.border = 'none';
    iconTemplate.style.cursor = 'pointer';
    var storyWraps = document.querySelectorAll('.story-wrap');
    storyWraps.forEach(function (storyWrap) {
        var clonedIcon = iconTemplate.cloneNode(true); //клонирование иконки
        storyWrap.appendChild(clonedIcon); //вставка иконка в блок новостей
        clonedIcon.addEventListener('click', openModal);
    });
    var modal = document.createElement('div'); //создание модального окна с погодой
    modal.id = 'myModal';
    chrome.storage.sync.get(['selectedCity'], function (result) {
        var cityName = result.selectedCity; // Получаем название города из хранилища
        var apiKey = '60d830e457c209d456431b29c7526ecc'; // Замените на ваш API ключ
        fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityName, "&appid=").concat(apiKey))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Обработка данных погоды
            var temperature = Math.round(data.main.temp - 273.15); // Преобразуем температуру из Kelvin в Celsius
            var description = data.weather[0].description; // Описание погоды
            var selectedCity = "\u041F\u043E\u0433\u043E\u0434\u0430 ".concat(cityName, " ").concat(temperature, "\u00B0C, ").concat(description);
            // Вставка информации о погоде по выбранному городу в modal
            modal.innerHTML = "\n                <div class=\"modal-content\">\n                    <span class=\"close\" style=\"float: right; cursor: pointer;\">&times;</span>\n                    <br>\n                    <p>".concat(selectedCity, "</p>\n                </div>");
        })
            .catch(function (error) { return console.error('Error fetching weather:', error); });
    });
    modal.style.display = 'none'; //свойства модального окна
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '45%';
    modal.style.top = '45%';
    modal.style.width = '200px';
    modal.style.height = '100px';
    modal.style.overflow = 'auto';
    modal.style.fontWeight = 'bold';
    modal.style.backgroundColor = 'beige';
    document.body.appendChild(modal); //добавление окна в документ
    function closeModal() {
        modal.style.display = 'none';
    }
    modal.addEventListener('click', function (event) {
        if (event.target === modal || event.target instanceof HTMLElement && event.target.classList.contains('close')) {
            closeModal();
        }
    });
    function openModal() {
        modal.style.display = 'block';
    }
}
addIconToNews();
